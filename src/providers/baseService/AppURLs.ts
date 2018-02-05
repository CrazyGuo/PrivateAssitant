import { Injectable } from '@angular/core';

@Injectable()
export class AppURLs
{
    constructor()
    {

    }

    //System Part URL
    public AppBaseUrl = "https://wuzffalu.cn.flextronics.com/flexpsappapi/api/";
    public AppUpgradeUrl = this.AppBaseUrl + "dormitory/CheckAppVersion?appKind=1";
    public LoginUrl = this.AppBaseUrl + "UserLoginAndRegister/Login";
    public HomeConfigUrl = "assets/data/data.json";

    //English Part URL
    public EnglishConfigUrl = "assets/data/english_module.json";
    public AddWordToMeUrl = this.AppBaseUrl + "english/AddWordToMe";
    public WordLevelUrl = this.AppBaseUrl + "english/GetWordLevelList";
    public SearchWordUrl = this.AppBaseUrl + "english/Getwords";
    public SearchWordIterateUrl = this.AppBaseUrl + "english/GetwordIterate";
    public WordSentenceUrl = this.AppBaseUrl + "English/GetSentences";
    public WordUpdateLevelUrl = this.AppBaseUrl + "english/UpdateWordLevel";

    //Art Part URL
    public ArtListUrl = "http://gank.io/api/random/data/%E7%A6%8F%E5%88%A9/25";

    //Zhihu Part URL
    public ZhihuBaseUrl = "http://news-at.zhihu.com/api/4/news/";
    public ZhihuLatestListUrl = this.ZhihuBaseUrl + "latest";
    public ZhihuBeforeListUrl = this.ZhihuBaseUrl + "before/";
    public ZhihuContentUrl = this.ZhihuBaseUrl;
    public ZhihuOtherListUrl = "http://news-at.zhihu.com/api/4/theme/";

    //Movie Part URL
    public MovieDetailUrl = "https://api.douban.com/v2/movie/subject/";
    public MovieTopUrl = "https://api.douban.com/v2/movie/top250";
    public MovieInTheatersUrl = "https://api.douban.com/v2/movie/in_theaters";
    public MovieComingSoonUrl = "https://api.douban.com/v2/movie/coming_soon";
}
