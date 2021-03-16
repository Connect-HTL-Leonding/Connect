import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectedSkinsPage } from './selected-skins.page';

describe('SelectedSkinsPage', () => {
  let component: SelectedSkinsPage;
  let fixture: ComponentFixture<SelectedSkinsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedSkinsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedSkinsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
