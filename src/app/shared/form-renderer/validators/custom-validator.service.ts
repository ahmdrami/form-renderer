import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable()
export class CustomValidatorService {

  constructor(private http: HttpClient) { }

  check(endpoint: string, query, controlValue: string): any {
    return this.http.get(`api/${endpoint}?${query}=${controlValue}`);
  }
}
