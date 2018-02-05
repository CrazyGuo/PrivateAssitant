import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SentencePage} from './sentence';

@NgModule(
{
      declarations: [SentencePage],
      imports: [IonicPageModule.forChild(SentencePage)],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SentencePageModule { }
