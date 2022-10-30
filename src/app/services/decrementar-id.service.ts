import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecrementarIdService {



  Id$ = new EventEmitter<number>();
  constructor() { }
}
