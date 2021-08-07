import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'diffDate' })

export class PipePipe implements PipeTransform {

  transform(value: any): any {
    let dateA = new Date(value);
    let dateB = new Date();
    var diff = Math.abs(dateA.getTime() - dateB.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

}
