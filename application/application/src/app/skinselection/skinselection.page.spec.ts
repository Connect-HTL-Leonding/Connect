import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkinselectionPage } from './skinselection.page';

describe('SkinselectionPage', () => {
  let component: SkinselectionPage;
  let fixture: ComponentFixture<SkinselectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkinselectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkinselectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
