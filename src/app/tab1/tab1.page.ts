import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  exchangeRateArray: any = [];
  secArray: any = [];
  baseCurrency = new FormControl('');
  baseCurrencyValue = '';
  options: string[] = [
    'AED',
    'AFN',
    'ALL',
    'AMD',
    'ANG',
    'AOA',
    'ARS',
    'AUD',
    'AWG',
    'AZN',
    'BAM',
    'BBD',
    'BDT',
    'BGN',
    'BHD',
    'BIF',
    'BMD',
    'BND',
    'BOB',
    'BRL',
    'BSD',
    'BTN',
    'BWP',
    'BYN',
    'BZD',
    'CAD',
    'CDF',
    'CHF',
    'CLP',
    'CNY',
    'COP',
    'CRC',
    'CUP',
    'CVE',
    'CZK',
    'DJF',
    'DKK',
    'DOP',
    'DZD',
    'EGP',
    'ERN',
    'ETB',
    'EUR',
    'FJD',
    'FKP',
    'FOK',
    'GBP',
    'GEL',
    'GGP',
    'GHS',
    'GIP',
    'GMD',
    'GNF',
    'GTQ',
    'GYD',
    'HKD',
    'HNL',
    'HRK',
    'HTG',
    'HUF',
    'IDR',
    'ILS',
    'IMP',
    'INR',
    'IQD',
    'IRR',
    'ISK',
    'JEP',
    'JMD',
    'JOD',
    'JPY',
    'KES',
    'KGS',
    'KHR',
    'KID',
    'KMF',
    'KRW',
    'KWD',
    'KYD',
    'KZT',
    'LAK',
    'LBP',
    'LKR',
    'LRD',
    'LSL',
    'LYD',
    'MAD',
    'MDL',
    'MGA',
    'MKD',
    'MMK',
    'MNT',
    'MOP',
    'MRU',
    'MUR',
    'MVR',
    'MWK',
    'MXN',
    'MYR',
    'MZN',
    'NAD',
    'NGN',
    'NIO',
    'NOK',
    'NPR',
    'NZD',
    'OMR',
    'PAB',
    'PEN',
    'PGK',
    'PHP',
    'PKR',
    'PLN',
    'PYG',
    'QAR',
    'RON',
    'RSD',
    'RUB',
    'RWF',
    'SAR',
    'SBD',
    'SCR',
    'SDG',
    'SEK',
    'SGD',
    'SHP',
    'SLE',
    'SOS',
    'SRD',
    'SSP',
    'STN',
    'SYP',
    'SZL',
    'THB',
    'TJS',
    'TMT',
    'TND',
    'TOP',
    'TRY',
    'TTD',
    'TVD',
    'TWD',
    'TZS',
    'UAH',
    'UGX',
    'USD',
    'UYU',
    'UZS',
    'VES',
    'VND',
    'VUV',
    'WST',
    'XAF',
    'XCD',
    'XDR',
    'XOF',
    'XPF',
    'YER',
    'ZAR',
    'ZMW',
    'ZWL'

  ];
  filteredOptions: Observable<string[]> | undefined;

  constructor(public crud: CrudService, public router:Router) { }
  ngOnInit() {
    this.baseCurrencyValue = '';
    this.exchangeRateArray = [];
    this.filteredOptions = this.baseCurrency.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): string[] {
    this.exchangeRateArray = [];
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getBaseCurrency(value: any) {
    this.baseCurrencyValue = value;
    this.crud.getByID(this.baseCurrencyValue).subscribe((data: any) => {

      var favarray=localStorage.getItem("favouritesArray");
      const favarrays = favarray.split(',');
      var rateArray = Object.entries(data.rates);
     // rateArray.sort((item1, item2) => Number(item1[1] > item2[1])); 
      for (var i = 0; i < rateArray.length; i++){
     favarrays.includes(rateArray[i][0]) ? rateArray[i].push(1) : rateArray[i].push(0);
      }   
        let tempRateArr = [];
          rateArray.forEach((device, index) => {
            tempRateArr[index] = { ...device }
                })
      tempRateArr.sort((item1, item2) => Number(item1[2] < item2[2]));
        console.log(tempRateArr); 
        this.exchangeRateArray=tempRateArr;
    
     
   

      
    
    })
  }

  goToCurrencyDetail(item: any) {
    
    this.router.navigate(['/tabs/tab2',{data:item[0],rate:item[1],fav:item[2]}]);   
  }

}
