import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Storybook } from './storybook';

describe('Storybook', () => {
  let component: Storybook;
  let fixture: ComponentFixture<Storybook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Storybook],
    }).compileComponents();

    fixture = TestBed.createComponent(Storybook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
