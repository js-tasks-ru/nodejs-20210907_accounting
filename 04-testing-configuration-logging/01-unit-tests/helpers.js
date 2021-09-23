const Validator = require('./Validator');

const validatorTestCase = (objectToValidate, inputObject) => {
    const validator = new Validator(objectToValidate);
    const errors = validator.validate(inputObject);
    return errors ? errors : null;
}

module.exports = { validatorTestCase }