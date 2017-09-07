<template>
	<div id="login" class="wrapper">
		<!--  header  -->
		<div class="l-header">
			<a href="/">
				<img src="../../assets/images/bxmlogo.png" alt="" />
			</a>
		</div>
		<!--  body  -->
		<div class="l-container">
			<div class="l-container-in">
				<h2>注册成功!</h2>
				<router-link to="/login">
					前往登录>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		created() {


		},
		mounted() {

		}
	}
</script>

<style lang="less" scoped>
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
					font-size: 30px;
					text-align: center;
					line-height: 24px;
					font-weight: 100;
				}
				a{
					display: block;
					width: 100%;
					height: 36px;
					margin-top: 40px;
					color: #a0a0a0;
					font-size: 20px;
					text-align: center;
					line-height: 24px;
					font-weight: 100;
				}
			}
		}
	}
</style>
