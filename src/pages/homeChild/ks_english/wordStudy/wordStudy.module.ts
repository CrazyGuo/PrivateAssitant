import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordStudyPage} from './wordStudy';

@NgModule(
{
      declarations: [WordStudyPage],
      imports: [IonicPageModule.forChild(WordStudyPage)],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class WordStudyPageModule { }
