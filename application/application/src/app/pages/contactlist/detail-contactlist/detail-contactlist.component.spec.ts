import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailContactlistComponent } from './detail-contactlist.component';

describe('DetailContactlistComponent', () => {
  let component: DetailContactlistComponent;
  let fixture: ComponentFixture<DetailContactlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailContactlistComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailContactlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
