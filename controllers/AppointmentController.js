const Appointment = require('../models/Appointment')
const Schedule = require('../models/Schedule')
const Mailer = require('../helpers/mailer')
const { setAppointmentTemplate, approveAppointmentTemplate } = require('../helpers/templates/mail.template')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const setAppointment = async (req, res) => {
    // Need to refactor
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

    const schedule = await Schedule.findById(req.body.schedule_id)

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
        created_at: dateTime,
        specialist_id: schedule.specialist_id
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

    await Mailer.send(appointment.email, "Appointment has been set", setAppointmentTemplate(appointment.last_name, schedule.date, schedule.time, schedule.service_type))

    return res.json({
        "result": true,
        "message": "Appointment has been set!"
    })
}

const getAppointments = async (req, res) => {
    const userId = req.body.userId
    if (!userId) {
        return res.json({
            'result': false,
            'message': "User ID is required"
        })
    }

    const appointments = await Appointment.findMany(userId)
    return res.json({
        'result': true,
        "appointments": appointments
    })
}

const getAppointmentBySpecialist = async (req, res) => {
    const condition = {
        specialist_id: req.param.specialistId
    }
    const appointments = await Appointment.findManyCondition(condition)

    return res.json({
        result: true,
        appointments: appointments
    })
}

const addAppointmentRating = async (req, res) => {
    const appointmentId = req.body.appointmentId;
    const rating = {
        rating: req.body.rating,
        comment: req.body.comment
    }

    const addRating = await Appointment.update(appointmentId, rating)
    if (!addRating) {
        return res.json({
            result: false,
            message: "Unable to add appointment rating"
        })
    }

    return res.json({
        result: true,
        message: "Thank you for your feedback"
    })
}

const approveAppointment = async (req, res) => {
    const appointmentId = req.body.appointmentId
    const data = {
        status: "approved"
    }

    const appointment = await Appointment.update(appointmentId, data)
    const schedule = await Schedule.findById(appointment.schedule_id)
    await Mailer.send(appointment.email, "Appointment has been approved", approveAppointmentTemplate(appointment.last_name, schedule.service_type))
    if (!appointment) {
        return res.json({
            result: false,
            message: "Unable to approve appointment"
        })
    }

    return res.json({
        result: true,
        message: "Appointment has been approved"
    })
}

const rejectAppointment = async (req, res) => {
    const appointmentId = req.body.appointmentId
    const data = {
        status: "reject"
    }

    const rejected = await Appointment.update(appointmentId, data)

    if (!rejected) {
        return res.json({
            result: false,
            message: "Unable to reject appointment"
        })
    }

    return res.json({
        result: true,
        message: "Appointment has been rejected"
    })
}

const searchByKeyword = async (req, res) => {
    const keyword = req.body.keyword
    const specialistId = req.body.specialist_id
    const result = await prisma.appointment.findMany({
        where: {
            specialist_id: specialistId,
            OR: [
                {
                    schedule: {
                        service_type: {
                            contains: keyword
                        }
                    }
                },
                {
                    first_name: {
                        contains: keyword
                    }
                },
                {
                    last_name: {
                        contains: keyword
                    }

                },
                {
                    status: {
                        contains: keyword
                    }
                }
            ]
        },
        include: {
            schedule: true
        }
    })

    return res.json({
        result: true,
        appointment: result
    })
}

module.exports = {
    setAppointment,
    getAppointments,
    addAppointmentRating,
    approveAppointment,
    rejectAppointment,
    getAppointmentBySpecialist,
    searchByKeyword
}