import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { URLSearchParams } from '@angular/http';
import { CommonService } from '../../../providers/baseService/CommonService';
import { AppURLs } from "../../../providers/baseService/AppURLs";

@Component(
{
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [
      //For the logo
      trigger('flyInBottomSlow',
      [
        state('in', style(
        {
              transform: 'translate3d(0,0,0)'
        })),
        transition('void => *',
        [
              style({transform: 'translate3d(0,2000px,0'}),
              animate('2000ms ease-in-out')
        ])
      ]),

      //For the background detail
      trigger('flyInBottomFast',
      [
        state('in', style(
        {
              transform: 'translate3d(0,0,0)'
        })),
        transition('void => *',
        [
              style({transform: 'translate3d(0,2000px,0)'}),
              animate('1000ms ease-in-out')
        ])
      ]),

      //For the login form
      trigger('bounceInBottom',
      [
        state('in', style(
        {
              transform: 'translate3d(0,0,0)'
        })),
        transition('void => *',
        [
          animate('2000ms 200ms ease-in', keyframes(
          [
                style({transform: 'translate3d(0,2000px,0)', offset: 0}),
                style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
                style({transform: 'translate3d(0,0,0)', offset: 1})
          ]))
        ])
      ]),

      //For login button
      trigger('fadeIn',
      [
        state('in', style(
        {
              opacity: 1
        })),
        transition('void => *',
        [
              style({opacity: 0}),
              animate('1000ms 2000ms ease-in')
        ])
      ])
    ]
})

export class LoginPage
{
      logoState: any = "in";
      cloudState: any = "in";
      loginState: any = "in";
      formState: any = "in";
      public loading;

      constructor(public navCtrl: NavController,private loadCtrl:LoadingController,
                  private formBuilder: FormBuilder,private service:CommonService,
                  private appURLs : AppURLs)
      {
            this.loading = this.loadCtrl.create({ content: '加载中...'});
      }
      loginForm = this.formBuilder.group(
      {
          'LoginID': [''],// 第一个参数是默认值
          'LoginPwd': ['']
      });

      login(user, _event)
      {
            //_event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作
            let userName = user.LoginID;
            let pwd = user.LoginPwd;
            let searchParams = new URLSearchParams()
            searchParams.set('name', userName);
            searchParams.set('pwd', pwd);

            let url = this.appURLs.LoginUrl;

            this.loading.present();
            this.service.getJsonDataParameter(url,searchParams).then(result =>
            {
                          this.service.writeLocal("LoginUser",result);
                          this.loading.dismiss();
                          this.navCtrl.pop();//返回上一UI
            },
            err =>
            {

            });
      }
}
