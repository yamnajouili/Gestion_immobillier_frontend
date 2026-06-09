import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDetailTwoComponent } from './property-detail-two.component';

describe('PropertyDetailTwoComponent', () => {
  let component: PropertyDetailTwoComponent;
  let fixture: ComponentFixture<PropertyDetailTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyDetailTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyDetailTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
