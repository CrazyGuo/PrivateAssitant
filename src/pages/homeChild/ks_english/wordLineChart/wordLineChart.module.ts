import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordLineChartPage} from './wordLineChart';

@NgModule(
{
      declarations: [WordLineChartPage],
      imports: [IonicPageModule.forChild(WordLineChartPage)],
})

export class WordLineChartPageModule { }
