import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(products: any[], category: string): any[] {
    if (!category || category.trim().toLowerCase() === 'all') {
      return products;
    }
    console.log(category);
    return products.filter(product => product.category.trim().toLowerCase() === category.trim().toLowerCase());
  }

}
