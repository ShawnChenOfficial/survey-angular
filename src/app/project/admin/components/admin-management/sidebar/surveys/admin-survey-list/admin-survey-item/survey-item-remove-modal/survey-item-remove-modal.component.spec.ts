import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyItemRemoveModalComponent } from './survey-item-remove-modal.component';

describe('SurveyQuestionRemoveModalComponent', () => {
  let component: SurveyItemRemoveModalComponent;
  let fixture: ComponentFixture<SurveyItemRemoveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyItemRemoveModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyItemRemoveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
