/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import CustomerBusiness from '../src/business/customer';
import CODE_MESSAGES from '../src/constants/codeMessages';
import CustomerRepository from '../src/repository/customer';

const customerRepository = new CustomerRepository();
const customerBusiness = new CustomerBusiness(customerRepository);

describe('Tests suit - Customer Business.', () => {
  it('SUCESS: Should create customer successfully.', async () => {
    const customerObject = {
      customer_cognito_id: 'TDD_WILL',
      name: 'William Penna',
      date_of_birth: '08/04/1986',
    };
    const response = await customerBusiness.register(customerObject);
    expect(response.message).to.equal(CODE_MESSAGES.CUSTOMER_CREATION_SUCCESS.message);
  });

  it('SUCESS: Should get customer by ID.', async () => {
    const response = await customerBusiness.getById('TDD_WILL');
    expect(response.customer_cognito_id).to.equal('TDD_WILL');
  });
});
