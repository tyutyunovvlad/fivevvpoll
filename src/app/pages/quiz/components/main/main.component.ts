import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';
import { IVote, MainService } from 'src/app/shared/services/main.service';
import { NewExpertComponent } from '../new-expert/new-expert.component';

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
  public extended = false;

  public times = [];
  private subs = [];

  public bars = [];

  public mainResults = [
   
  ];

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
          this.generateMain();
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
    this.dialog.open(NewExpertComponent, {scrollStrategy: new NoopScrollStrategy()});
  }

  public getNumberOfMarks(marks, i) {
    return marks.filter(mark => mark === i).length;
  }

  public copy(text) {
    navigator.clipboard.writeText(text);

    this.errorService.showCopied();
  }

  public extend() {
    this.extended = !this.extended;
  }

  public generateMain() {

    let arr = [];
    let max = 0;
    let min = 0;

    this.bars.forEach((v, i) => {
      if (this.bars[i]) {

        let mark = (this.getNumberOfMarks(this.bars[i].marks, 0) * (this.markType === 'centered' ? -2 : 1)) +
          (this.getNumberOfMarks(this.bars[i].marks, 1) * (this.markType === 'centered' ? -1 : 2)) +
          (this.getNumberOfMarks(this.bars[i].marks, 2) * (this.markType === 'centered' ? 0 : 3)) +
          (this.getNumberOfMarks(this.bars[i].marks, 3) * (this.markType === 'centered' ? 1 : 4)) +
          (this.getNumberOfMarks(this.bars[i].marks, 4) * (this.markType === 'centered' ? 2 : 5));

        if (mark > max) {
          max = mark;
        }
        if (mark < min) {
          min = mark;
        }
        arr.push({mark});
      }
    });

    arr.forEach((v, i) => {
      if (arr[i].mark > 0) {
        arr[i].per = v.mark * 100 / max;
      } else if (arr[i].mark < 0) {
        arr[i].per = v.mark * 100 / min;
      }

      if (arr[i].mark === 0) {
        arr[i].color = 2;
      } else if (arr[i].mark === max) {
        arr[i].color = 4;
      } else if (arr[i].mark === min) {
        arr[i].color = 0;
      } else if (arr[i].mark > 0) {
        arr[i].color = 3;
      } else if (arr[i].mark < 0) {
        arr[i].color = 1;
      }
    });

    console.log(arr);
    

    this.mainResults = arr;
    


  }

}
