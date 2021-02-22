/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import { APIGatewayEvent } from 'aws-lambda';
import { getById, register } from '../src/handler/customer';

describe('Tests suit - Customer Handler.', () => {
  it('SUCESS: Should create customer successfully.', async () => {
    const event = {
      pathParameters: {
        customer_id: 'TDD_WILL',
      },
    } as unknown as APIGatewayEvent;
    const response = await getById(event);
    expect(response.statusCode).to.equal(200);
  });

  it('SUCESS: Should get customer by ID.', async () => {
    const event = {
      body: JSON.stringify({
        name: 'William Penna',
        date_of_birth: '08/04/1986',
      }),
    } as APIGatewayEvent;
    const response = await register(event);
    expect(response.statusCode).to.equal(201);
  });
});
