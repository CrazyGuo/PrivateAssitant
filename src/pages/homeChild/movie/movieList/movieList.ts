import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { URLSearchParams } from '@angular/http';
import { MovieCategoryPage } from '../movieCategory/movieCategory';
import { MovieDetailPage } from '../movieDetail/movieDetail';
import { IonicPage } from 'ionic-angular';
import { CommonService } from '../../../../providers/baseService/CommonService';
import { AppURLs } from "../../../../providers/baseService/AppURLs";

@IonicPage()
@Component(
{
    selector: 'page-movieList',
    templateUrl: 'movieList.html'
})

export class MovieListPage
{
  @ViewChild(Content) content: Content;
  topData: Array<any>;
  movieData: any;
  dataFinish: boolean = false;
  hasErr: any;

  constructor(public navCtrl: NavController, private service : CommonService, private appURLs : AppURLs)
  {

  }
  pushPage(category)
  {
        this.navCtrl.push(MovieCategoryPage, { categories: category });
  }

  pushDetail(id)
  {
        this.navCtrl.push(MovieDetailPage, { id: id });
  }

  ionViewDidLoad()
  {
        this.initData();
  }

  initData()
  {
        this.hasErr = null;
        this.dataFinish = false;

        this.movieData = [];
        let searchParams = new URLSearchParams()
        searchParams.set('start', '0');
        searchParams.set('count', '5');

        this.service.getJsonDataParameter( this.appURLs.MovieTopUrl , searchParams ).then(result =>
        {
                   this.topData = result.subjects;
                   this.movieData.push({ title: 'Top250', content: this.topData });

                   this.service.getJsonDataParameter( this.appURLs.MovieInTheatersUrl , searchParams ).then(resultHot =>
                   {
                                      this.topData = resultHot.subjects;
                                      this.movieData.push({ title: '正在热映', content: this.topData });

                                      this.service.getJsonDataParameter( this.appURLs.MovieComingSoonUrl , searchParams ).then(resultComing =>
                                      {
                                                         this.topData = resultComing.subjects;
                                                         this.movieData.push({ title: '即将上映', content: this.topData });
                                                         this.dataFinish = true;
                                      },
                                      err =>
                                      {
                                                          this.hasErr = true;
                                      });
                   },
                   err =>
                   {
                                       this.hasErr = true;
                   });
        },
        err =>
        {
                    this.hasErr = true;
        });
  }
}
