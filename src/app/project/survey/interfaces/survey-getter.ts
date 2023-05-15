import { SurveyQuestionForm } from "../models/survey-question";

export interface SurveyGetter {
    get getSurveyId(): number;
    get getSurveyResultId(): number | undefined;
    get totalCount(): number;
    get currentIndex(): number;
    get firstOrDefault(): SurveyQuestionForm | undefined;
    get lastAnswered(): SurveyQuestionForm | undefined;
    get next(): SurveyQuestionForm | undefined;
    get previous(): SurveyQuestionForm | undefined;
    get hasNext(): boolean;
    get hasPrevious(): boolean;
    get all(): Array<SurveyQuestionForm>;
}