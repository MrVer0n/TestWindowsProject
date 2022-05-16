import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

import { Person } from '../models/person.model';

const HOST = 'http://localhost:4100/';
const URL = 'person/';
@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private personList: Person[] = [];

  constructor(private _http: HttpClient) {}

  getPersonList(url: string = URL, params: { [param: string]: any }, providedHost: string = HOST): Observable<Person[] | any> {
    return this._http.get<Person[] | any>(`${providedHost}${url}`, { params })
    .pipe(
      retry(3),
      catchError((e) => of(e.status))
    );
  }

  getPersonForId(url: string = URL, person: Person, providedHost: string = HOST): Observable<Person | any> {
    const id = person.id;
    return this._http.get<Person | any>(`${providedHost}${url}/${id}`)
      .pipe(
        retry(3),
        catchError(e => of(e.status))
      );
  }

  updatePerson(url: string = URL, body: Person, providedHost: string = HOST): Observable<Person | any> {
    const id = body.id;
    return this._http.put<Person | any>(`${providedHost}${url}/${id}`, body)
      .pipe(
        catchError(e => of(e.status))
      );
  }

  addNewPerson<T>(url: string = URL, body: Person, providedHost: string = HOST, params = {}): Observable<Person | any> {
    return this._http.post<Person | any>(`${providedHost}${url}`, body, params)
      .pipe(
        catchError(e => of(e.status))
      );
  }

  deletePerson(url: string = URL, person: Person, providedHost: string = HOST): Observable<Person | any> {
    const id = person.id;
    return this._http.delete<Person | any>(`${providedHost}${url}/${id}`, {})
    .pipe(
      catchError((e) => of(e.status))
    );
  }
}
