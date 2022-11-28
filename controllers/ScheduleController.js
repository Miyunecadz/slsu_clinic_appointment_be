const Schedule = require("../repositories/Schedule")

const getTodaySchedules = async (req, res) => {
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();

    const dateToday = year + "-" + month + "-" + day;
    const schedules = Schedule.show({date: dateToday})

    return res.json({
        'result': true,
        'schedules': schedules
    })
}

module.exports = {
    getTodaySchedules
}