import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meeting, MeetupUser } from '../model/meetup';
import { api } from '../app.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  http: HttpClient;

  public meetupPreviewObserveable = new Subject<any>();
  meetopPreviewNotify = this.meetupPreviewObserveable.asObservable();

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

  setStatusAccepted(meetingId) {
    this.http.post(api.url + "meetup/setStatusA",meetingId).subscribe(data=> {
      console.log("status set to accepted");
    })
  }

  setStatusDeclined(meetingId) {
    console.log(typeof(meetingId));
    this.http.post(api.url + "meetup/setStatusD",meetingId).subscribe(data=> {
      console.log("status set to declined");
    })
  }


}
