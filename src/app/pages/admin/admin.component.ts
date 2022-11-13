import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private ref = this.firestore.collection('interviews');

  public data = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {

    this.ref.get().subscribe(res => {
      const data: any = res.docs.map(doc => doc.data());
      const sorted = data.sort((a, b) => {
        const maxA = Math.max(...a.votes.map(vote => new Date(vote.time).getTime()));
        const maxB = Math.max(...b.votes.map(vote => new Date(vote.time).getTime()));
        return maxB - maxA;
      });

      this.data = sorted;
    });


  }

}
