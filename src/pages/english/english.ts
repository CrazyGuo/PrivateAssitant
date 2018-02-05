import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController,ToastController } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { CommonService } from '../../providers/baseService/CommonService';
import { AppURLs } from "../../providers/baseService/AppURLs";
import { AudioProvider } from 'ionic-audio';

@Component(
{
    selector: 'page-english',
    templateUrl: 'english.html'
})

export class EnglishPage
{
  private groupEnglish ;
  private shownGroup ;
  public englishWord:string;
  public loading;

  public startIndex: number;
  public currentWordId: number;
  private currentWord : string;

  private addWordToMeUrl : string;

  private levelList ;
  private levelUrl : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private loadCtrl:LoadingController,
              private audioProvider: AudioProvider,public alertCtrl: AlertController,
              private toastCtrl: ToastController,private service:CommonService,
              private appURLs : AppURLs)
  {
      this.groupEnglish = [];
      this.shownGroup = {};
      this.startIndex = 0;

      this.addWordToMeUrl = this.appURLs.AddWordToMeUrl;

      this.levelList = [];
      this.levelUrl = this.appURLs.WordLevelUrl;
  }

  ionViewDidLoad()
  {
      this.getLevelList();
  }

  search()
  {
      let user = this.service.readLocal("LoginUser");
      let url = this.appURLs.SearchWordUrl;
      console.log(url);
      let val = this.englishWord;
      let searchParams = new URLSearchParams()
      searchParams.set('key', val);
      searchParams.set('loginName', user.LoginName);

      this.loading = this.loadCtrl.create({ content: '加载中...'});
      this.loading.present();
      this.service.getJsonDataParameter(url,searchParams).then(result =>
      {
                    this.groupEnglish = result.Data;
                    this.loading.dismiss();
      },
      err =>
      {

      });
  }

  onTrackFinished(track: any)
  {
  }

  autoPlay()
  {
     this.audioProvider.play(this.startIndex);
  }

  toggleGroup(group,id)
  {
                if (this.isGroupShown(group))
                {
                    this.shownGroup = null;
                }
                else
                {
                    this.shownGroup = group;
                    this.startIndex = id;
                    this.autoPlay();

                    this.currentWordId = group.Id;
                    this.currentWord = group.Word;
                }
  }

  isGroupShown(group)
  {
         return this.shownGroup === group;
  }

  joinInMyDiction()
  {
           let alert = this.alertCtrl.create();
           alert.setTitle('加入我的字典中');
           alert.setSubTitle('当前单词' + this.currentWord);

           for(let i=0;i<this.levelList.length; i++)
           {
                 alert.addInput({
                       type: 'radio',
                       label: this.levelList[i].Name,
                       value: this.levelList[i].Id,
                       checked: i == 0 ? true : false
                 });
           }

           alert.addButton('取消');
           alert.addButton(
           {
                 text: '确定',
                 handler: data =>
                 {
                       this.processNewJoinedWord(this.currentWordId,data);
                 }
           });
           alert.present();
  }

  processNewJoinedWord(wordId,levelId)
  {
        let user = this.service.readLocal("LoginUser");
        let searchParams = new URLSearchParams()
        searchParams.set('wordId', wordId.toString());
        searchParams.set('levelId', levelId.toString());
        searchParams.set('loginName', user.LoginName);

        this.service.getJsonDataParameter(this.addWordToMeUrl,searchParams).then(result =>
        {
              let mess ='';
              if(result.IsSuccess)
              {
                    mess = '标记成功';
              }
              else
              {
                    mess = '标记失败';
              }

              let toast = this.toastCtrl.create(
              {
                  message: mess,
                  duration: 3000,
                  position: 'middle'
              });
              toast.present();
        },
        err =>
        {

        });
  }

  getLevelList()
  {
           this.service.getJsonData(this.levelUrl).then(result =>
           {
                         this.levelList = result.Data;
           },
           err =>
           {

           });
  }

}
