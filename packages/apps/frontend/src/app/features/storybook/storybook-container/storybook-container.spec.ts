import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorybookContact } from './storybook-contact';

describe('StorybookContact', () => {
  let component: StorybookContact;
  let fixture: ComponentFixture<StorybookContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorybookContact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorybookContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
