import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesTwoComponent } from './properties-two.component';

describe('PropertiesTwoComponent', () => {
  let component: PropertiesTwoComponent;
  let fixture: ComponentFixture<PropertiesTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertiesTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
