import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhashboardUserComponent } from './dhashboard-user.component';

describe('DhashboardUserComponent', () => {
  let component: DhashboardUserComponent;
  let fixture: ComponentFixture<DhashboardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DhashboardUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DhashboardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
