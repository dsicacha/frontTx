import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTxComponent } from './lista-tx.component';

describe('ListaTxComponent', () => {
  let component: ListaTxComponent;
  let fixture: ComponentFixture<ListaTxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
