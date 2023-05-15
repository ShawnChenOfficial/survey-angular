import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyRemoveModalComponent } from './survey-remove-modal.component';

describe('SurveyRemoveModalComponent', () => {
  let component: SurveyRemoveModalComponent;
  let fixture: ComponentFixture<SurveyRemoveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyRemoveModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyRemoveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
