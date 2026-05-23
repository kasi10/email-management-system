import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQueries } from './admin-queries';

describe('AdminQueries', () => {
  let component: AdminQueries;
  let fixture: ComponentFixture<AdminQueries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQueries],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminQueries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
