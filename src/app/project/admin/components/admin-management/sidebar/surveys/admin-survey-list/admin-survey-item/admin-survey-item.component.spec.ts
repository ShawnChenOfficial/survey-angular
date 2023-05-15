import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSurveyItemComponent } from './admin-survey-item.component';

describe('AdminSurveyItemComponent', () => {
  let component: AdminSurveyItemComponent;
  let fixture: ComponentFixture<AdminSurveyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSurveyItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSurveyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
