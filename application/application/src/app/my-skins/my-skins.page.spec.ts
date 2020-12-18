import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MySkinsPage } from './my-skins.page';

describe('MySkinsPage', () => {
  let component: MySkinsPage;
  let fixture: ComponentFixture<MySkinsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySkinsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MySkinsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
