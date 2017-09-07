<template>
	<div id="ad-pay" class="wrapper">
			<h1>财务数据</h1>
			<div class="earnings-list">
				<div class="earings-item" v-if="accountInfo.accountType != 2">
					<p class="top">账户余额（元）</p>
					<p class="bottom">{{balance}}</p>
				</div>
				<div class="earings-item border1">
					<p class="top">日预算（元）</p>
					<p class="bottom color1">{{dailyBudget}}</p>
				</div>
				<div class="earings-item">
					<p class="top">今日消耗（元）</p>
					<p class="bottom color1">{{todayConsume}}</p>
				</div>
			</div>
			<div class="bxm" v-if="accountInfo.accountType == 1 || accountInfo.accountType == 0">
				<h4>账户余额充值转账</h4>
				<p>
					<span>户名：</span><span>杭州微财网络科技有限公司</span>
				</p>
				<p>
					<span>开户银行：</span><span>杭州银行城西支行</span>
				</p>
				<p>
					<span>银行账号：</span><span>3301040160005685659</span>
				</p>
			</div>
			<div class="container" :class="[{container2:accountInfo.accountType == 2},{container1:accountInfo.accountType != 2}]" v-loading.body="loading" element-loading-text="拼命加载中">
				<div class="search-bar">
					<div class="search-bar-item width2">
						<el-date-picker v-model="value7" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2">
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
								<!--日期-->
								<col width="30">
								<!--存入-->
								<col width="25" v-if="accountInfo.accountType!=2">
								<!--支出-->
								<col width="25">
								<!--备注-->
								<col width="30" v-if="accountInfo.accountType!=2">

							</colgroup>
							<thead>
								<tr class="list-tit">
									<th>日期</th>
									<th v-if="accountInfo.accountType!=2">存入</th>
									<th>支出</th>
									<th v-if="accountInfo.accountType!=2">备注</th>
								</tr>
							</thead>
						</table>
					</div>
					<div class="list-container">
						<table class="list">
							<colgroup>
								<!--日期-->
								<col width="30">
								<!--存入-->
								<col v-if="accountInfo.accountType != 2" width="25">
								<!--支出-->
								<col width="25">
								<!--备注-->
								<col v-if="accountInfo.accountType != 2" width="30">

							</colgroup>
							<tbody class="list-con">
								<tr v-for="item of list" class="list-con-item">
									<!--日期-->
									<td>{{item.created}}</td>
									<!--存入-->
									<td v-if="accountInfo.accountType != 2">{{item.income}}</td>
									<!--支出-->
									<td>{{item.expenditure}}</td>
									<!--备注-->
									<td v-if="accountInfo.accountType != 2">{{item.remark}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="page">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="this.pageSize" layout="prev, pager, next, jumper" :total="this.total">
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
				value7: [new Date(Date.now()-86400000), new Date()],//开始结束时间,默认前一天到今天
				currentPage3: 1,//默认第几页
				loading: false,//控制loading动画
				pageNum: 1,//页码
				pageSize: 10,//每页数量
				list: [],//列表
				startTime: '',//开始时间毫秒
				endTime: '',//结束时间毫秒
				todayConsume: '加载中',//今日消耗
				total: 1,
				accountInfo: {
					accountType: -11,
				},
				dailyBudget: '加载中',
				balance: '加载中',
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
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.getList();
			},
			getList(){
				this.loading = true;
				let that = this;
				this.api.ajax('finance',{
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					startTime: this.startTime,
					endTime: this.endTime,
				},function(res){
					that.loading = false;
					if(res.data.successed){
						that.list = res.data.returnValue.list;
						that.total = res.data.returnValue.total;
					}else{
						that.$message.error({
							message: res.data.errorCode,
							duration: Util.time()
						});
					}
				},function(){
					that.loading = false;
					that.$message.error({
						message: '获取数据失败，请稍后重试',
						duration: Util.time()
					});
				})
			},
			getTodayConsume(){
				let that = this;
				this.api.ajax('getTodayConsume',{
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					startTime: this.startTime,
					endTime: this.endTime,
				},function(res){
					if(res.data.successed){
						that.todayConsume = res.data.returnValue
					}else{
						that.todayConsume = '无数据';
						that.$message.error({
							message: res.data.errorCode,
							duration: Util.time()
						});
					}
				},function(){
					that.todayConsume = '无数据';
				})
			},
			getAccountInfo(){//获取用户信息
				let that = this;
				this.api.ajax('account/getAccountInfo',{},function(res){
					if(res.data.successed){
						that.accountInfo = res.data.returnValue
					}else{
						that.$message.error({
							message: res.data.errorCode,
							duration: Util.time()
						});
					}
				},function(){
					that.$message.error({
						message: '获取数据失败，请稍后重试',
						duration: Util.time()
					});
				})
			},
			getDailyBudgetAndBalance(){//获取余额，限额
				let that = this;
				this.api.ajax('finance/getDailyBudgetAndBalance',{},function(res){
					if(res.data.successed){
						that.dailyBudget = res.data.returnValue.dailyBudget;
						that.balance = res.data.returnValue.balance;
					}else{
						that.$message.error({
							message: res.data.errorCode,
							duration: Util.time()
						});
					}
				},function(){
					that.$message.error({
						message: '获取数据失败，请稍后重试',
						duration: Util.time()
					});
				})
			},
		},
		created() {
			// this.getDailyBudgetAndBalance();
			// this.getTodayConsume();
			// this.getAccountInfo();
			// this.search();
		}
	}
</script>

<style lang="scss">
	#ad-pay {
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
		.earnings-list {
			width: 100%;
			height: 104px;
			padding: 23px 0;
			border: 1px solid #dbdbdb;
			background: #f4f4f4;
		}
		.earings-item {
			float: left;
			width: 33.3%;
			height: 100%;
			p {
				text-indent: 20%;
			}
			.top {
				font-size: 16px;
				color: #666666;
				line-height: 14px;
			}
			.bottom {
				font-size: 28px;
				color: #ff740d;
				line-height: 60px;
			}
			.color1 {
				color: #ffaf10;
			}
		}
		.border1 {
			border-left: 1px solid #e0e0e0;
			border-right: 1px solid #e0e0e0;
		}
		.container{
			-webkit-transition: top 0.1s linear;
			-o-transition: top 0.1s linear;
			transition: top 0.1s linear;
		}
		.container1{
			top: 305px;
		}
		.container2{
			top: 185px;
		}
		.bxm{
			margin-top: 10px;
			padding: 15px 30px;
			width: 100%;
		    border: 1px solid #dbdbdb;
		    background: #f4f4f4;
			h4{
				margin-bottom: 5px;
				color: #333;
			}
			p{
				font-size: 14px;
				color: #666;
			}
		}
	}
</style>
