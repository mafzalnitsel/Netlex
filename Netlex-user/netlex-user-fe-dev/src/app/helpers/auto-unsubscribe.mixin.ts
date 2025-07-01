import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Constructor } from '../models/constructor';

export const autoUnsubscribeMixin =
  <T extends Constructor>(base: T = class {
  } as unknown as T) =>
    class extends base implements OnDestroy {
      destroyed$ = new Subject<void>();

      ngOnDestroy(): void {
        this.destroyed$.next();
      } 
};