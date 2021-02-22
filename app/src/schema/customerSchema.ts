import * as Joi from 'joi-i18n';

const createCustomerSchema = Joi.object({
  name: Joi.string().strict().trim().required(),
  date_of_birth: Joi.string(),
});

export default createCustomerSchema;
