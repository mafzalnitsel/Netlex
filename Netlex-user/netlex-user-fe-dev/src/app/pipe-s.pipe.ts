import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeS'
})
export class PipeSPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
