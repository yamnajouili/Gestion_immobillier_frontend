import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginAdminComponent } from './auth-login-admin.component';

describe('AuthLoginAdminComponent', () => {
  let component: AuthLoginAdminComponent;
  let fixture: ComponentFixture<AuthLoginAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLoginAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLoginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
