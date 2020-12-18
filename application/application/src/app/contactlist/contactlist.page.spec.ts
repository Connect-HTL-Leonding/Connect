import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactlistPage } from './contactlist.page';

describe('ContactlistPage', () => {
  let component: ContactlistPage;
  let fixture: ComponentFixture<ContactlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
