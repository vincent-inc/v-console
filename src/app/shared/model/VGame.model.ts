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
