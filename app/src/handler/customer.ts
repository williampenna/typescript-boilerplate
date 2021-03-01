import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as logger from 'i-logs';
import { dataResponse, errorResponse } from 'i-response-message';
import { v4 as uuidv4 } from 'uuid';
import docClient from '../aws/dynamo';
import TABLE_NAMES from '../constants/tableNames';
import CODE_MESSAGES from '../constants/codeMessages';
import { CustomerInterface } from '../interfaces/customer';
// import CustomerRepository from '../repository/customer';
import createCustomerSchema from '../schema/customerSchema';
// import CustomerBusiness from '../business/customer';
import HTTP_STATUS_CODE from '../constants/httpStatusCode';
import schemaValidator from '../utils/commonsValidator';

/**
 * Function that get customer by ID
 * @param event APIGatewayEvent
 */
export const getById = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    // const customerRepository = new CustomerRepository();
    // const customerBusiness = new CustomerBusiness(customerRepository);
    // const response = await customerBusiness.getById(event.pathParameters.customer_id);
    const params = {
      TableName: TABLE_NAMES.CUSTOMER,
      Key: {
        customer_cognito_id: event.pathParameters.customer_id,
      },
    } as AWS.DynamoDB.DocumentClient.GetItemInput;
    const response = await docClient.get(params).promise();
    return dataResponse(HTTP_STATUS_CODE.GET, response.Item);
  } catch (error) {
    logger.log('Get Customer By ID Error::: ', error);
    return errorResponse(error.statusCode, error);
  }
};

/**
 * Function that register a customer
 * @param event APIGatewayEvent
 */
export const register = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    // const customerRepository = new CustomerRepository();
    // const customerBusiness = new CustomerBusiness(customerRepository);
    const body = await schemaValidator(JSON.parse(event.body), createCustomerSchema) as CustomerInterface;
    const customerObject = {
      customer_cognito_id: uuidv4(),
      name: body.name,
      date_of_birth: body.date_of_birth,
    };
    const params = {
      TableName: TABLE_NAMES.CUSTOMER,
      Item: customerObject,
    };
    await docClient.put(params).promise();
    // const response = await customerBusiness.register(body);
    return dataResponse(HTTP_STATUS_CODE.POST, CODE_MESSAGES.CUSTOMER_CREATION_SUCCESS);
  } catch (error) {
    logger.log('Register Customer Error::: ', error);
    return errorResponse(error.statusCode, error);
  }
};
