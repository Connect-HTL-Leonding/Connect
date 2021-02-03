import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhotogalleryPage } from './photogallery.page';

describe('PhotogalleryPage', () => {
  let component: PhotogalleryPage;
  let fixture: ComponentFixture<PhotogalleryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotogalleryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotogalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
