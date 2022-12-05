const { md5 } = require('../helpers/hashing')
const AccountRepository = require('../repositories/Account')
const PatientRepository = require('../repositories/Patient')
const SpecialistRepository = require('../repositories/Specialist')

const login = async (req, res) => {
    try {
        const credentials = {
            username: req.body.username,
            password: await md5(req.body.password)
        }
    
        const accountResult = await AccountRepository.find(credentials)
    
        if (!accountResult) {
            return res.json({
                "result": false,
                "message": "Invalid credentials"
            })
        }
    
        let user = null;
    
        if (accountResult.account_type == 1) {
            user = { 'first_name': 'admin' }
            user.account_type = 1
        } else if (accountResult.account_type == 2) {
            user = await SpecialistRepository.findById(accountResult.user_id)
            user.account_type = 2
        } else if (accountResult.account_type == 3) {
            user = await PatientRepository.findById(accountResult.user_id)
            user.account_type = 3
        }
    
        return res.json({
            "result": true,
            "user": user
        })
    } catch (e) {
        return res.json({
            'result': false,
            'message': 'Server error contact the administrator'
        })
    }
    
}

module.exports = {
    login
}