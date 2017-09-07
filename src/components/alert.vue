<template>
    <div class="alertSetting">
        <div class="alertSetting-in" v-loading.body="loading">
            <div class="alertSetting-tit">
                <p class="alertSetting-name">设置单价</p>
            </div>
            <div class="alertSetting-container">
                <div class="ac-item">
                    <p class="left">广告ID：</p>
                    <p class="right">{{data.adId}}</p>
                </div>
                <div class="ac-item">
                    <p class="left">广告名称：</p>
                    <p class="right">{{data.adName}}</p>
                </div>
                <div class="ac-item">
                    <p class="left">广告主：</p>
                    <p class="right">{{data.advertiserName}}</p>
                </div>
                <div class="ac-item">
                    <p class="left">{{goNext.type==1?'单价':'日预算'}}：</p>
                    <p class="right" v-if="goNext.type === 1">
                        <el-input-number v-model="data.price" :min="0" :controls="false"></el-input-number> &nbsp 元
                        <!-- <input v-model="data.price" type="text"> &nbsp 元 -->
                    </p>
                    <p class="right" v-if="goNext.type === 2">
                        <el-input-number v-model="data.dailyBudget" :min="0" :step="100" :controls="false"></el-input-number> &nbsp 元
                        <!-- <input v-model="data.dailyBudget" type="text"> &nbsp 元 -->
                    </p>
                </div>
            </div>
            <div class="alertSetting-footer">
                <div class="footer-right">
                    <button class="blue" @click="submitMessage">提交</button>
                    <button class="border" @click="close">返回</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import { Util } from '../lib/util.js'
export default{
    props: [
        "goNext",
    ],
    data(){
        return{
            data: null,
            loading: false,
        }
    },
    computed: {
        fullpage: function () {
            return {
                alertSettingWindow: !this.fullPage,
                alertSettingFullPage: this.fullPage,
            }
        },
    },
    methods:{
        close(){
            this.$emit('close', '')
        },
        handleCurrentChange(val){
            this.$emit('handdleCurrent', val)
        },
        submitMessage(){
            let _url = '',
            params = {},
            kk = null;
            switch (this.goNext.type) {
                case 1://修改单价
                    _url = 'updatePrice';
                    params = {
                        adId: this.data.adId,
                        price: this.data.price,
                    };
                    kk = parseFloat(this.data.price);
                    break
                case 2://修改日预算
                    _url = 'updateDailyBudget';
                    params = {
                        adId: this.data.adId,
                        dailyBudget: this.data.dailyBudget,
                    };
                    kk = parseFloat(this.data.dailyBudget);
                    break
                default:
                    break
            };
            if( parseFloat(kk) <= 0 ){
                this.$message({
                    message: "请输入大于0的数值",
                    duration: 3000
                });
                return;
            };
            this.loading = true;
			this.api.putN(_url,params).then((res)=>{
				this.loading = false;
				if(res.data.successed){
                    this.$message.success({
						message: '修改成功！',
						duration: Util.time()
					});
                    this.$emit('submitMessage', '')
				}else{
                    this.$message.error({
						message: res.data.errorCode,
						duration: Util.time()
					});
				}
			})
        }
    },
    created(){
        this.data = this.goNext.message;
    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
.alertSetting:after{
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
}
.alertSetting{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    @at-root .alertSetting-in{
        width: 500px;
        text-align: left;
        display: inline-block;
        vertical-align: middle;
        border-radius: 3px;
        font-size: 16px;
        overflow: hidden;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        background: #fff;
        @at-root{
            .alertSetting-tit{
                padding: 20px 20px 0;
                width: 100%;
                color: #333;
                .alertSetting-name{
                    width: 50%;
                    height: 100%;
                    text-align: left;
                    font-weight: 900;
                }
            }
            .alertSetting-container{
                padding: 20px;
                width: 100%;
                height: 100%;
                overflow: auto;
                @at-root .ac-item{
                    width: 100%;
                    padding: 5px 10px;
                    color: #48576a;
                    font-size: 14px;
                    .left{
                        display: inline-block;
                        width: 80px;
                        text-align: right;
                    }
                    .right{
                        display: inline-block;
                        padding-left: 5px;
                    }
                    input{
                        padding: 3px 10px;
                        width: 90px;
                        height: 30px;
                        border: 1px solid #bfcbd9;
                        color: #1f2d3d;
                        border-radius: 4px;
                        outline: none;
                        -webkit-transition: border-color 0.2s linear;
                        -o-transition: border-color 0.2s linear;
                        transition: border-color 0.2s linear;
                    }
                    input:hover{
                        border-color: #8391a5;
                    }
                    input:focus{
                        border-color: #20a0ff;
                    }
                }
            }
            .alertSetting-footer{
                width: 100%;
                height: 60px;
                .footer-right{
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    button{
                        margin: 7px 10px 0;
                        padding: 10px 30px;
                        cursor: pointer;
                        border-radius: 4px;
                        background: #fff;
                        color: #1f2d3d;
                    }
                    .blue{
                        background: #20a0ff;
                        color: #fff;
                    }
                    .border{
                        border: 1px solid #c4c4c4;
                        background: #fff;
                    }
                }
            }
        }
    }
}
</style>

</style>
