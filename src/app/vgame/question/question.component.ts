import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
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
    
  }
}
