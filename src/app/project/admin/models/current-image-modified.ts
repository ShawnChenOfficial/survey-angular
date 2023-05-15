import { CurrentImagePathModifyHistory } from "./survey-question-admin";

export abstract class CurrentImageModified {
    imagePath?: string;
    currentImageModifyHistory: Array<CurrentImagePathModifyHistory>;

    constructor(imagePath?: string) {
        this.imagePath = imagePath;
        this.currentImageModifyHistory = new Array<CurrentImagePathModifyHistory>();
    }

    imageModified(path: string) {
        this.currentImageModifyHistory.push(
            new CurrentImagePathModifyHistory(
                this.currentImageModifyHistory.length,
                path
            )
        );
    }
}