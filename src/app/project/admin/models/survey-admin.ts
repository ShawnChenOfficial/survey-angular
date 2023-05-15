import { SurveyQuery } from "../../survey/models/survey";

export class SurveySummaryQuery extends SurveyQuery {
    total: number;
    multiSelect: number;
    singleSelect: number;
    complete: number;

    constructor(json: any) {
        super(json);
        this.total = json.totalCount;
        this.multiSelect = json.multiSelectCount;
        this.singleSelect = json.singleSelectCount;
        this.complete = json.completeCount;
    }
}

export class SurveyForm {
    id?: number;
    title?: string;

    constructor(survey?: SurveyQuery) {
        if (survey) {
            this.id = survey.id;
            this.title = survey.title;
        }
    }
}

export class SurveyCommand {
    id?: number;
    title: string;

    constructor(survey: SurveyForm) {
        this.id = survey.id;
        this.title = survey.title!;
    }
}