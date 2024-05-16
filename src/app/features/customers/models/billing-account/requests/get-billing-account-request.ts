export interface GetBillingAccountRequest {
  name: string;
  description: string;

  //get için gerekli mi?
  customerId: string;
  addressId: string;

  //bunlar var mı?
  accountNumber: string;
  type: string;
}
