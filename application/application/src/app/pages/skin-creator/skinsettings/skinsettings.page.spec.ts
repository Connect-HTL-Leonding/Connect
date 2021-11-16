import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkinsettingsPage } from './skinsettings.page';

describe('SkinsettingsPage', () => {
  let component: SkinsettingsPage;
  let fixture: ComponentFixture<SkinsettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkinsettingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkinsettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
