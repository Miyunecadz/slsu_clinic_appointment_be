const { PrismaClient } = require('@prisma/client')
const Account = require('../models/Account')
const prisma = new PrismaClient()

exports.update = async(req, res) => {
    const condition = {
        id: req.body.id
    }
    const profileData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        address: req.body.address,
        contact_number: req.body.contact_number,
    }

    try{
        const result = await prisma.specialist.update({
            where: condition,
            data: profileData,
        })

        if(!result) {
            return res.json({
                result: false,
                message: "Unable to update profile"
            })
        }

        result.account_type = 2
        return res.json({
            result: true,
            user: result,
            message: "Successfully updated profile!"
        })
    }catch(e) {
        return res.json({
            result: false,
            message: "Server error contact the administrator"
        })
    }
}

exports.delete = async(req, res) => {
    const condition = {
        id: req.body.id
    }

    try {
        const result = await prisma.schedule.update({
            where: condition,
            data: {
                deleted_flag: true
            }
        })

        if(!result) {
            return res.json({
                result: false,
                message: "Unable to delete account"
            })
        }
        
        return res.json({
            result:true,
            message: "Account has been successfully deleted!"
        })
    } catch(e) {
        return res.json({
            result: false,
            message: "Server error, contact administrator"
        })
    }
}