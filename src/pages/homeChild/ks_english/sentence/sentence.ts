import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { CommonService } from '../../../../providers/baseService/CommonService';
import { AppURLs } from "../../../../providers/baseService/AppURLs";
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component(
{
  selector: 'page-sentence',
  templateUrl: 'sentence.html'
})

export class SentencePage
{
  private englishSentence ;
  private pageIndex;
  private pageSize;
  private dataFinish: boolean = false;
  private isLastPage: boolean = false;
  private sentenceUrl:string;
  constructor(private navCtrl: NavController, navParams: NavParams,private service : CommonService,
              private appURLs : AppURLs)
  {
      this.englishSentence = [];
      this.isLastPage = false;
      this.pageIndex = 1;
      this.pageSize = 20;
      this.sentenceUrl = this.appURLs.WordSentenceUrl;
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
      this.dataFinish = false;
      let searchParams = new URLSearchParams()
      searchParams.set('pageIndex', this.pageIndex);
      searchParams.set('pageSize', this.pageSize);

      this.service.getJsonDataParameter(this.sentenceUrl,searchParams).then(result =>
      {
                    this.englishSentence = result.Data;
                    if(result.Data.length < this.pageSize)
                    {
                          this.isLastPage = true;
                    }
                    else
                    {
                       this.pageIndex = this.pageIndex + 1;
                    }
                    this.dataFinish = true;
      },
      err =>
      {

      });
  }

  getMoreSentenceList(event)
  {
      let searchParams = new URLSearchParams()
      searchParams.set('pageIndex', this.pageIndex);
      searchParams.set('pageSize', this.pageSize);

      this.service.getJsonDataParameter(this.sentenceUrl,searchParams).then(result =>
      {
                    this.englishSentence = this.englishSentence.concat(result.Data);
                    if(result.Data.length < this.pageSize)
                    {
                        this.isLastPage = true;
                    }
                    else
                    {
                       this.pageIndex = this.pageIndex + 1;
                    }
                    event.complete();
      },
      err =>
      {

      });
  }

}
