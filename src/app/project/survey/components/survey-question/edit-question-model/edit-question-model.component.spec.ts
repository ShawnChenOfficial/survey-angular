import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionModelComponent } from './edit-question-model.component';

describe('EditQuestionModelComponent', () => {
  let component: EditQuestionModelComponent;
  let fixture: ComponentFixture<EditQuestionModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuestionModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuestionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
