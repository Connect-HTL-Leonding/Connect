import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeetupPage } from './meetup.page';

describe('MeetupPage', () => {
  let component: MeetupPage;
  let fixture: ComponentFixture<MeetupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
