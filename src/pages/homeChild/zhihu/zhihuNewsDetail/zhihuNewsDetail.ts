import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { CommonService } from '../../../../providers/baseService/CommonService';
import { AppURLs } from "../../../../providers/baseService/AppURLs";

//declare var YCQQ, Wechat;

@Component(
{
      selector: 'page-zhihuNewsDetail',
      templateUrl: 'zhihuNewsDetail.html'
})

export class ZhihuNewsDetailPage
{
  id: String;
  content: any;
  hasErr: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public menuCtrl: MenuController, public toastCtrl: ToastController,
              private service : CommonService, private appURLs : AppURLs)
  {
            this.id = this.navParams.get('id');
            this.menuCtrl.swipeEnable(false);
  }

  ionViewWillLeave()
  {
          this.menuCtrl.swipeEnable(true);
  }

  ionViewDidLoad()
  {
          this.initData();
  }

  initData()
  {
          this.hasErr = null;

          let contentUrl = this.appURLs.ZhihuContentUrl +  this.id;
          this.service.getJsonData(contentUrl).then(result =>
          {
               this.content = result;
          },
            err =>
          {
                this.hasErr = true;
          });
  }
/*
  shareContent(type, content)
  {
          let that = this;
          switch (type)
          {
              case 'QQ':
                      let QQ =
                      {
                        url: content.share_url,
                        title: content.title,
                        description: "来自Ion2--基于Ionic2的资讯类APP",
                        imageUrl: content.images[0],
                        appName: "Ion2"
                      };

                      YCQQ.shareToQQ(function ()
                      {
                        that.showToast('分享成功');
                      },
                      function (failReason)
                      {
                        that.showToast('分享失败');
                      }, QQ);
                      break;

              case 'Qzone':
                      let Qzone =
                      {
                            url: content.share_url,
                            title: content.title,
                            description: "来自Ion2--基于Ionic2的资讯类APP",
                            imageUrl: content.images,
                            appName: "Ion2"
                      };

                      YCQQ.shareToQzone(function ()
                      {
                            that.showToast('分享成功');
                      },
                      function (failReason)
                      {
                            that.showToast('分享失败');
                      }, Qzone);
                      break;

              case 'weixin':
                      Wechat.share(
                      {
                            message:
                            {
                                  title: content.title,
                                  description: "来自Ion2--基于Ionic2的资讯类APP",
                                  thumb: content.images[0],
                                  mediaTagName: "TEST-TAG-001",
                                  messageExt: "来自Ion2--基于Ionic2的资讯类APP",
                                  messageAction: "<action>dotalist</action>",
                                  media:
                                  {
                                        type: Wechat.Type.WEBPAGE,
                                        webpageUrl: content.share_url
                                  }
                            },
                            scene: Wechat.Scene.SESSION
                      },
                      function ()
                      {
                            that.showToast('分享成功');
                      },
                      function (failReason)
                      {
                            that.showToast('分享失败');
                      });
                      break;

              case 'friends':
                      Wechat.share(
                      {
                              message:
                              {
                                    title: content.title,
                                    description: "来自Ion2--基于Ionic2的资讯类APP",
                                    thumb: content.images[0],
                                    mediaTagName: "TEST-TAG-001",
                                    messageExt: "来自Ion2--基于Ionic2的资讯类APP",
                                    messageAction: "<action>dotalist</action>",
                                    media:
                                    {
                                            type: Wechat.Type.WEBPAGE,
                                            webpageUrl: content.share_url
                                    }
                              },
                              scene: Wechat.Scene.TIMELINE
                      },
                      function ()
                      {
                              that.showToast('分享成功');
                      },
                      function (failReason)
                      {
                              that.showToast('分享失败');
                      });
                      break;
          }
  }
*/
  showToast(msg)
  {
      let toast = this.toastCtrl.create(
      {
        message: msg,
        duration: 2000
      });

      toast.present();
  }
}
