/*
 *  get请求
 *  url:请求地址
 *  data:参数
 *  callback:回调函数
 */

export default class myFetch {
    
    static rootUrl = 'http://115.238.38.242:8090/CityInverst/';
    // static rootUrl = 'http://192.168.1.17:8098/CityInverst/';

    static get(url, params, callback, ecallback) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&');
            } else {
                url += '&' + paramsArray.join('&');
            }
            console.log(this.rootUrl + url);
        }
        //fetch请求
        fetch(this.rootUrl + url, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON);
            })
            .catch(err => ecallback(err));
    }
    static getfile(url, params, callback, ecallback) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&');
            } else {
                url += '&' + paramsArray.join('&');
            }
            console.log(this.rootUrl + url);
        }
        //fetch请求
        fetch(this.rootUrl + url, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON);
            })
            .catch(err => ecallback(err));
    }

    static getNoroot(url, params, callback, ecallback) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&');
            } else {
                url += '&' + paramsArray.join('&');
            }
            console.log(url);
        }
        //fetch请求
        fetch(url, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON);
            })
            .catch(err => ecallback(err));
    }

    static getString(url, params, callback, ecallback) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&');
            } else {
                url += '&' + paramsArray.join('&');
            }
            console.log(this.rootUrl + url);
        }
        //fetch请求
        fetch(this.rootUrl + url, {
            method: 'GET'
        })
            .then((response) => {
                callback(response);
            })
            .catch(err => ecallback(err));
    }

    /*
     *  post请求
     *  url:请求地址
     *  body:参数字符串
     *  callback:回调函数
     */
    static post(url, body, callback, ecallback) {
        //fetch请求
        fetch(this.rootUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJSON) => {
                callback(responseJSON);
            })
            .catch(err => ecallback(err));
    }

    static postString(url, body, callback, ecallback) {//解析返回结果是字符串
        //fetch请求
        fetch(this.rootUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body
        })
            .then((response) => {
                callback(response);
            })
            .catch(err => ecallback(err));
    }

}
