import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorybookCardsStat } from './storybook-cards-stat';

describe('StorybookCardsStat', () => {
  let component: StorybookCardsStat;
  let fixture: ComponentFixture<StorybookCardsStat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorybookCardsStat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorybookCardsStat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
