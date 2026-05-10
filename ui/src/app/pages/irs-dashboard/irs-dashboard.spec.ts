import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrsDashboard } from './irs-dashboard';

describe('IrsDashboard', () => {
  let component: IrsDashboard;
  let fixture: ComponentFixture<IrsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IrsDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(IrsDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
