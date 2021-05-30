import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeetUpManagerPage } from './meet-up-manager.page';

describe('MeetUpManagerPage', () => {
  let component: MeetUpManagerPage;
  let fixture: ComponentFixture<MeetUpManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetUpManagerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeetUpManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
