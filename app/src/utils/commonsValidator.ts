/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Joi from 'joi-i18n';

const schemaValidator = (body: unknown, schema: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Joi.validate(body, schema, (err: Error, value: unknown) => {
    if (err) {
      throw err;
    }
  });
  return body;
};

export default schemaValidator;
