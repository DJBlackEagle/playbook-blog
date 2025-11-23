import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorybookTimeline } from './storybook-timeline';

describe('StorybookTimeline', () => {
  let component: StorybookTimeline;
  let fixture: ComponentFixture<StorybookTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorybookTimeline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorybookTimeline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
