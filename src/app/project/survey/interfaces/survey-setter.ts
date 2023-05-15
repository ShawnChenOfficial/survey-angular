import { SurveyQuestionForm } from "../models/survey-question";
import { SurveyResumedQuery } from "../models/survey-resume";

export interface SurveySetter {
    set(surveyId: number, surveyQuestions: Array<SurveyQuestionForm>, surveyResultId?: number): void;
    setByResume(resumeQuery: SurveyResumedQuery): void;
}