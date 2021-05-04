import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeetupDataPage } from './meetup-data.page';

describe('MeetupDataPage', () => {
  let component: MeetupDataPage;
  let fixture: ComponentFixture<MeetupDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeetupDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
