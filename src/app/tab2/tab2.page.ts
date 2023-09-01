import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe,NgIf, JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { ChartsService } from '../charts.service';
import { Chart } from 'chart.js/auto';
import { Points } from '../points';
import { HistoricalData } from '../historical-data';

import { CrudService } from '../crud.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
 
  
})
export class Tab2Page {

  baseCurrencyValue: any = '';
  baseCurrencyRate: any = '';
  baseCurrencyfav: any = '';
  splitBaseCurrency: any = '';
  favouritesArray: any = [];
  isFav: boolean = false;
  existingArr: any = [];
  startdate = new Date();
  enddate= new Date();
  historicalArray:any=[];
  points: Points;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(public router: Router, private activatedRoute: ActivatedRoute, public datepipe: DatePipe, public crud: CrudService, public charts: ChartsService) {
    this.activatedRoute.params.subscribe(params => {
      this.baseCurrencyValue = params['data'];
      this.baseCurrencyRate = params['rate'];
      this.baseCurrencyfav = params['fav'];
//console.log(JSON.stringify(this.baseCurrencyValue));
      
     // this.splitBaseCurrency = this.baseCurrencyValue[0];

      console.log(this.splitBaseCurrency[0], this.splitBaseCurrency[1]);
    });
  }

  doFav(curr : any) {
  
    this.baseCurrencyfav = true;
    this.existingArr = (localStorage.getItem("favouritesArray"));
    if (this.existingArr != null) {
      this.favouritesArray.push(this.existingArr.concat(','+curr));
      localStorage.setItem("favouritesArray", this.favouritesArray);
      this.favouritesArray=[];
    }
    else {
      this.favouritesArray.push(curr);
      localStorage.setItem("favouritesArray", this.favouritesArray);
      this.favouritesArray=[];
    }
    console.log(localStorage.getItem("favouritesArray"));

    
  }

  removeFav(curr :any) {
    this.baseCurrencyfav = false;
   let storage= localStorage.getItem("favouritesArray")
   if (storage != null) {
   const arrayElements = storage.split(',');
    arrayElements.forEach((element,index)=>{
      if(element==curr) delete arrayElements[index];
   });
   
   var filarr = arrayElements.filter(item => item);
   let newString = filarr.map(e => e.replace(/\s/g, '')).join(",")
   console.log(newString);
   //var filarr = newString.filter(item => item);
   localStorage.setItem("favouritesArray", newString);
   console.log(localStorage.getItem("favouritesArray"));
  }
  }

  public getHistoricalData(event: any,range: any,currency : any): void {
    //alert();
    let start_date = this.datepipe.transform(range.value.start,'yyyy-MM-dd');
    let end_date = this.datepipe.transform(range.value.end,'yyyy-MM-dd');
    this.crud.getByDate(start_date,end_date,currency).subscribe((data : any) => {
  
      
    //  console.log(data);
     //data.map(a => { return { data: a.effectiveDate, rate: a.mid } } );

  let dataset=data.rates.map((obj: any) => {
      return {
        'date':obj.effectiveDate,
        'rate':obj.mid
      }
    });

   // console.log('rate',rateData);
    this.charts.generateChart({
      canvas: this.canvas,
      dataset,
      currency: currency,
      base:currency,
    });

    //console.log('rate',rateData);

     
    //  this.historicalArray = Object.entries(data.rates);
    })
  }

}
