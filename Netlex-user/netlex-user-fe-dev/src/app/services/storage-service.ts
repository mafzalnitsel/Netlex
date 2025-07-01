import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class StorageService {
  constructor() {
  }

  get<T>(name: string): T {
    if (!name?.length) {
      return;
    }
    const item = localStorage.getItem(name);
    if (!item?.length) {
      return;
    }

    try {
      return JSON.parse(item);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  remove(name: string): void {
    if (!name?.length) {
      return;
    }
    localStorage.removeItem(name);
  }

  set<T>(name: string, item: T): void {
    if (!item || !name?.length) {
      return;
    }

    localStorage.setItem(name, JSON.stringify(item));
  }
}
