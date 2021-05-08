import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meeting, MeetupUser } from '../model/meetup';
import { api } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  createMeetup(m: Meeting) {
    return this.http.post(api.url + 'meetup/create/', m);
  }

  setOtherUser(dataForPost) {
    return this.http.post(api.url + 'meetup/setOtherUser/', dataForPost);
  }

  getMeetups() {
    return this.http.get<Meeting[]>(api.url + 'meetup/getMeetups/');
  }

  getMeetupsWithMe(id) {
    return this.http.post<Meeting[]>(api.url + 'meetup/getMeetupsWithMe/',id);
  }

  getMeetupUser(id) {
    return this.http.get<MeetupUser[]>(api.url + 'meetup/getMeetupUser/' + id);
  }


}
