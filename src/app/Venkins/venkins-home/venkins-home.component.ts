import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { ConfigModel } from 'src/app/shared/model/Venkins.model';
import { VenkinsService } from 'src/app/shared/service/Venkins.service';

@Component({
  selector: 'app-venkins-home',
  templateUrl: './venkins-home.component.html',
  styleUrls: ['./venkins-home.component.scss']
})
export class VenkinsHomeComponent implements OnInit {

  configModels: ConfigModel[] = [];

  constructor(
    private venkinsService: VenkinsService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.venkinsService.getConfigModels().pipe(first()).subscribe(
      res => {  
        this.configModels = res;
      }
    );
  }

}
