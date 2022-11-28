const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
    store: async (appointment) => {
        return await prisma.appointment.create({
            data: appointment
        })
    }
}