import $ from 'jquery';
import { Util } from '../lib/util.js'; //引入Util
var baseUrl = "https://www.ele.me/restapi/shopping/restaurants?extras%5B%5D=activities&geohash=wtmkkc29yxc&latitude=30.28553&limit=24&longitude=120.09252&offset=0&terminal=web";
class API {
	commonUrl (){
		return baseUrl;
	};

	getN(url, param) {
		$.ajax({
			type : 'get',
			timeout : 180000,
			dataType : 'json',
			contentType : 'application/x-www-form-urlencoded',
			url : baseUrl + url,
			data : param,
			beforeSend: function(xhr){//发送请求前运行的函数。
				console.log('beforeSend',xhr)
			},
			dataFilter(data,type){//用于处理 XMLHttpRequest 原始响应数据的函数。

			},
			success: function(result,status,xhr){

			},
			error: function(xhr,status,error){

			}
		})
	};

	putN(url, param) {//put方式

	};

	ajax(url, param, callback,cat) {
		$.ajax({
			type : 'get',
			timeout : 180000,
			dataType : 'json',
			contentType : 'application/x-www-form-urlencoded',
			url : baseUrl + url,
			data : param,
			beforeSend: function(xhr){//发送请求前运行的函数。
				console.log('beforeSend',xhr)
			},
			dataFilter(data,type){//用于处理 XMLHttpRequest 原始响应数据的函数。

			},
			success: callback,
			error: cat,
		})
	};
	ajax1(url, param, callback, then) {
		let that = this;
		this.getN(url, param).then(callback).then(then).catch(function(error) {
			that.errorHandle(error);
		});
	};

	ajaxPost(url, param, callback) {
		$.ajax({
			type : 'get',
			timeout : 180000,
			dataType : 'json',
			contentType : 'application/x-www-form-urlencoded',
			url : baseUrl + url,
			data : param,
			beforeSend: function(xhr){//发送请求前运行的函数。
				console.log('beforeSend',xhr)
			},
			dataFilter(data,type){//用于处理 XMLHttpRequest 原始响应数据的函数。

			},
			success: callback,
			error: function(xhr,status,error){
				console.log('错了')
			}
		})
	};

	//post请求
	postN(url, param) {
	};
	//上传图片
	postUp(url, param, progress) {
	};

	//请求错误处理
	errorHandle(error) {
	};

}
export default API;
