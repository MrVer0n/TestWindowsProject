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

  getPersonList(url: string = URL, params: { [param: string]: any }, providedHost: string = HOST): Observable<Person[]> {
    return this._http.get<Person[]>(`${providedHost}${url}`, { params }).pipe(
      retry(3),
      catchError((e) => of(e))
    );
  }

  getPersonForId(id: number) {
    return this.personList.filter((x) => x.id === id).map((x) => x);
  }

  updatePerson(url: string = URL, body: Person, providedHost: string = HOST): Observable<Person> {
    const id = body.id;
    return this._http.put<Person>(`${providedHost}${url}/${id}`, body)
      .pipe(
        catchError(e => of(e))
      );
  }

  addNewPerson<T>(url: string = URL, body: Person, providedHost: string = HOST, params = {}): Observable<Person> {
    return this._http.post<Person>(`${providedHost}${url}`, body, params)
      .pipe(
        catchError(e => of(e))
      );
  }

  deletePerson(url: string = URL, person: Person, providedHost: string = HOST): Observable<Person> {
    const id = person.id;
    return this._http.delete<Person>(`${providedHost}${url}/${id}`, {}).pipe(
      retry(3),
      catchError((e) => of(e))
    );
  }
}
