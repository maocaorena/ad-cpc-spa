<template>
	<div id="ad-data" class="wrapper">
		<slide-bar :accountType="accountType" v-if="accountType != -11"></slide-bar>
			<h1>子账号管理</h1>
			<div class="container" v-loading.body="loading" element-loading-text="拼命加载中">
				<div class="search-bar">
					<div class="search-bar-item">
						<el-input v-model="keywords" placeholder="公司名称"></el-input>
					</div>
					<div class="search-bar-item">
						<button @click="search">查询</button>
					</div>
					<div class="search-bar-item">
						<button @click="add">新增</button>
					</div>
				</div>
				<div class="list-wrapper">
					<div class="t-tit">
						<table class="list">
							<colgroup>
								<col width="6">
								<!--广告ID-->
								<col width="15">
								<!--广告名称-->
								<col width="21">
								<!--广告主-->
								<col width="12">
								<!--单价-->
								<col width="8">
								<!--日预算-->
								<col width="15">
								<!--状态-->
								<col width="20">
								<!--操作-->
								<col width="13">
							</colgroup>
							<thead>
								<tr class="list-tit">
									<th>编号</th>
									<th>公司名称</th>
									<th>邮箱</th>
									<th>手机号</th>
									<th>联系人</th>
									<th>营业执照注册号</th>
									<th>公司地址</th>
									<th>创建时间</th>
								</tr>
							</thead>
						</table>
					</div>
					<div class="list-container">
						<table class="list">
							<colgroup>
								<!-- 编号 -->
								<col width="6">
								<!--公司名称-->
								<col width="15">
								<!--邮箱-->
								<col width="21">
								<!--手机号-->
								<col width="12">
								<!--联系人-->
								<col width="8">
								<!--营业执照注册号-->
								<col width="15">
								<!--公司地址-->
								<col width="20">
								<!--创建时间-->
								<col width="13">
							</colgroup>
							<tbody class="list-con">
								<tr v-for="item of list" class="list-con-item">
									<!--编号-->
									<td>{{item.id}}</td>
									<!--公司名称-->
									<td>{{item.company}}</td>
									<!--邮箱-->
									<td>{{item.email}}</td>
									<!--手机号-->
									<td>{{item.mobile}}</td>
									<!--联系人-->
									<td>{{item.linkman}}</td>
									<!--营业执照注册号-->
									<td>{{item.businessLicenseNo}}</td>
									<!--公司地址-->
									<td>{{item.address}}</td>
									<!-- 创建时间 -->
									<td>{{item.created | cutTime}}</td>
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
		<transition name="alert-fade">
			<addaccount v-if="addState" v-on:close="add" v-on:yes="getList"></addaccount>
		</transition>
	</div>
</template>

<script>
import slideBar from "../../components/slidebar.vue";
import addAccount from "../../components/addAccount.vue";
import { Util } from '../../lib/util.js';
export default {
	data() {
		return {
			keywords: '',//搜索关键字
			pageNum: 1,//页码
			pageSize: 10,//每页数量
			total: 1,//总条数
			currentPage3: 1,//默认第几页
			loading: false,//控制loading动画
			addState: false,//添加账号弹窗状态
			list: [],//列表
			accountType: -11,
		}
	},
	filters: {
		cutTime: function (value) {
			if(value){
				return value.slice(0,16);
			}else{
				return value;
			}
		}
	},
	components: {
		"slide-bar": slideBar,
		"addaccount": addAccount,
	},
	methods: {
		submitSet(message){
			this.changeAlert();
		},
		add(){
			this.addState = !this.addState;
		},
		search(){
			this.pageNum = 1;
			this.getList();
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
			this.api.getN('account/getAdvertiserProxyPagingList',{
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				keywords: this.keywords,
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
		// this.open4()
		// this.getUserMessage()
		// this.search();
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
