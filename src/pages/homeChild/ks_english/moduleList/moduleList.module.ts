import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModuleListPage} from './moduleList';

@NgModule(
{
      declarations: [ModuleListPage],
      imports: [IonicPageModule.forChild(ModuleListPage)],
})

export class ModuleListPageModule { }
