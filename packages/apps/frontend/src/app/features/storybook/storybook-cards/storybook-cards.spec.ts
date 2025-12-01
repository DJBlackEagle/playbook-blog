import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorybookCards } from './storybook-cards';

describe('StorybookCards', () => {
  let component: StorybookCards;
  let fixture: ComponentFixture<StorybookCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorybookCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorybookCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
