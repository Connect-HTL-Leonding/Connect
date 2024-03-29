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
  public meetupObservable = new Subject<any>();
  MeetupUpdateNotify = this.meetupObservable.asObservable();

  public createMeetupObservable = new Subject<any>();
  createMeetupUpdateNotify = this.createMeetupObservable.asObservable();

  public positionObservable = new Subject<any>();
  positionNotify = this.positionObservable.asObservable();

  public showPositionObservable = new Subject<any>();
  showPositionNotify = this.showPositionObservable.asObservable();

  public showMeetupObservable = new Subject<any>();
  showMeetupUpdateNotify = this.showMeetupObservable.asObservable();

  public meetupPreviewObserveable = new Subject<any>();
  meetupPreviewNotify = this.meetupPreviewObserveable.asObservable();

  public meetupPreviewBackObserveable = new Subject<any>();
  meetupPreviewBackNotify = this.meetupPreviewBackObserveable.asObservable();

  constructor(http: HttpClient) {
    this.http = http;
  }

  createMeetup(m: Meeting) {
    return this.http.post<Meeting>(api.url + 'meetup/create/', m);
  }

  setOtherUser(dataForPost) {
    return this.http.post(api.url + 'meetup/setOtherUser/', dataForPost);
  }

  getMeetups() {
    return this.http.get<Meeting[]>(api.url + 'meetup/getMeetups/');
  }

  getMeetupById(id) {
    return this.http.get<Meeting>(api.url + 'meetup/getMeetupById/' + id);
  }

  getMeetupsWithMe(id) {
    return this.http.post<Meeting[]>(api.url + 'meetup/getMeetupsWithMe/',id);
  }

  getMeetupsFromMe() {
    return this.http.get<Meeting[]>(api.url + 'meetup/getMeetupsFromMe/');
  }

  getMeetupsFromMeA(id) {
    return this.http.post<Meeting[]>(api.url + 'meetup/getMeetupsFromMeA/',id);
  }

  getMeetupsFromMeD(id) {
    return this.http.post<Meeting[]>(api.url + 'meetup/getMeetupsFromMeD/',id);
  }

  getMeetupUser(id) {
    return this.http.get<MeetupUser[]>(api.url + 'meetup/getMeetupUser/' + id);
  }

  setStatusAccepted(meetingId) {
    return this.http.post(api.url + "meetup/setStatusA",meetingId);
  }

  setStatusDeclined(meetingId) {
   return this.http.post(api.url + "meetup/setStatusD",meetingId);
  }

  setSeen(meeting, otherUserId) {
    let dataForPost = {
      meeting: meeting,
      user_id: otherUserId,
    }
    return this.http.post(api.url + "meetup/setSeen",dataForPost);
  }

  removeUserFromMeetup(room) {
    return this.http.post(api.url + "meetup/deleteUserFromMeetup", room);
  }

  endMeetup(room) {
    return this.http.post(api.url + "meetup/endMeetup", room);
  }

  getCreatorOfMeetup(id) {
    return this.http.post(api.url + "meetup/getCreator",id);
  }


}
