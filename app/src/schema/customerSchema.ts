import * as Joi from 'joi-i18n';

const createCustomerSchema = Joi.object({
  name: Joi.string().strict().trim().max(50)
    .required(),
  date_of_birth: Joi.string().required(),
});

export default createCustomerSchema;
