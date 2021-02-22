import * as AWS from 'aws-sdk';
import configuration from './configuration';

AWS.config.update({ region: configuration.REGION });

const docClient = new AWS.DynamoDB.DocumentClient();

export default docClient;
