import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeetupoverviewPage } from './meetupoverview.page';

describe('MeetupoverviewPage', () => {
  let component: MeetupoverviewPage;
  let fixture: ComponentFixture<MeetupoverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupoverviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeetupoverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
