/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import CustomerRepository from '../src/repository/customer';

const customerRepository = new CustomerRepository();

describe('Tests suit - Customer Repository.', () => {
  it('SUCESS: Should create customer successfully.', async () => {
    const customerObject = {
      customer_cognito_id: 'TDD_WILL',
      name: 'William Penna',
      date_of_birth: '08/04/1986',
    };
    const response = await customerRepository.register(customerObject);
    expect(Object.entries(response).length).to.equal(0);
  });

  it('SUCESS: Should get customer by ID.', async () => {
    const response = await customerRepository.getById('TDD_WILL');
    expect(response.Item.customer_cognito_id).to.equal('TDD_WILL');
  });
});
