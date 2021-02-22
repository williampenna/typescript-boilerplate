import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as logger from 'i-logs';
import { dataResponse, errorResponse } from 'i-response-message';
import { CustomerInterface } from '../interfaces/customer';
import CustomerRepository from '../repository/customer';
import createCustomerSchema from '../schema/customerSchema';
import CustomerBusiness from '../business/customer';
import HTTP_STATUS_CODE from '../constants/httpStatusCode';
import schemaValidator from '../utils/commonsValidator';

/**
 * Function that get customer by ID
 * @param event APIGatewayEvent
 */
export const getById = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const customerRepository = new CustomerRepository();
    const customerBusiness = new CustomerBusiness(customerRepository);
    const response = await customerBusiness.getById(event.pathParameters.customer_id);
    return dataResponse(HTTP_STATUS_CODE.GET, response);
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
    const customerRepository = new CustomerRepository();
    const customerBusiness = new CustomerBusiness(customerRepository);
    const body = await schemaValidator(JSON.parse(event.body), createCustomerSchema) as CustomerInterface;
    const response = await customerBusiness.register(body);
    return dataResponse(HTTP_STATUS_CODE.POST, response);
  } catch (error) {
    logger.log('Register Customer Error::: ', error);
    return errorResponse(error.statusCode, error);
  }
};
