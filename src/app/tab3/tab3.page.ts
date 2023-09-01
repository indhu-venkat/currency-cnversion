import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  favArray:any = [];
  constructor() {
    this.favArray = localStorage.getItem("favouritesArray");
    console.log(this.favArray )
  }

}
