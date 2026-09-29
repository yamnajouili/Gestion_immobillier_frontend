import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFullComponent } from './navbar-full.component';

describe('NavbarFullComponent', () => {
  let component: NavbarFullComponent;
  let fixture: ComponentFixture<NavbarFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarFullComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
