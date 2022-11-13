import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = "https://localhost:7149/api/Member";
  constructor(private httpClient: HttpClient) { }

  getMember(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.baseUrl);

  }
  getMemberByUsername(username: string): Observable<Member> {
    return this.httpClient.get<Member>(`${this.baseUrl}/${username}`);
  }
}
