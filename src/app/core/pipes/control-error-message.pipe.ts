import { Pipe, type PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'etiyaControlErrorMessage',
  standalone: true,
})
export class ControlErrorMessagePipe implements PipeTransform {

  //transform(control: ValidationErrors | null | undefined, controlName: string): unknown{
  transform(control: ValidationErrors | null | undefined, ...args: unknown[]): unknown {
    if(!control){
      return '';
    }
    return  control['required']? 'You must fill in the required fields marked with the "*" symbol. ':
            control['customerError']? 'Unknown error.':
            //control['loginError']? 'Wrong username or password. Please try again..':
           // control['loginEmpty']? 'Username and password fields cant be left empty.':
            control['loginCharacter']? 'Username field does not allow Turkish characters, numbers, or symbols.':
            control['credential']? 'Matching credentials not found.':
            control['pattern']? 'Invalid format.':
            control['minlength'] ? `This field must be minimum ${control['minlength'].requiredLength} characters but it has ${control['minlength'].actualLength} characters.` :
            control['maxlength'] ? `This field must be maximum ${control['maxlength'].requiredLength} characters but it has ${control['maxlength'].actualLength} characters.` :
            control['email']? 'This is not a valid e-mail format.':
            control['invalidDomain']? 'This is not a valid e-mail format Correct usage: example@email.com.':
            control['invalidTCKN']? 'This Nationality ID is not valid.':
            control['nationalityIdExist']? 'A customer already exists with this Nationality ID.':
            'Invalid'
    // const generalMessages = {
    //   'required': 'You must fill in the required fields marked with the "*" symbol. ',
    //   'customerError': 'Unknown error.',
    //   'loginCharacter': 'Username field does not allow Turkish characters, numbers, or symbols.',
    //   'credential': 'Matching credentials not found.',
    //   'pattern': 'Invalid format.',
    //   'minlength' : `This field must be minimum ${control['minlength'].requiredLength} characters but it has ${control['minlength'].actualLength} characters.` ,
    //   'maxlength': `This field must be maximum ${control['maxlength'].requiredLength} characters but it has ${control['maxlength'].actualLength} characters.` ,
    //   'email': 'This is not a valid e-mail format.',
    //   'invalidDomain': 'This is not a valid e-mail format Correct usage: example@email.com.',
    //   'invalidTCKN': 'This Nationality ID is not valid.',
    //   'nationalityIdExist': 'A customer already exists with this Nationality ID.',
    // }

    // const specificMessages = {
    //   'username': {
    //     'loginError': 'Wrong username or password. Please try again',
    //     'loginEmpty': 'Username and password fields cannot be empty.'
    //   },
    //   'password': {
    //     'loginError': 'Wrong username or password. Please try again',
    //     'loginEmpty': 'Username and password fields cannot be empty.',
    //     'length': 'Password cannot be less than 8 characters',
    //   }
    // };

    // return specificMessages[controlName]?.[Object.keys(control)[0]] || generalMessages[Object.keys(control)[0]] || 'Geçersiz';
  }

}
