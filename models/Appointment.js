const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
    store: async (appointment) => {
        return await prisma.appointment.create({
            data: appointment
        })
    },

    findMany: async (id) => {
        return await prisma.appointment.findMany({
            where : {
                patient_id: id
            },
            include: {
                schedule: true
            },
            orderBy: [{
                created_at: "desc"
            }]
        })
    },

    findManyCondition: async(condition) => {
        return await prisma.appointment.findMany({
            where: condition,
            orderBy: [
                {
                    id: 'desc'
                }
            ],
            include: {
                schedule: true
            },
            orderBy: [
                {
                    created_at: 'desc'
                }
            ]
        })
    },

    update: async(id, data) => {
        return await prisma.appointment.update({
            where: {
                id: id
            },
            data: data
        })
    }
}