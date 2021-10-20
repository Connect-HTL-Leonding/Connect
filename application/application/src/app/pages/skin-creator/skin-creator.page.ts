import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skin-creator',
  templateUrl: './skin-creator.page.html',
  styleUrls: ['./skin-creator.page.scss'],
})
export class SkinCreatorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  onFileChange(event){
    const photo = event.target.files[0];
    console.log(photo)
    
  }
}
