import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingRules } from './routing-rules';

describe('RoutingRules', () => {
  let component: RoutingRules;
  let fixture: ComponentFixture<RoutingRules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingRules],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutingRules);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
