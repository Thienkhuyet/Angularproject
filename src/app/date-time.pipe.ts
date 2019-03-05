import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(stringDate: string): string {
    const date = new Date(stringDate);
    return  `${date.getFullYear()}${date.getMonth()}${date.getDay()}`;
  }

}
