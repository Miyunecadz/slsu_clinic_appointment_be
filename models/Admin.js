const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
    all : async () => {
        return await prisma.admin.findMany()
    },

    findById: async(id) => {
        return await prisma.admin.findUnique({
            where: {
                id: id
            }
        })
    },

    store: async(admin) => {
        return await prisma.admin.create({
            data: admin
        })
    },

    update: async(id, data) => {
        return await prisma.admin.update({
            where: {
                id: id
            },
            data: data
        })
    },

    delete: async(id) => {
        return await prisma.admin.delete({
            where: {
                id: id
            }
        })
    }
}