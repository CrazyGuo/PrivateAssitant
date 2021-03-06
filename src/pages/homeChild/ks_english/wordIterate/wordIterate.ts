import { Component, ViewChild } from '@angular/core';
import { Content,AlertController } from 'ionic-angular';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { CommonService } from '../../../../providers/baseService/CommonService';
import { AppURLs } from "../../../../providers/baseService/AppURLs";
import { AudioProvider } from 'ionic-audio';
import { IonicPage } from 'ionic-angular';

@IonicPage()

@Component(
{
    selector: 'page-wordIterate',
    templateUrl: 'wordIterate.html'
})

export class WordIteratePage
{
  private groupEnglish ;
  private shownGroup ;
  public englishWord:string;
  public loading;

  private pageIndex;
  private pageSize;
  private dataFinish: boolean = false;
  private isLastPage: boolean = false;
  private url:string;
  public startIndex: number;
  public repeatTimes: number;
  public startLimited: number;
  public endLimited: number;

  public startRange: number;
  public endRange: number;
  public level: number;

  private levelList ;
  private levelUrl : string;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private audioProvider: AudioProvider,public alertCtrl: AlertController,
              private service:CommonService, private appURLs : AppURLs)
  {
      this.groupEnglish = [];
      this.shownGroup = {};

      this.isLastPage = false;
      this.pageIndex = 1;
      this.pageSize = 100;
      this.url = this.appURLs.SearchWordIterateUrl;
      this.startIndex = 0;
      this.repeatTimes = 0;

      this.startRange = 5000;
      this.endRange = 10000;
      this.level = 1;

      this.levelList = [];
      this.levelUrl = this.appURLs.WordLevelUrl;
  }

  ionViewDidLoad()
  {
      setTimeout(() =>
              {
                  this.initData();
              }, 1000);
      this.getLevelList();
  }

  initData()
  {
      this.dataFinish = false;
      let searchParams = new URLSearchParams()
      searchParams.set('pageIndex', this.pageIndex);
      searchParams.set('pageSize', this.pageSize);
      searchParams.set('startRange', this.startRange.toString());
      searchParams.set('endRange', this.endRange.toString());
      searchParams.set('level', this.level.toString());

      this.service.getJsonDataParameter(this.url,searchParams).then(result =>
      {
                    this.groupEnglish = result.Data;
                    this.startIndex = 0;

                    this.pageIndex = this.pageIndex + 1;
                    this.isLastPage = true;
                    this.dataFinish = true;

                    this.startLimited = this.content.scrollTop;
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

  getMoreList(event)
  {
        let searchParams = new URLSearchParams()
        searchParams.set('pageIndex', this.pageIndex);
        searchParams.set('pageSize', this.pageSize);
        searchParams.set('startRange', this.startRange.toString());
        searchParams.set('endRange', this.endRange.toString());
        searchParams.set('level', this.level.toString());

        this.service.getJsonDataParameter(this.url,searchParams).then(result =>
        {
                      this.groupEnglish = this.groupEnglish.concat(result.Data);
                      this.pageIndex = this.pageIndex + 1;
                      this.isLastPage = true;
                      event.complete();
        },
        err =>
        {

        });
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
                    this.repeatTimes = 0;
                    this.autoPlay();
                }
  }

  isGroupShown(group)
  {
         return this.shownGroup === group;
  }

  onTrackFinished(track: any)
  {
      this.repeatPlay();
  }

  autoPlay()
  {
      this.repeatTimes = this.repeatTimes + 1;
      this.audioProvider.play(this.startIndex);
  }

  repeatPlay()
  {
        if(this.audioProvider.tracks.length > this.startIndex )
        {
                if( this.repeatTimes >= 2 )
                {
                    this.repeatTimes = 0;
                    let distance = 70;
                    let currentPosition = (this.startIndex+1)   * distance;
                    this.content.scrollTo(0, currentPosition);
                    this.startIndex = this.startIndex + 1;
                }

                this.autoPlay();

                if((this.audioProvider.tracks.length - this.startIndex > 3) && (this.audioProvider.tracks.length - this.startIndex <5) )
                {
                      this.content.scrollToBottom();
                }
        }
  }

  setRange()
  {
      let alert = this.alertCtrl.create(
      {
          title: '设置单词范围',
          inputs: [
                      {
                          name: 'start',
                          placeholder: 'Start',
                          type: 'number',
                          value : this.startRange.toString()
                      },
                      {
                          name: 'end',
                          placeholder: 'End',
                          type: 'number',
                          value : this.endRange.toString()
                      }
                  ],
          buttons: [
                      {
                        text: '取消',
                        role: 'cancel',
                        handler: data => {  }
                      },
                      {
                        text: '确定',
                        handler: data =>
                        {
                             this.startRange = data.start;
                             this.endRange = data.end;
                             this.pageIndex = 1;
                             this.initData();
                        }
                      }
                    ]
        });
        alert.present();
  }

  setLevel()
  {
      let alert = this.alertCtrl.create();
      alert.setTitle('单词等级设置');

      for(let i=0;i<this.levelList.length; i++)
      {
            alert.addInput({
                  type: 'radio',
                  label: this.levelList[i].Name,
                  value: this.levelList[i].Id,
                  checked: this.level == this.levelList[i].Id ? true : false
            });
      }

      alert.addButton('取消');
      alert.addButton(
      {
            text: '确定',
            handler: data =>
            {
                  this.level = data;
                  this.pageIndex = 1;
                  this.initData();
            }
      });
      alert.present();
  }

}
