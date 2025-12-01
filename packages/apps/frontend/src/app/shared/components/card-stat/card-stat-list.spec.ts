import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStat } from './card-stat';

describe('CardStat', () => {
  let component: CardStat;
  let fixture: ComponentFixture<CardStat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardStat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardStat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
