export interface GetAddressRequest {
  id: string;
  description: string;
  street: string
  flatNumber: number;
  districtId: string;
  customerId: string;
  //isDefaultAddress: boolean;
}
