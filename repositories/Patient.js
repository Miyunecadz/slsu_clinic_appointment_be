const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {

    all: async (eagerLoad = false) => {
        if(eagerLoad)
        {
            return await prisma.patient.findMany({
                include: {
                    appointments: true
                }
            })
        }

        return await prisma.patient.findMany()
    },

    store:  async (patient) => {
        return await prisma.patient.create({
            data: patient
        })        
    },

    findById: async (id) => {
        return await prisma.patient.findUnique({
            where: {
                id: id
            }
        })
    },

    show: async (condition) => {
        return await prisma.patient.findFirst({
            where: condition
        })
    },

    delete: async (id) => {
        return await prisma.patient.delete({
            where: {
                _id: id
            }
        })
    }

}