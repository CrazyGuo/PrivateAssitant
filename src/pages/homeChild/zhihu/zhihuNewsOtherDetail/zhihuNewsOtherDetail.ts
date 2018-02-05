import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { ZhihuNewsDetailPage } from '../zhihuNewsDetail/zhihuNewsDetail';
import { CommonService } from '../../../../providers/baseService/CommonService';
import { AppURLs } from "../../../../providers/baseService/AppURLs";


@Component(
{
    templateUrl: 'zhihuNewsOtherDetail.html'
})

export class ZhihuNewsOtherDetailPage
{
  selectedItem: any;

  constructor(private navCtrl: NavController, navParams: NavParams,
              private service : CommonService, private appURLs : AppURLs)
  {
          // If we navigated to this page, we will have an item available as a nav param
          this.selectedItem = navParams.get('item');
          this.loadData();
  }

  loadData()
  {
            let contentUrl = this.appURLs.ZhihuOtherListUrl +  this.selectedItem.id ;
            this.service.getJsonData(contentUrl).then(result =>
            {
                 this.selectedItem.stories = result.stories;
                 this.selectedItem.background = result.background.replace(/http[s]*:\/\/pic[1-4]{1}/g,'//images.weserv.nl/?url=pic3').replace(/http[s]*:\/\/p[1-4]{1}/g,'//images.weserv.nl/?url=p3');
            },
            err =>
            {

            });
  }

  storyShow(id)
  {
      this.navCtrl.push(ZhihuNewsDetailPage,
      {
         id: id
      });
  }
}
