import { CreateContactMediumRequest } from "../../../features/customers/models/contact-medium/requests/create-contact-medium-request";

export interface ContactMediumState {
  contactMedium: CreateContactMediumRequest;
}

export const initialContactMediumState: ContactMediumState = {
  contactMedium: {
    email: '',
    mobilePhone: '',
    homePhone: '',
    fax: '',
    customerId: null,
  }
}
