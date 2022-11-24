const PatientRepository = require('../repositories/Patient')
const AccountRepository = require('../repositories/Account')
const {md5} = require('../helpers/hashing')

const register = async (req,res) => {
    const patient = {
        id_number: req.body.id_number,
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        contact_number: req.body.contact_number,
        address: req.body.address
    }

    const patientResult = await PatientRepository.store(patient)

    if(!patientResult)
    {
        res.json({
            'result': false,
            'message': 'unable to register'
        })
    }

    const account = {
        username: await patientResult.id_number,
        password: await md5(req.body.password),
        user_id: patientResult.id,
        account_type: 3
    }

    const accountResult = await AccountRepository.create(account)

    res.send( accountResult);
}


module.exports = {
    register
}