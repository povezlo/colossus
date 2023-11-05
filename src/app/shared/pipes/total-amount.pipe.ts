import { Pipe, PipeTransform } from '@angular/core';

export interface IAmountItem {
  amount: number;
}

@Pipe({
  name: 'totalAmount',
  standalone: true,
  pure: true,
})
export class TotalAmountPipe implements PipeTransform {
  transform(items: IAmountItem[]): number {
    if (!items || items.length === 0) {
      return 0;
    }

    return items.reduce((total, item) => total + item.amount, 0);
  }
}
