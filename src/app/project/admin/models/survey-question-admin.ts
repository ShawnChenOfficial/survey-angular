import { AnswerType, SelectionOptionCommand, SelectionOptionForm, SurveyQuestionQuery } from "../../survey/models/survey-question";
import { CurrentImageModified } from "./current-image-modified";

/*
    this is the admin create/update form
*/

export class CurrentImagePathModifyHistory {
    order: number;
    fileName?: string;

    constructor(order: number, fileName?: string) {
        this.order = order;
        this.fileName = fileName;
    }
}


export class SurveyQuestionAdminForm extends CurrentImageModified {
    id?: number;
    surveyId: number;
    question?: string;
    questionImagePath?: string;
    answerType?: AnswerType;
    selectOptions = new Array<SelectionOptionForm>();

    constructor(surveyId: number, query?: SurveyQuestionQuery) {
        super();
        this.surveyId = surveyId;
        if (query) {
            this.id = query.id;
            this.question = query.question;
            this.questionImagePath = query.questionImagePath;
            this.answerType = query.answerType;

            if (query.selectOptions) {
                this.selectOptions = query.selectOptions.map(m => new SelectionOptionForm(m));
            }
            if (this.questionImagePath) {
                this.currentImageModifyHistory.push(new CurrentImagePathModifyHistory(0, this.questionImagePath));
            }
        }
    }
}

export class SurveyQuestionAdminCommand extends CurrentImageModified {
    id?: number;
    surveyId: number;
    question: string;
    questionImagePath?: string;
    answerType: AnswerType;
    selectOptions: Array<SelectionOptionCommand>;

    constructor(form: SurveyQuestionAdminForm) {
        super();
        this.id = form.id;
        this.surveyId = form.surveyId;
        this.question = form.question!;
        this.questionImagePath = form.questionImagePath;
        this.answerType = form.answerType!;
        this.selectOptions = form.selectOptions.map(m => new SelectionOptionCommand(m));
        this.currentImageModifyHistory = form.currentImageModifyHistory;
    }
}


export class SurveyQuestionAdminImagesRollbackCommand extends CurrentImageModified {
    id?: number;
    selectOptions: Array<SelectionOptionCommand>;

    constructor(form: SurveyQuestionAdminForm) {
        super();
        this.id = form.id;
        this.selectOptions = form.selectOptions.map(m => new SelectionOptionCommand(m));
        this.currentImageModifyHistory = form.currentImageModifyHistory;
    }
}