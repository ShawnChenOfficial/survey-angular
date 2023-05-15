import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyItemFormModalComponent } from './survey-item-form-modal.component';

describe('SurveyItemFormModalComponent', () => {
  let component: SurveyItemFormModalComponent;
  let fixture: ComponentFixture<SurveyItemFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyItemFormModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyItemFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
