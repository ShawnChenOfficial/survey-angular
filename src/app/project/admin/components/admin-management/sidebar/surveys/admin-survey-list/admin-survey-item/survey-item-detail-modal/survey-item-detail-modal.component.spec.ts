import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyItemDetailModalComponent } from './survey-item-detail-modal.component';

describe('SurveyItemModalComponent', () => {
  let component: SurveyItemDetailModalComponent;
  let fixture: ComponentFixture<SurveyItemDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyItemDetailModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyItemDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
