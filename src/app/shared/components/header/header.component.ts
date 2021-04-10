import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private id;

  constructor(private router: Router, private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.options$.subscribe((res: any) => {
      this.id = res.id;
    });
  }

  public home(): void {
    if (this.id) {
      alert('Не забудьте зберегти ключ доступу: ' + this.id);
    }
    this.router.navigate(['home']);
  }
}
