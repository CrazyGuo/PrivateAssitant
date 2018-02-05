import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { IonicPageModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { BasicPage } from '../pages/my/basic/basic';
import { LoginPage } from '../pages/my/login/login';
import { ZhihuNewsListPage } from '../pages/homeChild/zhihu/zhihuNewsList/zhihuNewsList';
import { ZhihuNewsDetailPage } from '../pages/homeChild/zhihu/zhihuNewsDetail/zhihuNewsDetail';
import { ZhihuNewsOtherDetailPage } from '../pages//homeChild/zhihu/zhihuNewsOtherDetail/zhihuNewsOtherDetail';
import { MovieCategoryPage } from '../pages/homeChild/movie/movieCategory/movieCategory';
import { MovieDetailPage } from '../pages/homeChild/movie/movieDetail/movieDetail';
import { EnglishPage } from '../pages/english/english';

// audio plugins
import { IonicAudioModule,defaultAudioProviderFactory } from 'ionic-audio';
//basic service
import {CommonService} from "../providers/baseService/CommonService";
import { AppURLs } from "../providers/baseService/AppURLs";
//business Service
import { TodoService } from "../providers/businessService/TodoService";

import { ImageLoader } from '../components/image-loader/image-loader';
import { ElasticHeader } from '../components/elastic-header/elastic-header';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule
({
      declarations:
      [
                        MyApp,
                        BasicPage,
                        HomePage,
                        TabsPage,
                        LoginPage,
                        ZhihuNewsListPage,
                        ZhihuNewsDetailPage,
                        ElasticHeader,
                        ImageLoader,
                        MovieCategoryPage,
                        MovieDetailPage,
                        EnglishPage,
                        ZhihuNewsOtherDetailPage
      ],
      imports:
      [
                        BrowserModule,
                        HttpModule,
                        BrowserAnimationsModule,
                        IonicModule.forRoot( MyApp,{  tabsHideOnSubPages: true } ),
                        IonicAudioModule.forRoot(defaultAudioProviderFactory)
      ],
      schemas:
      [
                        CUSTOM_ELEMENTS_SCHEMA
      ],
      bootstrap:
      [
                        IonicApp
      ],
      entryComponents:
      [
                        MyApp,
                        BasicPage,
                        HomePage,
                        TabsPage,
                        LoginPage,
                        ZhihuNewsListPage,
                        ZhihuNewsDetailPage,
                        MovieCategoryPage,
                        MovieDetailPage,
                        EnglishPage,
                        ZhihuNewsOtherDetailPage
      ],
      providers: [
                        {
                            provide: ErrorHandler,
                            useClass: IonicErrorHandler
                        },
                        CommonService,
                        AppURLs,
                        TodoService,
                        StatusBar,
                        SplashScreen,
                        Camera
                 ]
})

export class AppModule {}
