export interface CustomerListItemDto {

  items: items[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean
}

  export interface items {
    id: number;
    customerId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    birthDate: Date;
    motherName: string;
    fatherName: string;
    nationalityIdentity: number;

  }
  //role: string;
  // addresses: AddressDTO[];
  // contactMedium: ContactMediumDTO;
  // billingAccounts: BillingAccountDTO[];


// export interface AddressDTO {
//   id: number;
//   city: CityDTO;
//   street: string;
//   flatNumber: number;
//   description: string;
// }

// export interface CityDTO {
//   id: number;
//   name: string;
// }

// export interface ContactMediumDTO {
//   email: string;
//   homePhone: string;
//   mobilePhone: string;
//   fax: string;
// }

// export interface BillingAccountDTO {
//   id: number;
//   accountNumber: string;
//   accountName: string;
//   description: string;
//   status: string;
//   addresses: AddressDTO[];
//   orders: OrderDTO[];
// }

// export interface OrderDTO {
//   id: number;
//   offers: OfferDTO[];
// }

// export interface OfferDTO {
//   id: number;
//   type: OfferTypeDTO;
//   name: string;
//   products: ProductDTO[];
// }

// export interface OfferTypeDTO {
//   id: number;
//   typeName: string;
//   name: string;
// }

// export interface ProductDTO {
//   id: number;
//   name: string;
//   description: string;
//   amount: number;
// }
