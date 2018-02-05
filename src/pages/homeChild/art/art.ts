import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { CommonService } from '../../../providers/baseService/CommonService';
import { AppURLs } from "../../../providers/baseService/AppURLs";

@IonicPage()
@Component(
{
    templateUrl: 'art.html'
})

export class ArtPage
{
  ts;
	tt;
  index;

  constructor(public navCtrl: NavController, private service : CommonService,private appURLs : AppURLs)
  {
      this.ts = [];
      this.tt = {};
      this.index = true;
      this.getRes();
  }

  getRes()
  {
      var url = this.appURLs.ArtListUrl;
      this.service.getJsonData(url).then(result =>
      {
               if(result.error == false)
               {
                     this.ts = result.results;
               }
      },
      err =>
      {

      });
  }

  //载入完页面时触发请求
  onPageDidEnter()
  {
      if(this.index == true)
      {
          this.getRes();
          this.index = false;
      }
  }

  // 下拉刷新
  doRefresh(refresher)
  {
      this.getRes();
      setTimeout(() => { refresher.complete(); }, 3000 );
  }
}
