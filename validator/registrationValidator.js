const validator = require('validator')

module.exports = data => {
    let error = {}

    if(!data.name){
        error.name = 'You have to provide a valid name'
    }

    if(!data.email){
        error.email = 'You have to provide a valid email'
    }else if(!validator.isEmail(data.email)){
        error.email = 'You have to provide a valid email'
    }

    if(!data.password){
        error.password = 'You have to provide a valid password'
    }else if(data.password.length <6 || data.password.length > 30){
        error.password = 'Password length must be between 6 to 30'
    }

    if(!data.confirmPassword){
        error.confirmPassword = 'You have to Confirm your password'
    }else if(data.password !== data.confirmPassword){
        error.confirmPassword = 'Password dose not match properly'
    }

    return {
        error,
        valid: Object.keys(error).length === 0
    }
}