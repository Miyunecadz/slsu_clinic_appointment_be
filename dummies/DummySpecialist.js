const Specialist = require('../repositories/Specialist')

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
}


// Execute function
run();