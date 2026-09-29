import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSuccessClientComponent } from './signup-success-client.component';

describe('SignupSuccessClientComponent', () => {
  let component: SignupSuccessClientComponent;
  let fixture: ComponentFixture<SignupSuccessClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupSuccessClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupSuccessClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
