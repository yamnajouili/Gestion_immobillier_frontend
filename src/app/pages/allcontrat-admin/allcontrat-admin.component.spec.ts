import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ALLcontratAdminComponent } from './allcontrat-admin.component';

describe('ALLcontratAdminComponent', () => {
  let component: ALLcontratAdminComponent;
  let fixture: ComponentFixture<ALLcontratAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ALLcontratAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ALLcontratAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
