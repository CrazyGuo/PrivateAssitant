import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZhihuCategoryPage} from './zhihuCategory';

@NgModule(
{
      declarations: [ZhihuCategoryPage],
      imports: [IonicPageModule.forChild(ZhihuCategoryPage)],
})

export class ZhihuCategoryPageModule { }
