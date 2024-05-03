export interface CustomerListItemDto {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  role: string;
  nationalityId: string;
  accountNumber: string;
  gsmNumber: string;
  billingAccounts: BillingAccounts;
  contactMedium: ContactMedium;
}

interface ContactMedium{
  mobilePhone: string;
}
interface BillingAccounts {
  id: number;
  status: string;
  accountNumber: string;
  accountName: string;
  accountType: string;   // bu ne
  orders: Orders;
}

interface Orders {
  id: number;
  offers: Offers;
}

interface Offers{
  id: number;
  type: string;
  products: Products;
}
interface Products{
  id: number;
  name: string;
}
