const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {

    all: async (eagerLoad = false) => {
        if (eagerLoad) {
            return await prisma.specialist.findMany({
                include: {
                    appointments: true,
                    schedules: true
                }
            })
        }
        return await prisma.specialist.findMany()
    },

    store: async (specialist) => {
        return await prisma.specialist.create({
            data: specialist
        })
    },

    storeMany:  async (schedule) => {
        const response = await prisma.specialist.createMany({
            data: schedule
        })

        return response ? true : false;
    },

    findById: async (id) => {
        return await prisma.specialist.findUnique({
            where: {
                id: id
            }
        })
    },

    show: async (condition) => {
        return await prisma.specialist.findFirst({
            where: condition
        })
    },

    delete: async(id) => {
        return await prisma.specialist.delete({
            where: {
                id: id
            }
        })
    }
}