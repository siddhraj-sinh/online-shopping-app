import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByPipe'
})
export class SortByPipePipe implements PipeTransform {

  transform(items: any[], sortBy: string): any[] {
    if (!items || !sortBy) {
      return items;
    }

    return items.sort((a, b) => {
      if (sortBy === 'asc') {
        return a.price - b.price;
      } else if (sortBy === 'desc') {
        return b.price - a.price;
      } else {
        return 0;
      }
    });
  }
}
