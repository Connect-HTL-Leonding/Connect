import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeetupOverviewPage } from './meetup-overview.page';

describe('MeetupOverviewPage', () => {
  let component: MeetupOverviewPage;
  let fixture: ComponentFixture<MeetupOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupOverviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeetupOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
