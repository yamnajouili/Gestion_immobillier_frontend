import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietairefavorisComponent } from './proprietairefavoris.component';

describe('ProprietairefavorisComponent', () => {
  let component: ProprietairefavorisComponent;
  let fixture: ComponentFixture<ProprietairefavorisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProprietairefavorisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProprietairefavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
