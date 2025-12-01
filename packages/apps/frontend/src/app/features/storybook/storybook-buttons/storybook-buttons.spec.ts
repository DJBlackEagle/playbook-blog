import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorybookButtons } from './storybook-buttons';

describe('StorybookButtons', () => {
  let component: StorybookButtons;
  let fixture: ComponentFixture<StorybookButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorybookButtons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorybookButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
