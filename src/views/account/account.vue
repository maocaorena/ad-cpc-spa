<template>
	<div id="user" class="wrapper">
		<slide-bar :accountType="accountInfo.accountType" v-if="accountInfo.accountType!=-11"></slide-bar>
			<h1>账号</h1>
			<div class="container">
				<div class="user-message">
					<div class="user-message-tit">
						账号信息
					</div>
					<div class="user-message-item">
						<p class="left">
							公司名称
						</p>
						<p class="right">
							{{accountInfo.company}}
						</p>
					</div>
					<div class="user-message-item">
						<p class="left">
							营业执照注册号
						</p>
						<p class="right">
							{{accountInfo.businessLicenseNo}}
						</p>
					</div>
					<div class="user-message-item">
						<p class="left">
							公司地址
						</p>
						<p class="right">
							{{accountInfo.address}}
						</p>
					</div>
					<div class="user-message-item">
						<p class="left">
							邮箱
						</p>
						<p class="right">
							{{accountInfo.email}}
						</p>
					</div>
					<div class="user-message-item height1">
						<p class="left">
							营业执照
						</p>
						<p class="right">
							<img :src="accountInfo.businessLicenseImg"/>
						</p>
					</div>
					<div class="user-message-item">
						<p class="left">
							联系人
						</p>
						<p class="right">
							{{accountInfo.linkman}}
						</p>
					</div>
					<div class="user-message-item">
						<p class="left">
							手机号
						</p>
						<p class="right">
							{{accountInfo.mobile}}
						</p>
					</div>
				</div>
				<div class="change-message" v-loading.body="loading" element-loading-text="请稍等">
					<div class="user-message-tit">
						修改密码
					</div>
					<div class="change-message-item">
						<p class="left">
							旧密码
						</p>
						<p class="right">
							<input placeholder="请输入旧密码" class="right-input" type="text" v-model="message.oldPassword" @blur="oCheck" @input="oCheckInput"/>
							<span class="prompt-message">{{tip.oldPasswordTip}}</span>
						</p>
					</div>
					<div class="change-message-item">
						<p class="left">
							新密码
						</p>
						<p class="right">
							<input placeholder="请输入新密码" class="right-input" type="password" v-model="message.newPassword" @blur="nCheck" @input="nCheckInput"/>
							<span class="prompt-message">{{tip.newPasswordTip}}</span>
						</p>
					</div>
					<div class="change-message-item">
						<p class="left">
							确认密码
						</p>
						<p class="right">
							<input placeholder="请确认新密码" class="right-input" type="password" v-model="message.rNewPassword" @blur="rCheck" @input="rCheckInput"/>
							<span class="prompt-message">{{tip.rNewPasswordTip}}</span>
						</p>
					</div>
					<div class="change-message-item">
						<p class="left">
						</p>
						<p class="right">
							<button @click="updatePassword"> 确认修改 </button>
						</p>
					</div>
				</div>
			</div>

	</div>
</template>

<script>
	import slideBar from "../../components/slidebar.vue";
	import { Util } from '../../lib/util.js';
	import { md } from '../../lib/md5.js';
	export default {
		data() {
			return {
				accountInfo: {
					accountType: -11,
				},
				message: {
					oldPassword: '',
					newPassword: '',
					rNewPassword: '',
				},
				state: {
					oldPasswordState: false,
					newPasswordState: false,
					rNewPasswordState: false,
				},
				tip: {
					oldPasswordTip: '',
					newPasswordTip: '',
					rNewPasswordTip: '',
				},
				loading: false,
			}
		},
		components: {
			"slide-bar": slideBar
		},
		methods: {
			//老密码验证
			oCheck() {
				let oLength = this.message.oldPassword.length;
				if(oLength < 1) {
					this.tip.oldPasswordTip = '请输入旧密码';
				} else if(16 < oLength || oLength < 6) {
					this.tip.oldPasswordTip = '请输入6~16位旧密码';
				} else {
					this.tip.oldPasswordTip = '';
				};
			},
			oCheckInput() {
				let oLength = this.message.oldPassword.length;
				if(6 <= oLength && oLength <= 16) {
					this.state.oldPasswordState = true;
					this.tip.oldPasswordTip = '';
				} else {
					this.state.oldPasswordState = false;
				};
			},
			//新密码验证
			nCheck() {
				let nLength = this.message.newPassword.length;
				if(nLength < 1) {
					this.tip.newPasswordTip = '请输入新密码';
				} else if(16 < nLength || nLength < 6) {
					this.tip.newPasswordTip = '请输入6~16位新密码';
				} else {
					this.tip.newPasswordTip = '';
				};

			},
			nCheckInput() {
				let nLength = this.message.newPassword.length;
				if(6 <= nLength && nLength <= 16) {
					this.state.newPasswordState = true;
					this.tip.newPasswordTip = '';
				} else {
					this.state.newPasswordState = false;
				};
			},
			//新密码确认
			rCheck() {
				let rLength = this.message.rNewPassword.length;
				if(rLength < 1) {
					this.tip.rNewPasswordTip = '请确认新密码';
				} else if(this.message.rNewPassword != this.message.newPassword) {
					this.tip.rNewPasswordTip = '两次密码不一致';
				} else {
					this.tip.rNewPasswordTip = '';
				};
			},
			rCheckInput() {
				let rLength = this.message.rNewPassword.length;
				if(rLength > 1 && this.message.rNewPassword == this.message.newPassword) {
					this.state.rNewPasswordState = true;
					this.tip.rNewPasswordTip = '';
				} else {
					this.state.rNewPasswordState = false;
				};
			},
			getAccountInfo(){
				let that = this;
				this.api.ajax('account/getAccountInfo',{},function(res){
					if(res.data.successed){
						that.accountInfo = res.data.returnValue
					}else{
						alert(res.data.errorCode)
					}
				},function(){
					Util.myAlert("获取数据失败");
				})
			},
			updatePassword(){
				if(!this.state.oldPasswordState){
					this.oCheck()
				}else if(!this.state.newPasswordState){
					this.nCheck()
				}else if(!this.state.rNewPasswordState){
					this.rCheck()
				}else{
					let that = this;
					that.loading = true;
					this.api.ajaxPost('account/updatePassword',{
						oldPassword : md.md5(Util.trim(this.message.oldPassword)),
						newPassword : md.md5(Util.trim(this.message.newPassword)),
						rNewPassword : md.md5(Util.trim(this.message.rNewPassword)),
					},function(res){
						that.loading = false;
						if(res.data.successed){
							alert('修改成功')
						}else{
							alert(res.data.errorCode)
						}
					})
				}
			},
		},
		created(){
			// this.getAccountInfo()
		}
	}
</script>

<style lang="scss">
	#user{
		width: 100%;
		height: 100%;
		background: #ebeced;
		h1 {
			padding-left: 24px;
			height: 65px;
			font-size: 20px;
			color: #333333;
			font-weight: 600;
			line-height: 65px;
		}
		.container {
			position: absolute;
			top: 66px;
			bottom: 10px;
			left: 12px;
			right: 12px;
			height: auto;
			overflow: auto;
		}
		.user-message{
			margin-bottom: 10px;
			padding: 10px 12px;
			background: #f4f4f4;
			width: 100%;
			min-width: 640px;
			height: 440px;
		}
		.user-message-tit{
			margin-bottom: 16px;
			padding-left: 32px;
			width: 100%;
			height: 32px;
			line-height: 32px;
			background: #eaeaea;
			color: #999999;
		}
		.user-message-item{
			padding-left: 32px;
			width: 100%;
			height: 28px;
			font-size: 14px;
			.left{
				float: left;
				width: 185px;
				color: #333333;
			}
			.right{
				float: left;
				color: #999999;
				img{
					max-width: 300px;
					max-height: 160px;
				}
			}
		}
		.height1{
			height: 177px;
		}
		.change-message{
			padding: 10px 12px;
			background: #f4f4f4;
			min-width: 640px;
			width: 100%;
			height: 233px;
		}
		.change-message-item{
			padding-left: 32px;
			width: 100%;
			height: 39px;
			font-size: 14px;
			.left{
				float: left;
				width: 185px;
				height: 100%;
				line-height: 39px;
				color: #333333;
			}
			.right{
				position: relative;
				height: 100%;
				line-height: 39px;
				float: left;
				color: #999999;
				button{
					width: 154px;
					height: 30px;
					line-height: 30px;
					background: #ff740d;
					color: #fff;
					cursor: pointer;
				}
			}
		}
		.prompt-message {
			display: block;
			position: absolute;
			right: -190px;
			top: 0;
			width: 180px;
			height: 40px;
			line-height: 36px;
			font-size: 12px;
			color: #ff1111;
		}
		.right-input{
			padding: 0 10px;
			width: 382px;
			height: 31px;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			outline: none;
			border: 1px solid #e0e0e0;
			border-radius: 3px;
			color: #a7a7a7;
			line-height: 36px;
			-webkit-transition: border-color 0.2s linear;
			-o-transition: border-color 0.2s linear;
			transition: border-color 0.2s linear;
		}
		.right-input:hover{
			border-color: #8391a5;
		}
		.right-input:focus {
			border-color: #ffa440;
		}
		input::-moz-placeholder {
			/* Mozilla Firefox 19+ */
			color: #a7a7a7;
		}
		input:-ms-input-placeholder {
			color: #a7a7a7;
		}
		input::-webkit-input-placeholder {
			color: #a7a7a7;
		}
	}
</style>
