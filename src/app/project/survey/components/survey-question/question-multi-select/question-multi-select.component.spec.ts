import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMultiSelectComponent } from './question-multi-select.component';

describe('QuestionMultiSelectComponent', () => {
  let component: QuestionMultiSelectComponent;
  let fixture: ComponentFixture<QuestionMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionMultiSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
