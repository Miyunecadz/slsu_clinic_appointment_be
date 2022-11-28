const Schedule = require('../repositories/Schedule')
const Specialist = require('../repositories/Specialist')

async function run() {
    const doctor = await Specialist.show({ employee_id: "1" })

    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    const dateToday = year + "-" + month + "-" + day;

    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();

    var timeToday = hours + ":" + minutes + ":" + seconds;

    var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

    const dummyDataForDoctor = [
        {
            specialist_id: doctor.id,
            date: dateToday,
            time: timeToday,
            service_type: 'Medical/Health Certificate',
            created_at: dateTime,
            deleted_flag: false
        },
        {
            specialist_id: doctor.id,
            date: dateToday,
            time: timeToday,
            service_type: 'Provision of OTC Medication',
            created_at: dateTime,
            deleted_flag: false
        },
        
    ]

    await Schedule.createMany(dummyDataForDoctor);
}

run();