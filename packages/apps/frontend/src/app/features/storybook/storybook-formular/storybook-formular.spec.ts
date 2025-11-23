import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorybookFormular } from './storybook-formular';

describe('StorybookFormular', () => {
  let component: StorybookFormular;
  let fixture: ComponentFixture<StorybookFormular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorybookFormular]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorybookFormular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
