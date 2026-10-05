import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBiensComponent } from './all-biens.component';

describe('AllBiensComponent', () => {
  let component: AllBiensComponent;
  let fixture: ComponentFixture<AllBiensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllBiensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
