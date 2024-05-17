export interface UpdateAddressRequest {
  id: string;
  description: string;
  street: string
  flatNumber: number;
  defaultAddress: boolean;
  districtId: string;
  customerId: string;
}
