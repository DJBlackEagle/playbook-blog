import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorybookCardsCommon } from './storybook-cards-common';

describe('StorybookCardsCommon', () => {
  let component: StorybookCardsCommon;
  let fixture: ComponentFixture<StorybookCardsCommon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorybookCardsCommon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorybookCardsCommon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
