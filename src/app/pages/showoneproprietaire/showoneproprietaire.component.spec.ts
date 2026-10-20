import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowoneproprietaireComponent } from './showoneproprietaire.component';

describe('ShowoneproprietaireComponent', () => {
  let component: ShowoneproprietaireComponent;
  let fixture: ComponentFixture<ShowoneproprietaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowoneproprietaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowoneproprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
