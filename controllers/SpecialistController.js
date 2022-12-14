const Specialist = require('../models/Specialist')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const {md5} = require('../helpers/hashing')

exports.dashboard = async(req,res) => {
    const patient = await prisma.patient.findMany()
    const appointment = await prisma.appointment.findMany()
    const schedules = await prisma.schedule.findMany({
        where: {
            NOT: {
                deleted_flag: true
            }
        }
    })

    return res.json({
        result: true,
        data: {
            patients: patient.length,
            appointments: appointment.length,
            schedules: schedules.length
        }
    })
}

exports.all = async(req,res) => {
    const specialists = await Specialist.all()

    return res.json({
        result: true,
        specialists: specialists
    })
}

exports.delete = async(req,res) => {
    const id = req.body.id

    const result = await Specialist.delete(id)
    if(!result) {
        return res.json({
            result:false,
            message: "Unable to delete specialist"
        })
    }

    return res.json({
        result:true,
        message: "Specialist successfully deleted"
    })
}

exports.update = async(req,res) => {
    const id = req.params.id
    const data = req.body

    const result = await prisma.specialist.update({
        where: {
            id: id
        },
        data: data
    })

    if(!result) {
        return res.json({
            result: false,
            message: "Unable to update specialist information"
        })
    }

    return res.json({
        result: true,
        message: "Specialist profile successfully updated"
    })
}

exports.store = async(req,res) => {
    const data = req.body

    const result = await prisma.specialist.create({
        data: data
    })

    const account = await prisma.account.create({
        data: {
            username: result.employee_id,
            password: await md5('1234'),
            user_id: result.id,
            account_type: 2
        }
    })

    if(!result) {
        return res.json({
            result: false,
            message: "Unable to add specialist"
        })
    }

    return res.json({
        result: true,
        message: "New specialist has been added!"
    })
}