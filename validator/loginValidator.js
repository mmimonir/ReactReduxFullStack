const validator = require('validator')

module.exports = data => {
    let error = {}
    
    if (!data.email) {
        error.email = 'You have to provide a valid email'
    } else if (!validator.isEmail(data.email)) {
        error.email = 'You have to provide a valid email'
    }

    if (!data.password) {
        error.password = 'You have to provide a valid password'
    }

    

    return {
        error,
        valid: Object.keys(error).length === 0
    }
}