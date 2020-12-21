import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../model/user'

@Component({
  selector: 'app-detail-contactlist',
  templateUrl: './detail-contactlist.component.html',
  styleUrls: ['./detail-contactlist.component.scss'],
})
export class DetailContactlistComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {}

}
