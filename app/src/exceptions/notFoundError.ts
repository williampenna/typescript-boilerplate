import HTTP_STATUS_CODE from '../constants/httpStatusCode';
import { CodeMessagesInterface } from '../interfaces/codeMessages';

export default class NotFoundError extends Error {
    statusCode: number;

    code: string;

    constructor(codeMessagesInterface: CodeMessagesInterface) {
      super(`NotFoundError: ${codeMessagesInterface.message}`);
      this.name = 'NotFoundError';
      this.code = codeMessagesInterface.code;
      this.message = codeMessagesInterface.message;
      this.statusCode = HTTP_STATUS_CODE.NOT_FOUND;
    }
}
