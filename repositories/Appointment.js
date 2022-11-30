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
            }
        })
    }
}