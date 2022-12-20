const Admin = require('../models/Admin')
const Account = require('../models/Account')
const {md5} = require('../helpers/hashing')

async function run() {
    const adminData = {
        first_name: "Hadassah",
        last_name: "Sablayan",
        display_name: "Admin"
    }

    const admin = await Admin.store(adminData)
    const adminAccount = await Account.create({
        username: "admin",
        password: await md5("admin"),
        user_id: admin.id,
        account_type: 1
    })

    if(admin && adminAccount) console.log('New admin has been added')
}

run()