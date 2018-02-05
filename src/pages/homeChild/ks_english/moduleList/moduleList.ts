import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { CommonService } from '../../../../providers/baseService/CommonService';
import { AppURLs } from '../../../../providers/baseService/AppURLs';

@IonicPage()
@Component(
{
      templateUrl: 'moduleList.html'
})

export class ModuleListPage
{
  icons: string[];
  items: Array<any>;

  constructor(private navCtrl: NavController,
              private commonService :CommonService,
              private appURLs : AppURLs)
  {
    /*this.items = [
                       { title : '单词自动播放', page : 'WordIteratePage' ,icon:'beer'},
                       { title : '单词深入学习',  page : 'WordStudyPage', icon:'flask' },
                       { title : '句子常用', page : 'SentencePage' ,icon:'football'},
                       { title : '饼状图', page : 'WordPieChartPage' ,icon:'football'},
                       { title : '折线图', page : 'WordLineChartPage' ,icon:'football'},
                       { title : '柱状图', page : 'WordBarChartPage' ,icon:'football'}
                 ];*/
  }

   ionViewDidLoad()
   {
           this.commonService.getJsonData( this.appURLs.EnglishConfigUrl ).then(result =>
           {
                   this.items = result.modules;
           },
           err =>
           {

           });
   }

  itemTapped(event, item)
  {
          this.navCtrl.push(item.page);
  }
}
