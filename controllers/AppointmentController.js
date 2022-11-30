const Appointment = require('../repositories/Appointment')
const Schedule = require('../repositories/Schedule')

const setAppointment = async (req, res) => {
    // Need to refactory
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
    // End

    const scheduleResult = await Schedule.update(
        { id: req.body.schedule_id }, { deleted_flag: true }
    )

    if (!scheduleResult) {
        return res.json({
            "result": false,
            "message": "Unable to set appointment"
        })
    }

    const appointment = {
        patient_id: req.body.patient_id,
        schedule_id: req.body.schedule_id,
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        contact_number: req.body.contact_number,
        status: "pending",
        created_at: dateTime
    }

    const appointmentResult = await Appointment.store(appointment)

    if (!appointmentResult) {
        await Schedule.update(
            { id: req.body.schedule_id }, { deleted_flag: false }
        )
        return res.json({
            "result": false,
            "message": "Unable to set appointment"
        })
    }

    return res.json({
        "result": true,
        "message": "Appointment has been set!"
    })
}

const getAppointments = async(req,res) => {
    const userId = req.body.userId
    if(!userId)
    {
        return res.json({
            'result' : false,
            'message' : "User ID is required"
        })
    }

    const appointments = await Appointment.findMany(userId)
    return res.json({
        'result': true,
        "appointments": appointments 
    })
}

module.exports = {
    setAppointment,
    getAppointments
}