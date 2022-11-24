const crypto = require('crypto')

module.exports = {
    md5: async (data) => {
        return await crypto.createHash('md5').update(data).digest('hex')
    }
}