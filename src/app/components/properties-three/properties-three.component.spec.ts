import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesThreeComponent } from './properties-three.component';

describe('PropertiesThreeComponent', () => {
  let component: PropertiesThreeComponent;
  let fixture: ComponentFixture<PropertiesThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesThreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertiesThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
