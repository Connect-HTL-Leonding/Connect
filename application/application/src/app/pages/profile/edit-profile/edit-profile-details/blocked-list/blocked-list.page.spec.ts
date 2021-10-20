import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlockedListPage } from './blocked-list.page';

describe('BlockedListPage', () => {
  let component: BlockedListPage;
  let fixture: ComponentFixture<BlockedListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockedListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
