import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignecontratComponent } from './signecontrat.component';

describe('SignecontratComponent', () => {
  let component: SignecontratComponent;
  let fixture: ComponentFixture<SignecontratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignecontratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignecontratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
