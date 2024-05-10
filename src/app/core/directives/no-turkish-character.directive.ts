import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNoTurkishCharacter]',
  standalone: true,
})
export class NoTurkishCharacterDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // if the value is empty, don't perform validation
    }

    const turkishChars = /[ğüşıöçĞÜŞİÖÇ]/;
    if (turkishChars.test(control.value)) {
      return { 'loginCharacter': true };
    }

    return null; // If the validation passed, return null
  }
}
