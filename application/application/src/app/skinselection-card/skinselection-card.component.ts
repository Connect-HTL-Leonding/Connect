import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skinselection-card',
  templateUrl: './skinselection-card.component.html',
  styleUrls: ['./skinselection-card.component.scss'],
})
export class SkinselectionCardComponent implements OnInit {
@Input() item :string;

  constructor() { }

  ngOnInit() {}

}
