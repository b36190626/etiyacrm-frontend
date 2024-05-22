import { Pipe, type PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'etiyaControlErrorMessage',
  standalone: true,
})
export class ControlErrorMessagePipe implements PipeTransform {
  transform(control: ValidationErrors | null | undefined, ...args: unknown[]): string {
    if(!control){
      return '';
    }
    return  control['required']? 'You must fill in the required fields marked with the "*" symbol. ':
            control['customerError']? 'Unknown error.':
            control['loginCharacter']? 'Username field does not allow Turkish characters, numbers, or symbols.':
            control['credential']? 'Matching credentials not found.':
            control['pattern']? 'Invalid format.':
            control['minlength'] ? `This field must be minimum ${control['minlength'].requiredLength} characters.` :
            control['maxlength'] ? `This field must be maximum ${control['maxlength'].requiredLength} characters.` :
            control['email']? 'This is not a valid e-mail format.':
            control['invalidDomain']? 'This is not a valid e-mail format Correct usage: example@email.com.':
            control['invalidTCKN']? 'This Nationality ID is not valid.':
            control['nationalityIdExist']? 'A customer already exists with this Nationality ID.':
            'Invalid'
  }

}
