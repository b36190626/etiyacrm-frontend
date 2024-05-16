import { Pipe, type PipeTransform } from '@angular/core';
import { DistrictsResponseDto } from '../../features/customers/models/districts/districts-response-dto';
import { CitiesResponseDto } from '../../features/customers/models/cities/cities-response-dto';

@Pipe({
  name: 'appIdToName',
  standalone: true,
})
export class IdToNamePipe implements PipeTransform {

  transform(districtId: string, districts: DistrictsResponseDto[], cities: CitiesResponseDto[], type: 'city' | 'district'): string {
    const district = districts.find(d => d.id === districtId);
    if (district) {
      if (type === 'city') {
        const city = cities.find(c => c.id === district.cityId);
        return city ? city.name : 'City not found';
      }
      if(type== 'district')
        return district.name;
    }
    return 'Not found';
  }

}
