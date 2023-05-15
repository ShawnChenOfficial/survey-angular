export class SurveyQuery {
    id: number;
    title: string;

    constructor(json: any) {
        this.id = json.id;
        this.title = json.title;
    }
}
