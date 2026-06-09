import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPropertyComponent } from './all-property.component';

describe('AllPropertyComponent', () => {
  let component: AllPropertyComponent;
  let fixture: ComponentFixture<AllPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
