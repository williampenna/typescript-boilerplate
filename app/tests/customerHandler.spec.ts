/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines-per-function */
import * as sinon from 'sinon';
import { expect } from 'chai';
import { APIGatewayEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { AWSError, Request } from 'aws-sdk';
import { register } from '../src/handler/customer';

let sandbox: sinon.SinonSandbox;

describe('Tests suite - Plan Service.', () => {
  beforeEach('Before each test', async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach('After each test', async () => {
    sandbox.restore();
  });

  it('SUCESS: Should register customer', async () => {
    const customerBody = {
      body: JSON.stringify({
        name: 'WILL_TEST_TDD',
        date_of_birth: '08/04/198678',
      }),
    } as unknown as APIGatewayEvent;
    const returnValueMock = {
      promise() {
        return {};
      },
    } as unknown as Request<AWS.DynamoDB.DocumentClient.QueryOutput, AWSError>;
    sandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'put').returns(returnValueMock);
    const response = await register(customerBody);
    expect(response.statusCode).to.equal(201);
  });

  it('FAIL: Should register customer with no name', async () => {
    const customerBody = {
      body: JSON.stringify({
        date_of_birth: '08/04/1986',
      }),
    } as unknown as APIGatewayEvent;
    const response = await register(customerBody);
    expect(response.statusCode).to.equal(400);
  });

  it('FAIL: Should register customer with no date of birth', async () => {
    const customerBody = {
      body: JSON.stringify({
        name: 'William Cezar',
      }),
    } as unknown as APIGatewayEvent;
    const response = await register(customerBody);
    expect(response.statusCode).to.equal(400);
  });

  it('ERROR: Should register customer with name less than 50 characters', async () => {
    const customerBody = {
      body: JSON.stringify({
        name: 'WILL_TEST_TDDKJDSAFKJDSKFJASDKFJDSKFJDFJÇDSJFÇKLADSJFLKADSJFLKJASDFKLJSDLFKAJSL',
        date_of_birth: '08/04/1986',
      }),
    } as unknown as APIGatewayEvent;
    const response = await register(customerBody);
    expect(response.statusCode).to.equal(400);
  });
});
