import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevinfosPage } from './devinfos.page';

describe('DevinfosPage', () => {
  let component: DevinfosPage;
  let fixture: ComponentFixture<DevinfosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevinfosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevinfosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
