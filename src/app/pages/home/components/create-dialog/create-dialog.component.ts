import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from 'src/app/shared/services/error.service';
import { IData, MainService } from 'src/app/shared/services/main.service';


@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements AfterViewInit, OnDestroy {

  public form: FormGroup;
  public alternativesForm: FormGroup | undefined;
  public data: IData | undefined;

  public selectedMetric = 0;
  public metrics = [];
  private subs = [];

  constructor(private mainService: MainService, public dialog: MatDialog, private errorService: ErrorService) {
    this.metrics = this.mainService.metrics;
    
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      id: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      count: new FormControl('2', [Validators.required, Validators.max(10), Validators.min(1)]),
    });

  }

  ngAfterViewInit(): void {
    document.querySelector('mat-button-toggle:first-child').dispatchEvent(new Event('click'));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public onSubmit(): void {

    this.subs.push(this.mainService.checkIfExist(this.form.value.id.trim()).subscribe(exist => {
      if (!exist) {
        this.data = {
          name: this.form.value.name.trim(),
          count: this.form.value.count,
          id: this.form.value.id.trim(),
          type: this.selectedMetric,
          alternatives: [],
          votes: []
        };

        this.alternativesForm = new FormGroup({});
        for (let i = 0; i < this.data.count; i++) {
          this.alternativesForm.addControl(`${i}`, new FormControl(`Альтернатива ${i + 1}`, Validators.required));
          this.data.alternatives.push('');
        }
      } else {
        this.errorService.showCreateError();
      }
    }));

    
  }

  public onSubmitAlternatives(): void {
    // tslint:disable: forin
    for (const i in this.alternativesForm?.value) {
      for (const j in this.alternativesForm?.value) {
        if (this.alternativesForm?.value[i] === this.alternativesForm?.value[j] && i !==j) {
          this.errorService.showAltErrors();
          return;
          
        }
      }
      
      
      this.data.alternatives[i] = this.alternativesForm?.value[i];
    }

    this.mainService.create(this.data);
    this.dialog.closeAll();
  }


  public close() {
    this.dialog.closeAll();
  }
}
