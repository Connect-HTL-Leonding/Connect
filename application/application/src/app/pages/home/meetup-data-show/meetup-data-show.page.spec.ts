import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeetupDataShowPage } from './meetup-data-show.page';

describe('MeetupDataShowPage', () => {
  let component: MeetupDataShowPage;
  let fixture: ComponentFixture<MeetupDataShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupDataShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeetupDataShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
