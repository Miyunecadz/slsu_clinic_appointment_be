const {md5} = require('../helpers/hashing')
const AccountRepository = require('../repositories/Account')
const PatientRepository = require('../repositories/Patient')

const login = async(req,res) => {
    const credentials = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    const accountResult = await AccountRepository.find(credentials)

    if(!accountResult)
    {
        return res.json({
            "result": false,
            "message": "invalid credentials"
        })
    }

    if(accountResult.account_type == 3)
    {
        const patient = await PatientRepository.findById(accountResult.user_id)
       return res.json({
            "result" : true,
            "type": 3,
            "user": patient
        })
    }

    return res.json({
        "result": true,
        "user": "admin"
    })
}

module.exports = {
    login
}