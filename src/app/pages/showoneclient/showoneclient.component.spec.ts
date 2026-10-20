import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowoneclientComponent } from './showoneclient.component';

describe('ShowoneclientComponent', () => {
  let component: ShowoneclientComponent;
  let fixture: ComponentFixture<ShowoneclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowoneclientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowoneclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
