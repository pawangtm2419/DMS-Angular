import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'inlakhs' })

export class inlakhsPipe implements PipeTransform {

  transform(value: any): any {
    var exp, rounded;
    if (window.isNaN(value)) {
      return null;
    }
    if (value < 100000) {
      return (value / 100000);
    }
    exp = Math.floor(Math.log(value) / Math.log(100000));
    return (value / Math.pow(100000, exp)).toFixed(2)
  }

}
