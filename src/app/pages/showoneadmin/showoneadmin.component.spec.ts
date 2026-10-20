import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowoneadminComponent } from './showoneadmin.component';

describe('ShowoneadminComponent', () => {
  let component: ShowoneadminComponent;
  let fixture: ComponentFixture<ShowoneadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowoneadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowoneadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
