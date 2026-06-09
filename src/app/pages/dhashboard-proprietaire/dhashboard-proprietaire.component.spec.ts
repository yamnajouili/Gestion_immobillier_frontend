import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhashboardProprietaireComponent } from './dhashboard-proprietaire.component';

describe('DhashboardProprietaireComponent', () => {
  let component: DhashboardProprietaireComponent;
  let fixture: ComponentFixture<DhashboardProprietaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DhashboardProprietaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DhashboardProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
