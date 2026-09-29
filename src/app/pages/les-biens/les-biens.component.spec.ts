import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesBiensComponent } from './les-biens.component';

describe('LesBiensComponent', () => {
  let component: LesBiensComponent;
  let fixture: ComponentFixture<LesBiensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LesBiensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LesBiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
