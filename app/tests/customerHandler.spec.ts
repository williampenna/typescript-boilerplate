/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import * as sinon from 'sinon';
import { expect } from 'chai';
import { APIGatewayEvent } from 'aws-lambda';
import { getById, register } from '../src/handler/customer';
import NotFoundError from '../src/exceptions/notFoundError';
import CODE_MESSAGES from '../src/constants/codeMessages';
import CustomerBusiness from '../src/business/customer';

let sandbox: sinon.SinonSandbox;

describe('Tests suit - Customer Handler.', () => {
  beforeEach('Before Each Test', async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach('After Each Test', async () => {
    sandbox.restore();
  });

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

  it('FAIL: Should get customer by ID that does not exist.', async () => {
    try {
      const notFoundError = new NotFoundError(CODE_MESSAGES.CUSTOMER_NOT_FOUND);
      sandbox.stub(CustomerBusiness.prototype, 'getById').throws(notFoundError);
      const event = {
        pathParameters: {
          customer_id: 'USER_NOT_EXISTS',
        },
      } as unknown as APIGatewayEvent;
      await getById(event);
    } catch (error) {
      expect(error.statusCode).to.equal(404);
    }
  });
});
