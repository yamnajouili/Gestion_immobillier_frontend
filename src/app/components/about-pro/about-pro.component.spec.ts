import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutProComponent } from './about-pro.component';

describe('AboutProComponent', () => {
  let component: AboutProComponent;
  let fixture: ComponentFixture<AboutProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutProComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
