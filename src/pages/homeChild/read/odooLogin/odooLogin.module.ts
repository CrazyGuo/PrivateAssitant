import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OdooLoginPage} from './odooLogin';

@NgModule(
{
      declarations: [OdooLoginPage],
      imports: [IonicPageModule.forChild(OdooLoginPage)],
})

export class OdooLoginPageModule { }
