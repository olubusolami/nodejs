//validation
const Joi = require('@hapi/joi');

//register validation
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required(),
    });
    return schema.validate(data);
};

//loginValidation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required()
    });
    return schema.validate(data);
};

//create_user validation
const create_userValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required(),
        confirm_password: Joi.string()
        .min(6)
        .required(),
        country: Joi.string()
        .min(6)
        .required(),
        contact_number: Joi.number()
        .min(11),
    });
    return schema.validate(data);
};


// module.exports.registerValidation = registerValidation;
// module.exports.loginValidation = loginValidation;
// module.exports.create_userValidation = create_userValidation;
module.exports = {
    registerValidation,
    loginValidation,
    create_userValidation
}