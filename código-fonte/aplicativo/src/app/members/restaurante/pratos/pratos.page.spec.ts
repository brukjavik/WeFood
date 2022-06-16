import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PratosPage } from './pratos.page';

describe('PratosPage', () => {
  let component: PratosPage;
  let fixture: ComponentFixture<PratosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PratosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PratosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
