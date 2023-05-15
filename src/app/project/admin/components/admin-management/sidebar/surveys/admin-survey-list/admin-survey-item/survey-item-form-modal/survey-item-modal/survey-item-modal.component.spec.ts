import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyItemModalComponent } from './survey-item-modal.component';

describe('SurveyItemModalComponent', () => {
  let component: SurveyItemModalComponent;
  let fixture: ComponentFixture<SurveyItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyItemModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
