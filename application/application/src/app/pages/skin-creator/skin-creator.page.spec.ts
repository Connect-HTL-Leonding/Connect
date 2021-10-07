import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkinCreatorPage } from './skin-creator.page';

describe('SkinCreatorPage', () => {
  let component: SkinCreatorPage;
  let fixture: ComponentFixture<SkinCreatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkinCreatorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkinCreatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
