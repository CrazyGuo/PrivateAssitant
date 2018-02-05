import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordPieChartPage} from './wordPieChart';

@NgModule(
{
      declarations: [WordPieChartPage],
      imports: [IonicPageModule.forChild(WordPieChartPage)],
})

export class WordPieChartPageModule { }
