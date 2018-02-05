import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CommonService } from '../../../providers/baseService/CommonService';
import { AppURLs } from "../../../providers/baseService/AppURLs";
import { AppVersion,Camera } from 'ionic-native';

@Component(
{
    selector: 'page-basic',
    templateUrl: 'basic.html'
})

export class BasicPage
{
  public userMode : any;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,private service:CommonService,
              private appURLs : AppURLs)
  {

  }

  login()
  {
        this.navCtrl.push(LoginPage);
  }

  logout()
  {
      let confirm = this.alertCtrl.create({
                      title: '提示',
                      message: '确定注销本次登录?',
                      buttons: [
                        {
                            text: '取消',
                            handler: () =>
                            {
                            }
                        },
                        {
                          text: '注销',
                          handler: () =>
                          {
                                 this.userMode = null;
                                 this.service.removeLocal("LoginUser");
                          }
                        }
                      ]
      });

      confirm.present();
      /*
      this.upgradeApp();
      AppVersion.getVersionNumber().then((versionNumber) =>
      {
      });*/
  }


  //读取本地用户信息
  ionViewDidEnter()
  {
        this.userMode = this.service.readLocal("LoginUser");
  }

  //调用原生的java代码 检查程序升级
  upgradeApp()
  {
         let url = this.appURLs.AppUpgradeUrl;
         (<any>window).plugins.appUpgrade.downLoad(url,(success) => { console.log(success); },(err) => { } );
  }
}
