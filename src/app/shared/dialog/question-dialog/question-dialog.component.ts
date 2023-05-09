import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VGameService } from '../../service/VGame.service';
import { Question } from '../../model/VGame.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialog implements OnInit {

  question!: Question;
  questionCopy!: Question;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {questionId: number},
    private dialogRef: MatDialogRef<QuestionDialog>,
    private vgameService: VGameService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    if(this.data.questionId) {
      this.vgameService.getQuestion(this.data.questionId).pipe(first()).subscribe(
        res => {
          this.question = res;
          this.questionCopy = structuredClone(res);
        }
      );
    }
    else {
      let question: Question = {
        id: 0,
        question:       '',
        category:       '',
        possibleAnswer: [],
        orderBy:        0,
        answer:         {
          correctAnswer:         [],
          pointPerCorrectAnswer: 10
        }
      }

      this.question = question;
      this.questionCopy = structuredClone(question);
    }
  }

}
