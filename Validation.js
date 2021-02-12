const Joi = require('joi') //joi is used to validate created object from the with the required fields of the information we are taking as input.

const registerValidation = data => {
    const RegistrationSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return RegistrationSchema.validate(data)
}

const loginValidation = data => {
    const LoginSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return LoginSchema.validate(data)
}

module.exports.loginValidation = loginValidation
module.exports.registerValidation = registerValidation