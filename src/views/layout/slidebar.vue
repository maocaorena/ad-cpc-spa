<template>
	<div class="slide-bar">
		<div class="top-logo">
			<img src="../../assets/images/bxm-logo.png" alt="" />
		</div>
		<ul class="slider-list">
			<li class="slider-item">
				<router-link to="/layout/ad" class="slider-togo">
					<i class="iconfont icon-operate"></i>
					<span>广告数据</span>
				</router-link>
			</li>
			<li class="slider-item">
				<router-link to="/layout/finance" class="slider-togo">
					<i class="iconfont icon-operate"></i>
					<span>财务数据</span>
				</router-link>
			</li>
			<li class="slider-item">
				<router-link to="/layout/adadmin" class="slider-togo">
					<i class="iconfont icon-interlinkage"></i>
					<span>广告管理</span>
				</router-link>
			</li>
			<li class="slider-item">
				<router-link to="/layout/childaccount" class="slider-togo">
					<i class="iconfont icon-interface"></i>
					<span>子账号管理</span>
				</router-link>
			</li>

		</ul>
		<ul class="slider-list-bottom">
			<li class="list-bottom-item">
				<router-link to="/layout/account" class="bottom-togo" active-class="bselected">
					<i class="iconfont icon-account"></i>
					<span>账号</span>
				</router-link>
			</li>
			<li class="list-bottom-item">
				<router-link to="/login" class="bottom-togo">
					<i class="iconfont icon-close"></i>
					<span>退出</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import { Util } from '../../lib/util.js';
	export default{
		data(){
			return{
				sliderState : ""
			}
		},
		watch:{
			'$route' (to, from) {
	            this.leftType();
	        }
		},
		methods:{
			leftType(){
				let urls = [];
				if(this.accountType == 1){
					urls = ["ad","finance","account","adadmin","childaccount"]
				}else{
					urls = ["ad","finance","account"]
				};
				let thisPath = window.location.pathname;;
				for(let i = 0; i < urls.length; i++){
					if(thisPath.indexOf(urls[i]) > 0){
						this.sliderState = urls[i]
					}
				};
			}
		},
		created(){
			this.leftType();
		}
	}
</script>

<style lang="scss" scoped>
	.slide-bar{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;
		width: 150px;
		height: 100%;
		background: #252528;
		.top-logo{
			width: 100%;
			height: 66px;
			background: #050505;
			text-align: center;
			line-height: 66px;
			img{
				display: inline-block;
				vertical-align: middle;
			}
		}
		.slider-list{
			padding: 10px 0 0;
		}
		.slider-item{
			width: 100%;
			height: 55px;
		}
		.slider-togo{
			display: inline-block;
			width: 100%;
			height: 100%;
			line-height: 55px;
			text-align: center;
			color: #999999;
			font-size: 14px;
			.iconfont{
				font-size: 20px;
				position: relative;
				top: 3px;
				right: 3px;
			}
		}
		.router-link-active{
			background: #3d3d3f;
			color: #fff;
		}
		.slider-list-bottom{
			position: absolute;
			bottom: 10px;
			left: 0;
			width: 100%;
			height: 70px;
			.iconfont{
				position: relative;
				top: 1px;
				right: 3px;
			}
		}
		.list-bottom-item{
			width: 100%;
			height: 35px;
		}
		.bottom-togo{
			display: inline-block;
			width: 100%;
			height: 100%;
			text-align: center;
			line-height: 35px;
			color: #999999;
			font-size: 14px;
		}
		.bselected{
			background: #3d3d3f;
			color: #ff740d;
		}
	}
</style>
//毛涵是傻吊
