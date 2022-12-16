const Patient = require('../models/Patient')
const Account = require('../models/Account')
const Specialist = require('../models/Specialist')

const destroy = async(req,res) => {
    const {id , accountType} = req.body
    
    const accountResult = await Account.find({
        user_id: id
    })
    
    const deleteAccount = await Account.delete(accountResult.id)
    let deleteResult = "undefined"
    if(accountType == 2) {
        deleteResult = await Specialist.delete(id)
    }
    else if(accountType == 3) {
        deleteResult = await Patient.delete(id)
    }

    if(!deleteResult && !deleteAccount) {
        return res.json({
            result: false,
            message: "Unable to delete account"
        })
    }

    return res.json({
        result:true,
    })
}

module.exports = {
    destroy
}