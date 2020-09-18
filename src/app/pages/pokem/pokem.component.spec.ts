import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemComponent } from './pokem.component';

describe('PokemComponent', () => {
  let component: PokemComponent;
  let fixture: ComponentFixture<PokemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
