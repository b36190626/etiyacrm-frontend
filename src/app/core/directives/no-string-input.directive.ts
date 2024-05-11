import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoStringInput]',
  standalone: true,
})
export class NoStringInputDirective {
  @HostListener('input', ['$event']) onInputChange(event:any) {
    const initalValue = event.target.value;
    event.target.value = initalValue.replace(/[^\d]*/g, '');
    if (initalValue !== event.target.value) {
      event.stopPropagation();
    }
  }
}
