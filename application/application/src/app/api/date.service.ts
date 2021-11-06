import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
   // return the date from a message in the hh:mm format, like 15:30
   returnTimeString(obj: any) {
    let dateObj;
    // on message its the column created, on meetup its time
    if (obj.created != undefined) {
      dateObj = new Date(obj.created);
    } else {
      dateObj = new Date(obj.time);
    }
    let string;
    string = dateObj.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    return string;
  }

  // return date without time, like 15.03.2021
  returnDateWithoutTime(obj: any) {
    let dateObj;
    // on message its the column created, on meetup its time
    if (obj.created != undefined) {
      dateObj = new Date(obj.created);
    } else {
      dateObj = new Date(obj.time);
    }


    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    let dayString;
    let monthString;

    if (day < 10) {
      dayString = "0" + day;
    } else {
      dayString = day;
    }

    if (month < 10) {
      monthString = "0" + month;
    } else {
      monthString = month;
    }

    return dayString + "." + monthString + "." + year;
  }
}
