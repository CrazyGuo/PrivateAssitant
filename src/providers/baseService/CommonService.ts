import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CommonService
{
    topData: Array<any>;
    data: any;

    constructor( private http: Http)
    {

    }

    getJsonData(url)
    {
        return this.http.get(url).toPromise().then(r=> r.json());
    }

    getJsonDataParameter(url,parameters)
    {
        return this.http.get(url, { search  : parameters  } ).toPromise().then(r=> r.json());
    }

    postDataParameter(url,parameterModel)
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let parameterJson = JSON.stringify(parameterModel);

        return this.http
              .post(url, parameterJson, {headers: headers})
              .toPromise()
              .then(res => res.json());
    }

    writeLocal(key:string, value:any)
    {
        if (value)
        {
            value = JSON.stringify(value);//将value对象转换成字符串
        }
        localStorage.setItem(key, value);
    }

    readLocal(key:string)
    {
        let value = localStorage.getItem(key);
        if (value && value != "undefined" && value != "null")
        {
            return JSON.parse(value);//如果有值则返回value对象
        }
        return null;//没有值则返回空
    }

    removeLocal(key: string)
    {
        localStorage.removeItem(key);
    }
}
