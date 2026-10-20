import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowonecontratadminComponent } from './showonecontratadmin.component';

describe('ShowonecontratadminComponent', () => {
  let component: ShowonecontratadminComponent;
  let fixture: ComponentFixture<ShowonecontratadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowonecontratadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowonecontratadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
