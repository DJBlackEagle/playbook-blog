import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCommon } from './card-common';

describe('CardCommon', () => {
  let component: CardCommon;
  let fixture: ComponentFixture<CardCommon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCommon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCommon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
