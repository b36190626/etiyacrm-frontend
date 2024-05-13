import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appIdToName',
  standalone: true,
})
export class IdToNamePipe implements PipeTransform {

  transform(value: any, args: any[]): any {
    return args.find(item => item.id === value)?.name || 'Not found';
  }

}
