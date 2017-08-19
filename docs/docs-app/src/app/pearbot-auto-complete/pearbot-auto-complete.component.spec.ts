import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PearbotAutoCompleteComponent } from './pearbot-auto-complete.component';

describe('PearbotAutoCompleteComponent', () => {
  let component: PearbotAutoCompleteComponent;
  let fixture: ComponentFixture<PearbotAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PearbotAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PearbotAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
