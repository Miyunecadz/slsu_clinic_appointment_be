const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {

    createMany:  async (schedule) => {
        const response = await prisma.schedule.createMany({
            data: schedule
        })

        return response ? true : false;
    },

    create:  async (schedule) => {
        const response = await prisma.schedule.create({
            data: schedule
        })

        return response ? true : false;
    },

    findById: async (id) => {
        return await prisma.schedule.findUnique({
            where: {
                id: id
            }
        })
    },

    show: async (condition) => {
        return await prisma.schedule.findFirst({
            where: condition
        })
    },
}