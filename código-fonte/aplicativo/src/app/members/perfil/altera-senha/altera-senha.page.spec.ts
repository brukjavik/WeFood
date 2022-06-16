import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlteraSenhaPage } from './altera-senha.page';

describe('AlteraSenhaPage', () => {
  let component: AlteraSenhaPage;
  let fixture: ComponentFixture<AlteraSenhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlteraSenhaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlteraSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
