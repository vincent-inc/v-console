import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { QuestionDialog } from 'src/app/shared/dialog/question-dialog/question-dialog.component';
import { QuestionRow } from 'src/app/shared/model/VGame.model';
import { VGameService } from 'src/app/shared/service/VGame.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questionRows: QuestionRow[] = [];

  constructor(
    private vgameService: VGameService,
    private matDialog: MatDialog
    ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.vgameService.getQuestions().pipe(first()).subscribe(
      res => {
        this.questionRows = [];
        res.forEach(e => {
          this.questionRows.push({
            id:             e.id!,
            question:       e.question!,
            category:       e.category!,
            orderBy:        e.orderBy!,
          });
        })
      }
    );
  }
  
  addNewQuestion() {
    let dialog = this.matDialog.open(QuestionDialog, {data: {questionId: 0}});

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
          this.init();
      }
    );
  }

  editQuestion(questionRow: QuestionRow) {
    let dialog = this.matDialog.open(QuestionDialog, {data: {questionId: questionRow.id}});

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
          this.init();
      }
    );
  }
}
