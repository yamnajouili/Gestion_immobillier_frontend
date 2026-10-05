import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProprietaireComponent } from './all-proprietaire.component';

describe('AllProprietaireComponent', () => {
  let component: AllProprietaireComponent;
  let fixture: ComponentFixture<AllProprietaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProprietaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
