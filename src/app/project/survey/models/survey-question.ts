import { generateGuid } from "src/app/app.component";
import { CurrentImageModified } from "../../admin/models/current-image-modified";
import { CurrentImagePathModifyHistory } from "../../admin/models/survey-question-admin";

export class SurveyQuestionQuery {
    id: number;
    surveyId: number;
    question: string;
    questionImagePath: string;
    answerType: AnswerType;
    selectOptions: Array<SelectionOptionQuery>;

    constructor(json: any) {
        this.id = json.id;
        this.surveyId = json.surveyId;
        this.question = json.question;
        this.questionImagePath = json.questionImagePath;
        this.answerType = json.answerType;
        this.selectOptions = (json.selectOptions as Array<any>).map(m => new SelectionOptionQuery(m));
    }
}

/* this is the used when user answer a question */
export class SurveyQuestionForm {
    id: number;
    question: string;
    questionImagePath?: string;
    answerType: AnswerType;
    selectOptions: Array<SelectionOptionQuery>;

    constructor(query: SurveyQuestionQuery) {
        this.id = query.id;
        this.question = query.question;
        this.questionImagePath = query.questionImagePath;
        this.answerType = query.answerType;
        this.selectOptions = query.selectOptions;
    }
}

export enum AnswerType {
    ImageSelection = 'ImageSelection',
    StringSelection = 'StringSelection',
    ImageMultiSelection = 'ImageMultiSelection',
    StringMultiSelection = 'StringMultiSelection'
}

export class SelectionOptionQuery {
    id: number;
    selection: string;
    content?: string;
    imagePath?: string;
    selected = false;

    constructor(json: any) {
        this.id = json.id;
        this.selection = json.selection;
        this.content = json.content;
        this.imagePath = json.imagePath;
        this.selected = json.selected != null ? json.selected : false;
    }
}

export class SelectionOptionForm extends CurrentImageModified {
    selection?: string;
    content?: string;
    temId: string;

    constructor(query?: SelectionOptionQuery) {
        super(query?.imagePath);
        this.temId = generateGuid();
        if (query) {
            this.selection = query.selection;
            this.content = query.content;
            if (this.imagePath) {
                this.currentImageModifyHistory.push(new CurrentImagePathModifyHistory(0, this.imagePath));
            }
        }
    }

    clone() {
        const form = new SelectionOptionForm();
        form.selection = this.selection;
        form.content = this.content;
        form.temId = this.temId;
        form.imagePath = this.imagePath;
        form.currentImageModifyHistory = this.currentImageModifyHistory;

        return form;
    }
}

export class SelectionOptionCommand extends CurrentImageModified {
    selection: string;
    content?: string;

    constructor(form: SelectionOptionForm) {
        super();
        this.selection = form.selection!;
        this.content = form.content!;
        this.imagePath = form.imagePath;
        this.currentImageModifyHistory = form.currentImageModifyHistory;
    }
}