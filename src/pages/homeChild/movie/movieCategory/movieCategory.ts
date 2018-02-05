import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { MovieDetailPage } from '../movieDetail/movieDetail';
import { CommonService } from '../../../../providers/baseService/CommonService';
import { AppURLs } from "../../../../providers/baseService/AppURLs";

@Component(
{
      selector: 'page-movieCategory',
      templateUrl: 'movieCategory.html'
})

export class MovieCategoryPage
{
      category: String;
      movieList: any = [];
      start = 0;
      count = 10;
      dataFinish: boolean = false;
      hasmore: boolean = false;
      hasErr: any;

      constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController,
                  private service : CommonService, private appURLs : AppURLs)
      {
            this.category = this.navParams.get('categories');
            this.menuCtrl.swipeEnable(false);
      }

      ionViewDidLoad()
      {
            this.getData(null);
      }

      ionViewWillLeave()
      {
            this.menuCtrl.swipeEnable(true);
      }

      pushDetail(id)
      {
            this.navCtrl.push(MovieDetailPage, { id: id })
      }

      getData(event)
      {
            if (event && event.ionRefresh)
            {
                    this.start = 0;
                    this.movieList = [];
            }
            let searchParams = new URLSearchParams()
            searchParams.set('start', '' + this.start);
            searchParams.set('count', '' + this.count);

            this.hasErr = null;
            this.dataFinish = false;

            switch (this.category)
            {
                case 'Top250':
                      this.FetchData(this.appURLs.MovieTopUrl,searchParams,event);

                      break;
                case '正在热映':
                      this.FetchData(this.appURLs.MovieInTheatersUrl,searchParams,event);

                      break;
                case '即将上映':
                      this.FetchData(this.appURLs.MovieComingSoonUrl,searchParams,event);

                      break;
            }
      }

     FetchData( url, searchParams, event )
     {
             this.service.getJsonDataParameter( url , searchParams ).then(result =>
             {
                        this.movieList = this.movieList.concat(result.subjects);
                        this.dataFinish = true;

                        if (result.subjects.length >= 10)
                        {
                                   this.start += this.count;
                                   this.hasmore = true;
                        }
                        else
                        {
                                   this.hasmore = false;
                        }
                        if (event)
                        {
                                     event.complete();
                        }
             },
             err =>
             {
                         this.hasErr = true;
             });
     }
}
