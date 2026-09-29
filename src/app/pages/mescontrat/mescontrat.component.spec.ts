import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MescontratComponent } from './mescontrat.component';

describe('MescontratComponent', () => {
  let component: MescontratComponent;
  let fixture: ComponentFixture<MescontratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MescontratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MescontratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
