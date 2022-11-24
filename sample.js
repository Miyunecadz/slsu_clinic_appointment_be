const crypto = require('crypto')


const create = async () => {
   const password = '1234'
   const md5 = crypto.createHash('md5').update(password).digest('hex')
   const newHash = crypto.createHash('md5').update(password).digest('hex')

   console.log(newHash, md5)
}

create();

