import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDashboard } from './doc-dashboard';

describe('DocDashboard', () => {
  let component: DocDashboard;
  let fixture: ComponentFixture<DocDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(DocDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
