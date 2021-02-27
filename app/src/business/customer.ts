import { v4 as uuidv4 } from 'uuid';
import CODE_MESSAGES from '../constants/codeMessages';
import { CustomerInterface } from '../interfaces/customer';
import CustomerRepository from '../repository/customer';
import { CodeMessagesInterface } from '../interfaces/codeMessages';
import NotFoundError from '../exceptions/notFoundError';

class CustomerBusiness {
  customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  /**
   * Function that get customer by ID
   * @param customer_id string
   */
  async getById(customerId: string): Promise<CustomerInterface> {
    const customerResponse = await this.customerRepository.getById(customerId);
    if (!customerResponse.Item) throw new NotFoundError(CODE_MESSAGES.CUSTOMER_NOT_FOUND);
    return customerResponse.Item as CustomerInterface;
  }

  /**
   * Function that register a customer
   * @param requestBody CustomerInterface
   */
  async register(requestBody: CustomerInterface): Promise<CodeMessagesInterface> {
    const customerObject = {
      customer_cognito_id: uuidv4(),
      name: requestBody.name,
      date_of_birth: requestBody.date_of_birth,
    };
    await this.customerRepository.register(customerObject);
    return CODE_MESSAGES.CUSTOMER_CREATION_SUCCESS;
  }
}

export default CustomerBusiness;
