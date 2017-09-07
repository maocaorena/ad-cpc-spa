<template>
	<div id="ad-data">
			<h1>广告数据</h1>
			<div class="container" v-loading.body="loading" element-loading-text="拼命加载中">
				<div class="search-bar">
					<div class="search-bar-item width1">
						<el-input v-model="adName" placeholder="广告计划名称"></el-input>
					</div>
					<div class="search-bar-item width2" v-if="accountType == 1">
						<el-select v-model="advertiserId" clearable placeholder="请选择广告主" :loading="selectloading">
							<el-option v-for="item of advertiserProxyList" :key="item.id" :label="item.company" :value="item.id">
							</el-option>
						</el-select>
					</div>
					<div class="search-bar-item width2">
						<el-date-picker v-model="value7" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2" default-value="2017-06-09">
						</el-date-picker>
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
								<col width="10">
								<!--广告名称-->
								<col width="30">

								<col width="22" v-if="accountType == 1">
								<!--单价-->
								<col width="8">

								<!--日预算-->
								<col width="12">
								<!--曝光量-->
								<col width="12">
								<!--点击量-->
								<col width="12">
								<!--点击率-->
								<col width="8">
								<!--点击均价-->
								<col width="12">
								<!--消耗-->
								<col width="12">
							</colgroup>
							<thead>
								<tr class="list-tit">
									<th>广告ID</th>
									<th>广告名称</th>
									<th v-if="accountType == 1">广告主</th>
									<th>单价</th>
									<th>日预算</th>
									<th>曝光量</th>
									<th>点击量</th>
									<th>点击率</th>
									<th>点击均价</th>
									<th>消耗</th>
								</tr>
							</thead>
						</table>
					</div>
					<div class="list-container">
						<table class="list">
							<colgroup>
								<!--广告ID-->
								<col width="10">
								<!--广告名称-->
								<col width="30">

								<col width="22" v-if="accountType == 1">
								<!--单价-->
								<col width="8">
								<!--日预算-->
								<col width="12">
								<!--曝光量-->
								<col width="12">
								<!--点击量-->
								<col width="12">
								<!--点击率-->
								<col width="8">
								<!--点击均价-->
								<col width="12">
								<!--消耗-->
								<col width="12">
							</colgroup>
							<tbody class="list-con">
								<tr v-for="item of list" class="list-con-item">
									<!--广告ID-->
									<td>{{item.adId}}</td>
									<!--广告名称-->
									<td>{{item.adName}}</td>

									<td v-if="accountType == 1">{{item.advertiserName}}</td>
									<!--单价-->
									<td>{{item.price}}</td>
									<!--日预算-->
									<td>{{item.dailyBudget}}</td>
									<!--曝光量-->
									<td>{{item.exposure}}</td>
									<!--点击量-->
									<td>{{item.clicks}}</td>
									<!--点击率-->
									<td>{{item.clickRate}}</td>
									<!--点击均价-->
									<td>{{item.clickAveragePrice}}</td>
									<!--消耗-->
									<td>{{item.consume}}</td>
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
		</div>

</template>

<script>
	import slideBar from "../../components/slidebar.vue";
	import { Util } from '../../lib/util.js';
	export default {
		data() {
			return {
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				adName: '',//搜索广告名称
				value7: [new Date(Date.now()-86400000), new Date()],//开始结束时间,默认前一天到今天
				currentPage3: 1,//默认第几页
				loading: false,//控制loading动画
				pageNum: 1,//页码
				pageSize: 10,//每页数量
				startTime: '',//开始时间毫秒
				endTime: '',//结束时间毫秒
				total: 1,//总条数
				list: [],//列表
				advertiserProxyList: [],//代理获取广告主列表
				accountType: -11,//用户类型  0直客，1代理，2子账号
				advertiserId: '',//选择的广告主id
				selectloading: false,//select状态
				goUrl: '',
				params: {},
			}
		},
		components: {
			"slide-bar": slideBar
		},
		methods: {
			search(){
				let _start = new Date(this.value7[0]) ||'';
				let _end = new Date(this.value7[1]) ||'';
				if(JSON.stringify(_start) == 'null' || _start.getFullYear() < 2015){
					this.startTime = '';
					this.endTime = '';
				}else{
					this.startTime = _start.getFullYear() + '-' + this.addZero(_start.getMonth()+1) + '-' + this.addZero(_start.getDate());
					this.endTime = _end.getFullYear() + '-' + this.addZero(_end.getMonth()+1) + '-' + this.addZero(_end.getDate());
				};
				this.pageNum = 1;
				this.getList();
			},
			addZero(num){
				if(num < 10){
					return '0' + num;
				}
				return num;
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getList();
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.getList();
			},
			userType(){
				this.params = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					startTime: this.startTime,
					endTime: this.endTime,
					adName: this.adName,
				};
				if (this.accountType == 1) {
					this.params.advertiserId = this.advertiserId;
				};
			},
			getList(){
				this.userType();
				this.api.getN('getAdDataList',this.params).then((res)=>{
					this.loading = false;
					if(res.data.successed){
						this.list = res.data.returnValue.list;
						this.total = res.data.returnValue.total;
					}else{
						this.$message.error({
							message: res.data.errorCode,
							duration: Util.time()
						});
					}
				}).catch(()=>{
					this.loading = false;
					this.$message.error({
						message: '获取数据失败，请稍后重试',
						duration: Util.time()
					});
				});
			},
			getUserMessage(){//获取用户信息
				this.api.getN('account/getAccountInfo',{

				}).then((res)=>{
					if(res.data.successed){
						this.accountType = res.data.returnValue.accountType;
						if(res.data.returnValue.accountType == 1){
							this.getAdvertiserProxyList();
						}
						this.search();
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
		},
		created() {
			// this.getUserMessage();
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
