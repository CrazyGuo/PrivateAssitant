import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordIteratePage} from './wordIterate';

@NgModule(
{
      declarations: [ WordIteratePage ],
      imports: [ IonicPageModule.forChild(WordIteratePage) ],
      entryComponents:	[ WordIteratePage ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class WordIteratePageModule { }
