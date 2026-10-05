import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllclientComponent } from './allclient.component';

describe('AllclientComponent', () => {
  let component: AllclientComponent;
  let fixture: ComponentFixture<AllclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllclientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
