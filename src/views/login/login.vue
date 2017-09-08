<template>
	<div id="login" class="wrapper">
		<!--  header  -->
		<div class="l-header">
			<a href="javascript:;">
				<img src="../../assets/images/bxmlogo.png" alt="" />
			</a>
		</div>
		<!--  body  -->
		<div class="l-container" v-loading.body="loading" element-loading-text="登录中...">
			<div class="l-container-in">
				<h2>广告主后台登录</h2>
				<div class="border">
					<i class="iconfont icon-zhanghao"></i>
					<input class="num" type="text" placeholder="请输入邮箱" @input="emailCheckInput" v-model="registerMessage.email" />
					<p class="prompt-message">{{registerMessageText.emailText}}</p>
				</div>
				<div class="border">
					<i class="iconfont icon-mima"></i>
					<input class="password" type="password" placeholder="请输入密码" @input="passWordCheckInput" v-model="registerMessage.passWord" />
					<p class="prompt-message">{{registerMessageText.passWordText}}</p>
				</div>
				<div class="border code-in">
					<i class="iconfont icon-yanzhengma"></i>
					<input class="code" type="text" placeholder="请输入图片验证码" @input="picCodeCheckInput" v-model="registerMessage.picCodeMessage" />
					<p class="prompt-message">{{registerMessageText.picCodeMessageText}}</p>
					<div class="code-true" @click="getPiccode">
						<img style="width: 100%;height: 100%;" :src="piccode" />
					</div>
				</div>
				<p class="loginTip">{{loginTip}}</p>
				<div class="login" @click="loginIn">
					登录
				</div>
				<div class="account-handle">
                    <router-link to="/register">
                        注册新用户 >
                    </router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { Util } from '../../lib/util.js';
	import { md } from '../../lib/md5.js';
	export default {
		data() {
			return {
				piccode: this.api.commonUrl() + "getImgValidate?width=200&height=80&is_create_interference_line=true&interference_line_num=0",
				registerMessage: {
					email: '',
					passWord: '',
					picCodeMessage: '',
				},
				registerMessageState: {
					emailState: false,
					passWordState: false,
					picCodeMessageState: false,
				},
				registerMessageText: {
					emailText: '',
					passWordText: '',
					picCodeMessageText: '',
				},
				loginTip:'',
				loading: false
			}
		},
		methods: {
			loginIn() {
                // this.$router.push({path:'/layout/ad'});
				// if(!this.registerMessageState.emailState) {
				// 	this.emailCheck();
				// } else if(!this.registerMessageState.passWordState) {
				// 	this.passWordCheck();
				// } else if(!this.registerMessageState.picCodeMessageState) {
				// 	this.picCodeCheck();
				// } else {
					let that = this;
					// this.loading = true;
					this.api.postN('award/activityInfo', {
						activityid:12167,
						uid:'42BA1671947CA7CBFF9515C5670A305F',
						appkey:123,
					}, function(res) {
						console.log(res)
						// that.loading = false;
						// if(res.data.successed){
						// 	window.location.href = '/ad.html';
						// }else{
						// 	that.loginTip = res.data.errorCode;
						// }
					})
				// }
			},
			//获取图片验证码
			getPiccode(event) {
				event.target.src = this.piccode + '&' + new Date().getTime();
			},
			//邮箱验证
			emailCheck() {
				let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(this.registerMessage.email.length < 1) {
					this.registerMessageText.emailText = '请填写邮箱';
				} else if(!myreg.test(this.registerMessage.email)) {
					this.registerMessageText.emailText = '邮箱格式错误';
				} else {
					this.registerMessageText.emailText = '';
				};
			},
			emailCheckInput() {
				let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(myreg.test(this.registerMessage.email)) {
					this.registerMessageState.emailState = true;
					this.registerMessageText.emailText = '';
				} else {
					this.registerMessageState.emailState = false;
				}
			},
			//密码验证
			passWordCheck() {
				let pwLength = this.registerMessage.passWord.length;
				if(pwLength < 1) {
					this.registerMessageText.passWordText = '请输入密码';
				} else if(16 < pwLength || pwLength < 6) {
					this.registerMessageText.passWordText = '请输入6~16位密码';
				} else {
					this.registerMessageText.passWordText = '';
				};

			},
			passWordCheckInput() {
				let pwLength = this.registerMessage.passWord.length;
				if(6 <= pwLength && pwLength <= 16) {
					this.registerMessageState.passWordState = true;
					this.registerMessageText.passWordText = '';
				} else {
					this.registerMessageState.passWordState = false;
				};
			},
			//图片验证码验证
			picCodeCheck() {
				let cLength = this.registerMessage.picCodeMessage.length;
				if(cLength < 1) {
					this.registerMessageText.picCodeMessageText = '请输入图片验证码';
				} else {
					this.registerMessageText.picCodeMessageText = '';
				};
			},
			picCodeCheckInput() {
				let cLength = this.registerMessage.picCodeMessage.length;
				if(cLength > 1) {
					this.registerMessageState.picCodeMessageState = true;
					this.registerMessageText.picCodeMessageText = '';
				} else {
					this.registerMessageState.picCodeMessageState = false;
				};
			},
		},
		created() {


		},
		mounted() {
			let that = this;
			document.onkeydown = function(e) {
				if(!e) {
					e = window.event;
				}
				if((e.keyCode || e.which) == 13) {
					that.loginIn()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	#login {
		background: url(../../assets/images/login-topbg.png) no-repeat 0 72px;
		-webkit-background-size: 100%;
		background-size: 100%;
		.l-header {
			width: 100%;
			height: 72px;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			border-bottom: 1px solid #ececec;
			background: rgba(255, 255, 255, 0.5);
			text-align: center;
			line-height: 72px;
			a {
				display: inline-block;
				width: 42px;
				height: 36px;
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 10px;
				margin: auto;
			}
		}
		.l-container {
			background: url(../../assets/images/login-bottombg.png) no-repeat bottom center;
			-webkit-background-size: 100%;
			background-size: 100%;
			width: 100%;
			height: 100%;
			position: relative;
			.l-container-in {
				width: 330px;
				height: 320px;
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				z-index: 10;
				margin: auto;
				h2 {
					width: 100%;
					height: 36px;
					color: #a0a0a0;
					font-size: 24px;
					text-align: center;
					line-height: 24px;
					font-weight: 100;
				}
				.border {
					width: 100%;
					height: 53px;
					padding-top: 13px;
					position: relative;
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
					input {
						width: 100%;
						height: 40px;
						padding-left: 36px;
						-webkit-box-sizing: border-box;
						-moz-box-sizing: border-box;
						box-sizing: border-box;
						outline: none;
						border: 0;
						border: 1px solid #e0e0e0;
						border-radius: 3px;
						color: #a7a7a7;
						line-height: 40px;
						-webkit-transition: border-color 0.2s linear;
			            -o-transition: border-color 0.2s linear;
			            transition: border-color 0.2s linear;
			        }
			        input:hover{
			            border-color: #8391a5;
			        }
					input:focus {
						border-color: #ffa440;
					}
					:-moz-placeholder {
						/* Mozilla Firefox 4 to 18 */
						color: #a7a7a7;
					}
					::-moz-placeholder {
						/* Mozilla Firefox 19+ */
						color: #a7a7a7;
					}
					input:-ms-input-placeholder {
						color: #a7a7a7;
					}
					input::-webkit-input-placeholder {
						color: #a7a7a7;
					}
					.iconfont {
						position: absolute;
						bottom: 10px;
						left: 15px;
						font-size: 16px;
						color: #a7a7a7;
					}
				}
				.prompt-message {
					position: absolute;
					right: -190px;
					top: 13px;
					width: 180px;
					height: 40px;
					line-height: 36px;
					font-size: 12px;
					color: #ff1111;
				}
				.code-in {
					padding-right: 96px;
					.code-true {
						cursor: pointer;
						width: 90px;
						height: 40px;
						position: absolute;
						right: 2px;
						bottom: 0;
						background: #ccc;
					}
				}
				.login {
					width: 100%;
					height: 70px;
					background: url(../../assets/images/sign_btn.png) no-repeat;
					color: #fff;
					border-radius: 3px;
					text-align: center;
					cursor: pointer;
					line-height: 40px;
					font-size: 14px;
				}
				.account-handle {
					width: 100%;
					height: 13px;
					text-align: center;
					a {
						font-size: 13px;
						color: #a0a0a0;
					}
					span {
						margin: 0 3px;
						color: #a0a0a0;
					}
				}
				.loginTip{
					width: 100%;
					height: 36px;
					line-height: 36px;
					font-size: 12px;
					color: #ff1111;
				}
			}
		}
	}
</style>
