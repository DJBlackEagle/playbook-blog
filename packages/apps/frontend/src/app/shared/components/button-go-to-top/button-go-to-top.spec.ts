import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGoToTop } from './button-go-to-top';

describe('ButtonGoToTop', () => {
  let component: ButtonGoToTop;
  let fixture: ComponentFixture<ButtonGoToTop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGoToTop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonGoToTop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
