import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';
import { IVote, IData, MainService } from 'src/app/shared/services/main.service';
import { RouterErrorComponent } from '../../../../shared/errors/router-error/router-error.component';

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss']
})
export class VotingPageComponent implements OnInit, OnDestroy {

  public name: string;
  public expertName: string;
  public metric: Array<string>;
  public alternatives: Array<string>;

  public marks = [];
  private subs = [];

  constructor(
    private mainService: MainService,
    private router: Router,
    private errorService: ErrorService
  ) {
    this.subs.push(this.mainService.options$.subscribe(res => {
      if (res !== 'empty') {
        this.name = res.name;
        this.expertName = this.mainService.votingName;
        this.metric = this.mainService.metrics[res.type].values;
        this.alternatives = res.alternatives;

        for (let i = 0; i < res.count; i++) {
          this.marks.push(2);
        }
      } else {
        this.errorService.showRouteError();

        this.router.navigate(['home']);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (!this.name) {
        this.errorService.showRouteError();
        this.router.navigate(['home']);
      }
    }, 300);
  }


  public send(): void {
    const res: IVote = {
      name: this.expertName,
      votes: this.marks,
      time: new Date().toString()
    };
    this.mainService.addVote(res);
  }

  public back(): void {
    this.router.navigate(['quiz']);
  }
}
