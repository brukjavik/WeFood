import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPratoPage } from './add-prato.page';

describe('AddPratoPage', () => {
  let component: AddPratoPage;
  let fixture: ComponentFixture<AddPratoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPratoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPratoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
