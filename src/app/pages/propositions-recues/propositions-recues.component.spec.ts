import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionsRecuesComponent } from './propositions-recues.component';

describe('PropositionsRecuesComponent', () => {
  let component: PropositionsRecuesComponent;
  let fixture: ComponentFixture<PropositionsRecuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropositionsRecuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropositionsRecuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
