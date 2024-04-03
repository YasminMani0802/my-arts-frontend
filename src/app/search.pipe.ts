import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr: any[], searchVal: string): any {
    if (!arr) return [];
    if (!searchVal) return arr;

    return arr.filter((item: any) => {
      for (const key in item) {
        if (!item[key]) continue;

        const itemVal = item[key].toString().toLowerCase();

        if (itemVal.includes(searchVal.toLowerCase())) return true;
      }
      return false;
    });
  }

}
