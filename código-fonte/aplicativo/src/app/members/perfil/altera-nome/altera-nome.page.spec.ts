import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlteraNomePage } from './altera-nome.page';

describe('AlteraNomePage', () => {
  let component: AlteraNomePage;
  let fixture: ComponentFixture<AlteraNomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlteraNomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlteraNomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
