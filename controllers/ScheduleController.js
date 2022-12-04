const Schedule = require("../repositories/Schedule")
const { dateTime } = require('../helpers/date')

const getTodaySchedules = async (req, res) => {
    let date_ob = new Date();
    let day = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    const dateToday = year + "-" + month + "-" + day;
    const schedules = await Schedule.showMany({date: dateToday, deleted_flag: false})
    return res.json({
        'result': true,
        'schedules': schedules
    })
}

const createSchedule = async (req, res) => {
    data = {
        specialist_id: req.body.specialist_id,
        date: req.body.date,
        time: req.body.time,
        service_type: req.body.service_type,
        created_at: dateTime,
        deleted_flag: false
    }

    const schedule = await Schedule.create(data)
    return res.json({
        'result': true,
        'message': "New Schedule has been created"
    })
}

module.exports = {
    createSchedule,
    getTodaySchedules
}