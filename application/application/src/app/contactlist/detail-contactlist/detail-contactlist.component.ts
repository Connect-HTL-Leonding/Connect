import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../../model/room'

@Component({
  selector: 'app-detail-contactlist',
  templateUrl: './detail-contactlist.component.html',
  styleUrls: ['./detail-contactlist.component.scss'],
})
export class DetailContactlistComponent implements OnInit {

  @Input() room: Room;

  constructor() { }

  ngOnInit() {}

}
