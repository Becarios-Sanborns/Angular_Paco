import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMostrarComponent } from './modal-mostrar.component';

describe('ModalMostrarComponent', () => {
  let component: ModalMostrarComponent;
  let fixture: ComponentFixture<ModalMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMostrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
