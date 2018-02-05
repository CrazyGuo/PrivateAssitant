import { Component,NgModule } from '@angular/core';
import { IonicPage,IonicModule,NavController } from 'ionic-angular';
import { ICategory } from '../../model/category';
import { CommonService } from '../../providers/baseService/CommonService';
import { AppURLs } from '../../providers/baseService/AppURLs';


@IonicPage()

@Component(
{
      selector: 'page-home',
      templateUrl: 'home.html'
})

export class HomePage
{
      categories: ICategory[];
      rows: any;

      constructor(public navCtrl: NavController,private commonService :CommonService, private appURLs : AppURLs)
      {

      }

       ionViewDidLoad()
       {
              this.commonService.getJsonData( this.appURLs.HomeConfigUrl ).then(result =>
              {
                   this.categories = result.results;
                   this.rows = Array.from(Array(Math.ceil(result.results.length / 3)).keys());
              },
              err =>
              {

              });
       }

       pushPages(pageName : string)
       {
            this.navCtrl.push(pageName);
       }
}
