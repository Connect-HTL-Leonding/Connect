import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GhostmodePage } from './ghostmode.page';

describe('GhostmodePage', () => {
  let component: GhostmodePage;
  let fixture: ComponentFixture<GhostmodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhostmodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GhostmodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
