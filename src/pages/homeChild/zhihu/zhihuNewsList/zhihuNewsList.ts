import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ZhihuNewsDetailPage } from '../zhihuNewsDetail/zhihuNewsDetail';
import { CommonService } from '../../../../providers/baseService/CommonService';
import { AppURLs } from "../../../../providers/baseService/AppURLs";

@Component(
{
      selector: 'page-zhihuNewsList',
      templateUrl: 'zhihuNewsList.html'
})

export class ZhihuNewsListPage
{
  zhihuList: any;
  dataFinish: boolean = false;
  date: Date = new Date();

  mySlideOptions =
  {
        autoplay: 2000,
        pager: true,
        loop: true
  };

  hasErr: boolean = false;

  constructor(public navCtrl: NavController ,private service : CommonService,
              private appURLs : AppURLs)
  {

  }

  ionViewDidLoad()
  {
      setTimeout(() =>
      {
          this.initData();
      }, 1000);
  }

  initData()
  {
      this.hasErr = false;
      this.dataFinish = false;

      this.service.getJsonData(this.appURLs.ZhihuLatestListUrl).then(result =>
      {
           this.zhihuList = result;
           this.dataFinish = true;
       },
        err =>
       {
            this.hasErr = true;
       });
  }

  getMoreZhihuList(event)
  {
      let year = this.date.getFullYear();
      let month = (this.date.getMonth() + 1).toString();
      let day = this.date.getDate().toString();
      if (day.length < 2) day = '0' + day;
      if (month.length < 2) month = '0' + month;

      let dateString = '' + year + month + day;
      let url = this.appURLs.ZhihuBeforeListUrl + dateString ;

      this.service.getJsonData(url).then(result =>
      {
           this.zhihuList.stories = this.zhihuList.stories.concat(result.stories);
           this.date = new Date(this.date.getTime() - 1 * 24 * 60 * 60 * 1000);
           event.complete();
       },
        err =>
       {
            this.hasErr = true;
       });
  }

  pushContent(id)
  {
      let pages = [ZhihuNewsDetailPage];
      this.navCtrl.push(pages[0], { id: id });
  }
}
