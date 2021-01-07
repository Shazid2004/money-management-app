const validator = require('validator').default

const validate = user => {
    let error = {}

    if (!user.email) {
        error.email = 'Please provide your email'
    } else if (!validator.isEmail(user.email)) {
        error.email = 'Please provide a valid email'
    }
    
    if (!user.password) {
        error.paswword = 'Please provide your password'
    } else if (user.password.length < 6) {
        error.paswword = 'Password must be greater than 6 character'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }    
}

module.exports = validate
