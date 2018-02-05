import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { CommonService } from '../../../../providers/baseService/CommonService';
import { AppURLs } from "../../../../providers/baseService/AppURLs";

//declare var YCQQ, Wechat;

@Component(
{
      selector: 'page-movieDetail',
      templateUrl: 'movieDetail.html'
})

export class MovieDetailPage
{
  id: String;
  movieInfo: any;
  hasErr: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public menuCtrl: MenuController, public toastCtrl: ToastController,
              private service : CommonService, private appURLs : AppURLs)
  {
              this.id = this.navParams.get('id');
              this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLoad()
  {
              this.initData();
  }

  ionViewWillLeave()
  {
              this.menuCtrl.swipeEnable(true);
  }

  initData()
  {
              this.hasErr = null;

              let url = this.appURLs.MovieDetailUrl + this.id;
              this.service.getJsonData( url ).then(result =>
              {
                   this.movieInfo = result;
              },
              err =>
              {
                    this.hasErr = true;
              });
  }

  showToast(msg)
  {
              let toast = this.toastCtrl.create
              ({
                  message: msg,
                  duration: 2000
              });

              toast.present();
  }

  /*
  shareMovie(type, movie) {
    let that = this;
    switch (type) {
      case 'QQ':
        let QQ = {
          url: movie.share_url,
          title: movie.title,
          description: "来自Ion2--基于Ionic2的资讯类APP",
          imageUrl: movie.images.large,
          appName: "Ion2"
        };
        YCQQ.shareToQQ(function () {
          that.showToast('分享成功');
        }, function (failReason) {
          that.showToast('分享失败');
        }, QQ);
        break;
      case 'Qzone':
        let Qzone = {
          url: movie.share_url,
          title: movie.title,
          description: "来自Ion2--基于Ionic2的资讯类APP",
          imageUrl: [movie.images.large],
          appName: "Ion2"
        };
        YCQQ.shareToQzone(function () {
          that.showToast('分享成功');
        }, function (failReason) {
          that.showToast('分享失败');
        }, Qzone);
        break;
      case 'weixin':
        Wechat.share({
          message: {
            title: movie.title,
            description: "来自Ion2--基于Ionic2的资讯类APP",
            thumb: movie.images.large,
            mediaTagName: "TEST-TAG-001",
            messageExt: "来自Ion2--基于Ionic2的资讯类APP",
            messageAction: "<action>dotalist</action>",
            media: {
              type: Wechat.Type.WEBPAGE,
              webpageUrl: movie.share_url
            }
          },
          scene: Wechat.Scene.SESSION
        }, function () {
          that.showToast('分享成功');
        }, function (failReason) {
          that.showToast('分享失败');
        });
        break;
      case 'friends':
        Wechat.share({
          message: {
            title: movie.title,
            description: "来自Ion2--基于Ionic2的资讯类APP",
            thumb: movie.images.large,
            mediaTagName: "TEST-TAG-001",
            messageExt: "来自Ion2--基于Ionic2的资讯类APP",
            messageAction: "<action>dotalist</action>",
            media: {
              type: Wechat.Type.WEBPAGE,
              webpageUrl: movie.share_url
            }
          },
          scene: Wechat.Scene.TIMELINE
        }, function () {
          that.showToast('分享成功');
        }, function (failReason) {
          that.showToast('分享失败');
        });
        break;
    }
  }*/
}
