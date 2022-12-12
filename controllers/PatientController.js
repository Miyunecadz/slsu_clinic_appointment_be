const PatientRepository = require('../models/Patient')
const AccountRepository = require('../models/Account')
const { md5 } = require('../helpers/hashing')
const Patient = require('../models/Patient')

const register = async (req, res) => {
    try {
        const patient = {
            id_number: req.body.id_number,
            status: req.body.status,
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            contact_number: req.body.contact_number,
            address: req.body.address
        }

        const existResult = await PatientRepository.show({ id_number: patient.id_number })
        if (existResult) {
            return res.json({
                'result': false,
                'message': 'ID Number already exist'
            })
        }

        const patientResult = await PatientRepository.store(patient)

        if (!patientResult) {
            return res.json({
                'result': false,
                'message': 'Unable to register'
            })
        }

        const account = {
            username: await patientResult.id_number,
            password: await md5(req.body.password),
            user_id: patientResult.id,
            account_type: 3
        }

        const accountResult = await AccountRepository.create(account)

        return res.json({
            'result': true,
            'message': 'New Account has been successfully registered',
            'user': patientResult
        })
    } catch (e) {
        return res.json({
            'result': false,
            'message': 'Server error',
            'error': e
        })
    }
}

const all = async (req, res) => {
    const patientsResult = await PatientRepository.all(true);

    return res.json({
        'result': true,
        "patients": patientsResult
    });
}

const update = async (req, res) => {
    const condition = {
        id: req.body.id
    }

    const patientData = {
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        contact_number: req.body.contact_number,
        address: req.body.address,
    }
    const updateResult = await Patient.update(condition, patientData)
    if (!updateResult) {
        return res.json({
            'result': false,
            'message': 'Unable to update profile'
        })
    }
    return res.json({
        result: true,
        user: updateResult,
        message: "Successfully updated the profile information"
    })
}

module.exports = {
    register,
    all,
    update,
}