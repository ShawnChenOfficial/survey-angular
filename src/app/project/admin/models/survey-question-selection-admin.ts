export class SurveyQuestionSelectionPercentageQuery {
    surveyQuestionSelectionId: number;
    percentage: number;

    constructor(json: any) {
        this.percentage = json.percentage;
        this.surveyQuestionSelectionId = json.surveyQuestionSelectionId;
    }
}