const Specialist = require('../models/Specialist')
const Account = require('../models/Account')
const {md5} = require('../helpers/hashing')

const run = async () => {
    const specialists = [
        {
            employee_id: '1',
            first_name: 'Dr. Edmundo',
            last_name: 'Villa',
            email: 'edmuno@slsu.com',
            address: 'Sogod, Southern Leyte',
            contact_number: '123456789'
        },
        {
            employee_id: '2',
            first_name: 'Maria Emelee',
            last_name: 'Bascug',
            email: 'emelee@slsu.com',
            address: 'SLSU Sogod, Southern Leyte',
            contact_number: '123456789'
        },
        {
            employee_id: '3',
            first_name: 'Hadassah',
            last_name: 'Sablayan',
            email: 'hadassahnursingattendant@slsu.com',
            address: 'Sogod, Southern Leyte',
            contact_number: '123456789'
        },
    ]

    await Specialist.storeMany(specialists)

    specialists.forEach(async(specialist) => {
        const specs = await Specialist.show({email: specialist.email})
        const hashPass = await md5("1234")
        await Account.create({
            username: specialist.employee_id,
            password: hashPass,
            user_id: specs.id,
            account_type: 2
        })
    })
}


// Execute function
run();