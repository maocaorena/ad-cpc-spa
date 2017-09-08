import $ from 'jquery';
import { Util } from '../lib/util.js'; //引入Util
var config = {
	baseUrl : "/bb",
	contentType: "application/json",
	dataType: "json",
	timeout: 1800000,
};
class API {
	commonUrl (){
		return config.baseUrl;
	};
	/**
	* 获取数据ajax-get请求
	*/
	getN(url,data,callback){
		$.ajax({
			url: config.baseUrl + url,
			type:"get",
			dataType: config.dataType,
			timeout: config.timeout,
			data:data,
			success:function(data){
				callback(data);
			},
			error:function(xhr,textstatus,thrown){

			}
		});
	};

	/**
	* 提交json数据的post请求
	*/
	postN(url,data,callback){
		$.ajax({
			url: config.baseUrl + url,
			type:"post",
			dataType: config.dataType,
			data:data,
			timeout: config.timeout,
			success: callback,
			error: function(xhr,status,error){
				console.log('服务器错误')
			}
		})
	};

	/**
	* 修改数据的ajax-put请求
	*/
	putN(url,data,callback){
		$.ajax({
			url: config.baseUrl + url,
			type:"put",
			contentType: config.contentType,
			dataType: config.dataType,
			data:data,
			timeout: config.timeout,
			success:function(msg){
				callback(msg);
			},
			error:function(xhr,textstatus,thrown){

			}
		});
	};
	/**
	* 删除数据的ajax-delete请求
	*/
	delN(url,data,callback){
		$.ajax({
			url: config.baseUrl + url,
			type:"delete",
			contentType: config.contentType,
			dataType: config.dataType,
			timeout: config.timeout,
			data:data,
			success:function(msg){
				callback(msg);
			},
			error:function(xhr,textstatus,thrown){

			}
		});
	};

}
export default API;
