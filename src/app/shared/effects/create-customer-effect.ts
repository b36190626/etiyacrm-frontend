import { IndividualCustomerState } from './../stores/customers/individual-customer.state';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { withLatestFrom, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { setIndividualCustomer } from '../stores/customers/individual-customer.action';



@Injectable()
export class CreateCustomerEffect {
  constructor(
    private actions$: Actions,
    private store: Store<{individualCustomer: IndividualCustomerState}>,
    private http: HttpClient
  ) {}

  finalizeCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setIndividualCustomer),
      withLatestFrom(
        this.store.pipe(select('individualCustomer')),
      ),
      mergeMap(([action, IndividualCustomerState]) => {
        const combinedData = {
          individualCustomer: IndividualCustomerState.individualCustomer,

        };

        return this.http.post('http://localhost:8081/customerservice/api/v1/individualcustomers', combinedData).pipe(
          map(response => {
            return { type: '[API] Save Success', payload: response };
          }),
          catchError(error => of({ type: '[API] Save Failed', error }))
        );
      })
    )
  );
}
