/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TABLE_NAMES from '../constants/tableNames';
import docClient from '../aws/dynamo';
import { CustomerInterface } from '../interfaces/customer';

class CustomerRepository {
  /**
   * Function that get customer by ID
   * @param id string
   */
  async getById(id: string): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> {
    const params = {
      TableName: TABLE_NAMES.CUSTOMER,
      Key: {
        customer_cognito_id: id,
      },
    } as AWS.DynamoDB.DocumentClient.GetItemInput;
    return docClient.get(params).promise();
  }

  /**
   * Function that save customer on DB
   * @param name string
   * @param dateOfBirth string
   */
  async register(customerObject: CustomerInterface)
  : Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
    const params = {
      TableName: TABLE_NAMES.CUSTOMER,
      Item: customerObject,
    };
    return docClient.put(params).promise();
  }
}

export default CustomerRepository;
