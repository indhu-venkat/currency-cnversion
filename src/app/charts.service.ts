import { Injectable, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HistoricalData } from './historical-data';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  private history: Chart;

  constructor() {}

  generateChart({
    canvas,
    dataset,
    currency,
    base,
  }: {
    canvas: ElementRef<HTMLCanvasElement>;
    dataset: HistoricalData[];
    currency: string;
    base: string;
  }): Chart {
    if (this.history) {
      this.history.destroy();
    }
    return (this.history = new Chart(canvas.nativeElement, {
      type: 'line',
      data: {
        labels: dataset.map((item) => item.date),
        datasets: [
          {
            label: `1 ${base}`,
            data: dataset.map((item) => item.rate),
            backgroundColor: 'rgba(40, 175, 176, 0.2)',
            borderColor: 'rgba(40, 175, 176, 1)',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
          },
        ],
      },
     
    }));
  }
}
