import { MatRow } from "./Mat.model";

export interface Question {
    id?:             number;
    question?:       string;
    category?:       string;
    possibleAnswer?: string[];
    orderBy?:        number;
    answer?:         Answer;
}

export interface Answer {
    id?:                    number;
    correctAnswer?:         string[];
    pointPerCorrectAnswer?: number;
}

export class QuestionRow implements MatRow {
    id:             number = 0;
    question:       string = '';
    category:       string = '';
    orderBy:        number = 0;
}