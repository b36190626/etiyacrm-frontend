import { createAction, props } from "@ngrx/store";
import { CreateContactMediumRequest } from "../../../features/customers/models/contact-medium/requests/create-contact-medium-request";

export const setContactMedium = createAction(
  '[Contact Medium] set Contact Medium',
  props<{ contactMedium: CreateContactMediumRequest}>())
