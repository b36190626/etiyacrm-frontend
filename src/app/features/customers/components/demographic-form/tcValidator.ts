import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function tcValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const tckn = control.value;
    if (!tckn || tckn.length !== 11 || !/^[0-9]+$/.test(tckn)) {
      return { invalidTCKN: true };
    }

    const digits = tckn.split('').map(Number);
    if (digits[0] === 0) {
      return { invalidTCKN: true };
    }

    const sumOdd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    const sumEven = digits[1] + digits[3] + digits[5] + digits[7];
    const check10 = (7 * sumOdd - sumEven) % 10;
    const check11 = (sumOdd + sumEven + digits[9]) % 10;

    if (check10 !== digits[9] || check11 !== digits[10]) {
      return { invalidTCKN: true };
    }

    return null;
  };
}
