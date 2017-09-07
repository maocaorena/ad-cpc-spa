<template>
	<div id="ad-data" class="wrapper">
		<slide-bar :accountType="accountType" v-if="accountType != -11"></slide-bar>
			<h1>广告管理</h1>
			<div class="container" v-loading.body="loading" element-loading-text="拼命加载中">
				<div class="search-bar">
					<div class="search-bar-item width1">
						<el-input v-model="adName" placeholder="广告名称"></el-input>
					</div>
					<div class="search-bar-item width2">
						<el-select v-model="advertiserId" clearable placeholder="请选择广告主" :loading="selectloading">
							<el-option v-for="item of advertiserProxyList" :key="item.id" :label="item.company" :value="item.id">
							</el-option>
						</el-select>
					</div>
					<div class="search-bar-item">
						<button @click="search">查询</button>
					</div>
				</div>
				<div class="list-wrapper">
					<div class="t-tit">
						<table class="list">
							<colgroup>
								<!--广告ID-->
								<col width="12">
								<!--广告名称-->
								<col width="21">
								<!--广告主-->
								<col width="21">
								<!--单价-->
								<col width="12">
								<!--日预算-->
								<col width="12">
								<!--状态-->
								<col width="10">
								<!--操作-->
								<col width="14">
							</colgroup>
							<thead>
								<tr class="list-tit">
									<th>广告ID</th>
									<th>广告名称</th>
									<th>广告主</th>
									<th>单价</th>
									<th>日预算</th>
									<th>状态</th>
									<th>操作</th>
							</tr>
							</thead>
						</table>
					</div>
					<div class="list-container">
						<table class="list">
							<colgroup>
								<!--广告ID-->
								<col width="12">
								<!--广告名称-->
								<col width="21">
								<!--单价-->
								<col width="21">
								<!--日预算-->
								<col width="12">
								<!--曝光量-->
								<col width="12">
								<!--点击量-->
								<col width="10">
								<!--点击率-->
								<col width="14">
							</colgroup>
							<tbody class="list-con" @click="handle">
								<tr v-for="item of list" class="list-con-item">
									<!--广告ID-->
									<td>{{item.adId}}</td>
									<!--广告名称-->
									<td>{{item.adName}}</td>
									<!--广告主-->
									<td>{{item.advertiserName}}</td>
									<!--单价-->
									<td>{{item.price}}</td>
									<!--日预算-->
									<td>{{item.dailyBudget}}</td>
									<!--状态-->
									<td>{{item.certificatestate==1?'启用':'停用'}}</td>
									<!--操作-->
									<td>
										<span :data="JSON.stringify(item)" class="mode setPrice">设置单价</span>
										<span :data="JSON.stringify(item)" class="mode setDayPay">设置日预算</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="page">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
					</el-pagination>
				</div>
			</div>
		<transition name="alert-fade">
			<alert v-if="hh" :goNext="goNext" v-on:submitMessage="submitSet" v-on:close="changeAlert"></alert>
		</transition>
	</div>
</template>

<script>
import slideBar from "../../components/slidebar.vue";
import alert from "../../components/alert.vue";
import { Util } from '../../lib/util.js';
export default {
	data() {
		return {
			advertiserProxyList: [],
			advertiserId: '',
			adName: '',
			currentPage3: 1,//默认第几页
			loading: false,//控制loading动画
			pageNum: 1,//页码
			pageSize: 10,//每页数量
			list: [],//列表
			total: 1,
			hh: false,
			goNext: null,
			selectloading: false,
			accountType: -11,
		}
	},
	components: {
		"slide-bar": slideBar,
		"alert": alert,
	},
	methods: {
		submitSet(message){
			console.log(message);
			this.changeAlert();
			this.getList();
		},
		handle(e){
			let classStr = e.target.className.split(" ")[1];
			let message = JSON.parse(e.target.getAttribute('data'));
			switch(classStr){
				case 'setPrice':
					this.goNext = {
						message: message,
						type: 1,
					};
					this.changeAlert();
					break;
				case 'setDayPay':
					this.goNext = {
						message: message,
						type: 2,
					};
					this.changeAlert();
					break;
			}
		},
		changeAlert(){//更改弹窗状态
			this.hh = !this.hh;
		},
		search(){
			this.pageNum = 1;
			this.getList();
		},
		handleSizeChange(val) {//改变每页显示数量
			console.log(val);
			this.pageNum = 1;
			this.pageSize = val;
			this.getList()
		},
		handleCurrentChange(val) {//选择页码
			this.pageNum = val;
			this.getList();
		},
		getList(){
			this.loading = true;
			let that = this;
			this.api.getN('getProxyAdList',{
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				adName: this.adName,
				advertiserId: this.advertiserId,
			}).then((res)=>{
				that.loading = false;
				if(res.data.successed){
					that.list = res.data.returnValue.list;
					that.total = res.data.returnValue.total;
				}else{
					this.$message.error({
						message: res.data.errorCode,
						duration: Util.time()
					});
				}
			})
		},
		getAdvertiserProxyList(){//查询广告主列表
			this.selectloading = true;
			this.api.getN('account/getAdvertiserProxyList',{

			}).then((res)=>{
				this.selectloading = false;
				if(res.data.successed){
					this.advertiserProxyList = res.data.returnValue;
				}else{
					this.$message.error({
						message: res.data.errorCode,
						duration: Util.time()
					});
				}
			})
		},
		getUserMessage(){//获取用户信息
			this.api.getN('account/getAccountInfo',{

			}).then((res)=>{
				if(res.data.successed){
					this.accountType = res.data.returnValue.accountType;
				}else{
					this.$message.error({
						message: res.data.errorCode,
						duration: Util.time()
					});
				}
			})
		},
	},
	created() {
		// this.getUserMessage();
		// this.getAdvertiserProxyList();
		// this.getList();
		//this.search();
	}
}
</script>

<style lang="scss">
#ad-data {
	width: 100%;
	height: 100%;
	padding: 0 12px;
	background: #ebeced;
	h1 {
		height: 65px;
		font-size: 20px;
		color: #333333;
		font-weight: 600;
		line-height: 65px;
	}
}
</style>
