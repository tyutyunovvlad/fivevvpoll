import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';
import { IVote, MainService } from 'src/app/shared/services/main.service';
import { NewExpertComponent } from '../new-expert/new-expert.component';
import { RouterErrorComponent } from '../../../../shared/errors/router-error/router-error.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public name: string;
  public votes: Array<IVote>;
  public alternatives: Array<string>;
  public markType: string;
  public code: string;

  public times = [];
  private subs = [];

  public bars = [];

  constructor(
    private dialog: MatDialog,
    private mainService: MainService,
    private errorService: ErrorService,
    private router: Router,
  ) {

    let id = localStorage.getItem('id');

    if (!id) {
      this.errorService.showRouteError();
      this.router.navigate(['home']);
    }

    this.subs.push(this.mainService.options$.subscribe(res => {

      if (res !== 'empty') {
        this.name = res.name;
        this.alternatives = res.alternatives;
        this.markType = this.mainService.metrics[res.type].type;
        this.code = res.id;

        this.subs.push(this.mainService.votes$.subscribe(res => {

          this.bars = [];

          this.votes = res;
          this.times[0] = res[0]?.time;
          this.times[1] = res[res.length - 1]?.time;
          this.alternatives.forEach((alt, i) => {
            this.bars.push({ i, marks: [] });

            this.votes.forEach((vote, j) => {
              this.bars[i].marks.push(vote.votes[i]);
            });
            this.bars[i].marks.sort();

          });
        }));

      } else {
        this.errorService.showRouteError();
        this.router.navigate(['home']);
      }
    }));

  }

  ngOnInit(): void {

    // setTimeout(() => {
    //   if (!this.name) {
    //     this.errorService.showRouteError();
    //     this.router.navigate(['home']);
    //   }
    // }, 300);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public newExpert(): void {
    this.dialog.open(NewExpertComponent);
  }

  public getNumberOfMarks(marks, i) {
    return marks.filter(mark => mark === i).length;
  }

  public copy(text) {
    navigator.clipboard.writeText(text);

    this.errorService.showCopied();
  }

}
