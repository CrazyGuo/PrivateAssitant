import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { CommonService } from '../../providers/baseService/CommonService';
import { AppURLs } from '../../providers/baseService/AppURLs';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})

export class CategoryPage 
{
  public categoryData : Array<any>;
  public categoryDetailData : Array<any>;
  public select = 0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
	      private commonService :CommonService,
              private appURLs : AppURLs) 
  {

  }

  ionViewDidLoad() 
  {
	    this.getCategoryData();
	    this.getCategoryDetailData(102);
  }

  private getCategoryDetailData(typeNumber: number) 
  {
	  this.commonService.getJsonData( this.appURLs.CategoryDetailConfigUrl ).then(result =>
           {
                   this.categoryDetailData = result.category_detail;
           },
           err =>
           {

           });
  }

  private getCategoryData() 
  {
	  this.commonService.getJsonData( this.appURLs.CategoryConfigUrl ).then(result =>
           {
                   this.categoryData = result.category;
           },
           err =>
           {

           });
  }

  categoryLeftClick=function(index: number)
  {
    console.log("index"+index);

     this.categoryData[this.select].isSelect=false;
    let data= this.categoryData[index];
    data.isSelect=true;
    this.select=index;
  };

  startPage(index: number) 
  {
    /*this.navCtrl.push(GoodListsPage, {
      item: index
    });*/
  }

  goBack()
  {
    console.log('goBack');
  }
}
