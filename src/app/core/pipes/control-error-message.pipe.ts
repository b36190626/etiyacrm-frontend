import { Pipe, type PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'etiyaControlErrorMessage',
  standalone: true,
})
export class ControlErrorMessagePipe implements PipeTransform {

  transform(control: ValidationErrors | null | undefined, ...args: unknown[]): unknown {
    if(!control){
      return '';
    }

    return  control['required']? ' This field is required.':
            control['customerError']? 'Unknown error.':
            control['loginError']? 'Wrong username or password. Please try again..':
            control['loginEmpty']? 'Username and password fields cant be left empty.':
            control['loginCharacter']? 'Username field does not allow Turkish characters, numbers, or symbols.':
            control['loginPassword']? 'Password can not be less than 8 characters.':
            control['credential']? 'Matching credentials not found.':
            control['pattern']? 'Invalid format.':
            control['minlength'] ? `This field must be at least ${control['minlength'].requiredLength} characters but it has ${control['minlength'].actualLength} characters.` :
            control['maxlength'] ? `This field must be maximum ${control['maxlength'].requiredLength} characters but it has ${control['maxlength'].actualLength} characters.` : 'Invalid';
  }

}