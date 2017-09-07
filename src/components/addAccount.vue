<template>
    <div class="alertSetting">
        <div class="alertSetting-in">
            <div class="alertSetting-tit">
                <p class="alertSetting-name">新增子账号</p>
            </div>
            <div class="r-container-in">
                <div class="border">
                    <p class="must">*</p>
                    <i class="iconfont icon-zhanghao"></i>
                    <input class="num" type="text" placeholder="请输入邮箱" @blur="emailCheck" @input="emailCheckInput" v-model="registerMessage.email" />
                    <p class="prompt-message" v-if="!registerMessageState.emailState">{{registerMessageText.emailText}}</p>
                </div>
                <div class="border">
                    <i class="iconfont icon-mima"></i>
                    <p class="must">*</p>
                    <input class="password" type="password" placeholder="请输入密码，6~16个字符，区分大小写" @blur="passWordCheck" @input="passWordCheckInput" v-model="registerMessage.passWord" />
                    <p class="prompt-message" v-if="!registerMessageState.passWordState">{{registerMessageText.passWordText}}</p>
                </div>
                <div class="border">
                    <p class="must">*</p>
                    <i class="iconfont icon-mima"></i>
                    <input class="password" type="password" placeholder="请确认密码" @blur="passWordAginCheck" @input="passWordAginCheckInput" v-model="registerMessage.passWordAgin" />
                    <p class="prompt-message" v-if="!registerMessageState.passWordAginState">{{registerMessageText.passWordAginText}}</p>
                </div>
                <div class="border">
                    <p class="must">*</p>
                    <i class="iconfont icon-gongsi"></i>
                    <input class="password" type="text" placeholder="请输入公司完整名称" @blur="companyNameCheck" @input="companyNameCheckInput" v-model="registerMessage.companyName" />
                    <p class="prompt-message" v-if="!registerMessageState.companyNameState">{{registerMessageText.companyNameText}}</p>
                </div>
                <div class="border">
                    <p class="must">*</p>
                    <i class="iconfont icon-ad"></i>
                    <input class="password" type="text" placeholder="请输入公司详细地址" @blur="companyAddrCheck" @input="companyAddrCheckInput" v-model="registerMessage.companyAddr" />
                    <p class="prompt-message" v-if="!registerMessageState.companyAddrState">{{registerMessageText.companyAddrText}}</p>
                </div>
                <div class="border">
                    <p class="must">*</p>
                    <i class="iconfont icon-ad"></i>
                    <input class="password" type="text" placeholder="请输入营业执照注册号" @blur="companyNumCheck" @input="companyNumCheckInput" v-model="registerMessage.companyNum" />
                    <p class="prompt-message" v-if="!registerMessageState.companyNumState">{{registerMessageText.companyNumText}}</p>
                </div>
                <div class="border imgBorder" v-loading.body="loading">
                    <p class="must">*</p>
                    <i class="iconfont icon-yanzhengma"></i>
                    <div class="img-message">
                        <p class="img-name">{{upImageName}}</p>
                        <div class="up-btns">
                            <a href="javascripy:;" class="up-btn"v-show="showLook" @click="lookPic">
                                查看
                            </a>
                            <label class="up-btn" for="upfile">
                                {{upBtnTxt}}
                            </label>
                        </div>
                        <input type="file" id="upfile" name="fileToUpload" class="fileToUpload" @change="upImg" accept="image/jpg,image/jpeg,image/png" />
                    </div>
                    <p class="prompt-message" v-show="isUpPic">请上传营业执照</p>
                </div>
                <div class="border">
                    <i class="iconfont icon-xingming"></i>
                    <input class="password" type="text" placeholder="请输入联系人" @blur="userNameCheck" @input="userNameCheckInput" v-model="registerMessage.userName" />
                    <p class="prompt-message" v-if="!registerMessageState.userNameState">{{registerMessageText.userNameText}}</p>
                </div>
                <div class="border">
                    <i class="iconfont icon-dianhua1"></i>
                    <input class="password" type="text" placeholder="请输入手机号码" @blur="phoneNumCheck" @input="phoneNumCheckInput" v-model="registerMessage.phoneNum" />
                    <p class="prompt-message" v-if="!registerMessageState.phoneNumState">{{registerMessageText.phoneNumText}}</p>
                </div>
            </div>
            <div class="alertSetting-footer">
                <div class="footer-right">
                    <button class="blue" @click="submitMessage" v-if="registerBtn">提交</button>
                    <button class="blue gray" v-if="!registerBtn">提交</button>
                    <button class="border-btn" @click="close">返回</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import { Util } from '../lib/util.js';
import { md } from '../lib/md5.js';
export default{
    props: [
        "goNext",
    ],
    data(){
        return{
            data: null,
            showAgree: false,
            upImgUrl: '',//营业执照图片链接
            registerBtn: false,
            isUpPic: false,
            upImageName: '请上传营业执照',
            emailAgo:null,
            showLook:false,//查看按钮是否显示
            upBtnTxt: '浏览',//上传按钮文字
            loading: false,
            registerMessage: {
                email: '',
                passWord: '',
                passWordAgin: '',
                companyName: '',
                companyAddr: '',
                companyNum: '',
                userName: '',
                phoneNum: '',
            },
            registerMessageState: {
                emailState: false,
                passWordState: false,
                passWordAginState: false,
                companyNameState: false,
                companyAddrState: false,
                companyNumState: false,
                userNameState: true,
                phoneNumState: true,
            },
            registerMessageText: {
                emailText: '',
                passWordText: '',
                passWordAginText: '',
                companyNameText: '',
                companyAddrText: '',
                companyNumText: '',
                userNameText: '',
                phoneNumText: '',
            }
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
        submitMessage(){
            // this.$emit('submitMessage', JSON.parse(JSON.stringify(this.data)))
            this.goRegister();
        },
        //注册
        goRegister(){
            if(this.upImgUrl.length < 1){
                this.isUpPic = true;
            }else{
                let reghisterMessage = {};
                reghisterMessage.email = this.registerMessage.email;
                reghisterMessage.mobile = this.registerMessage.phoneNum;
                reghisterMessage.linkman = this.registerMessage.userName;
                reghisterMessage.company = this.registerMessage.companyName;
                reghisterMessage.address = this.registerMessage.companyAddr;
                reghisterMessage.businessLicenseNo = this.registerMessage.companyNum;
                reghisterMessage.businessLicenseImg = this.upImgUrl;
                reghisterMessage.password = md.md5(Util.trim(this.registerMessage.passWord));
                reghisterMessage.repassword = md.md5(Util.trim(this.registerMessage.passWordAgin));
                console.log(reghisterMessage);
                this.loading = true;
                this.api.postN('account/addProxy',reghisterMessage).then((res)=>{
                    console.log(res)
                    this.loading = false;
                    if(res.data.successed){
                        this.$message.success({
                            message: '添加成功',
                            duration: Util.time()
                        });
                        this.$emit('yes','');
                        this.close();
                    }else{
                        this.$message.error({
                            message: res.data.errorCode,
                            duration: Util.time()
                        });
                    }
                });
            };
        },
        //查看图片
        lookPic(){
            window.open(this.upImgUrl);
        },
        //上传图片
        upImg() {
            let that = this;
            let reader = new FileReader();
            let input = document.getElementById("upfile");
            let files = input.files;
            if(!/image\/\w+/.test(files[0].type)) {
            } else {
                reader.readAsDataURL(files[0]);
                reader.onload = function() {
                    let param = new FormData();
                    param.append('file',files[0],files[0].name);
                    that.loading = true;
                    that.api.postUp('upload', param).then((data)=>{
                        that.loading = false;
                        let res = data.data;
                        if(res.successed) {
                            that.upImageName = files[0].name;
                            that.upImgUrl = res.returnValue[0];
                            that.showLook = true;
                            that.upBtnTxt = '更改';
                            that.isUpPic = false;
                        }else{
                            that.$message.error({
        						message: '上传失败，请重试',
        						duration: Util.time()
        					});
                        }
                    }).catch((error)=>{
                        console.log(error);
                        that.loading = false;
                        that.$message.error({
                            message: '上传失败，请重试',
                            duration: Util.time()
                        });
                    });
                };
            };
        },
        //邮箱验证
        emailCheck() {
            let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(this.emailAgo !== this.registerMessage.email){
                if(this.registerMessage.email.length < 1) {
                    this.registerMessageState.emailState = false;
                    this.registerMessageText.emailText = '请填写邮箱';
                } else if(!myreg.test(this.registerMessage.email)) {
                    this.registerMessageState.emailState = false;
                    this.registerMessageText.emailText = '邮箱格式错误';
                } else {
                    this.api.ajaxPost('checkEmail', {
                        email: this.registerMessage.email
                    }, function(res) {
                        if(res.data.success){
                            this.registerMessageState.emailState = true;
                        }else{
                            this.registerMessageState.emailState = false;
                            this.registerMessageText.emailText = '邮箱已注册';
                        }
                    });
                };
                this.allCheck();
            };
            this.emailAgo = this.registerMessage.email;
        },
        emailCheckInput() {
            let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(myreg.test(this.registerMessage.email)) {
                this.registerMessageState.emailState = true;
            };
            this.allCheck();
        },
        //密码验证
        passWordCheck() {
            let pwLength = this.registerMessage.passWord.length;
            if(pwLength < 1) {
                this.registerMessageState.passWordState = false;
                this.registerMessageText.passWordText = '请输入密码';
            } else if(16 < pwLength || pwLength < 6) {
                this.registerMessageState.passWordState = false;
                this.registerMessageText.passWordText = '请输入6~16位密码';
            } else {
                this.registerMessageState.passWordState = true;
            };
            if(this.registerMessage.passWordAgin.length > 0){
                this.passWordAginCheck()
            };
            this.allCheck();
        },
        passWordCheckInput() {
            let pwLength = this.registerMessage.passWord.length;
            if(6 <= pwLength && pwLength <= 16) {
                this.registerMessageState.passWordState = true;
            };
            this.allCheck();
        },
        //确认密码验证
        passWordAginCheck() {
            let pwaLength = this.registerMessage.passWordAgin.length;
            if(pwaLength < 1) {
                this.registerMessageState.passWordAginState = false;
                this.registerMessageText.passWordAginText = '请确认密码';
            } else if(this.registerMessage.passWordAgin !== this.registerMessage.passWord) {
                this.registerMessageState.passWordAginState = false;
                this.registerMessageText.passWordAginText = '两次密码不相同';
            } else {
                this.registerMessageState.passWordAginState = true;
            };
            this.allCheck();
        },
        passWordAginCheckInput() {
            if(this.registerMessage.passWordAgin === this.registerMessage.passWord) {
                this.registerMessageState.passWordAginState = true;
            };
            this.allCheck();
        },
        //公司名称验证
        companyNameCheck() {
            let cnLength = this.registerMessage.companyName.length;
            if(cnLength < 1) {
                this.registerMessageState.companyNameState = false;
                this.registerMessageText.companyNameText = '请输入公司完整名称';
            } else {
                this.registerMessageState.companyNameState = true;
            };
            this.allCheck();
        },
        companyNameCheckInput() {
            if(this.registerMessage.companyName.length >= 1) {
                this.registerMessageState.companyNameState = true;
            };
            this.allCheck();
        },
        //公司地址验证
        companyAddrCheck() {
            let caLength = this.registerMessage.companyAddr.length;
            if(caLength < 1) {
                this.registerMessageState.companyAddrState = false;
                this.registerMessageText.companyAddrText = '请输入公司详细地址';
            } else {
                this.registerMessageState.companyAddrState = true;
            };
            this.allCheck();
        },
        companyAddrCheckInput() {
            if(this.registerMessage.companyAddr.length >= 1) {
                this.registerMessageState.companyAddrState = true;
            };
            this.allCheck();
        },
        //公司营业执照注册号验证
        companyNumCheck() {
            let cnmLength = this.registerMessage.companyNum.length;
            if(cnmLength < 1) {
                this.registerMessageState.companyNumState = false;
                this.registerMessageText.companyNumText = '请输入营业执照注册号';
            } else if(cnmLength !== 15 && cnmLength !== 18) {
                this.registerMessageState.companyNumState = false;
                this.registerMessageText.companyNumText = '请输入正确营业执照注册号';
            } else {
                this.registerMessageState.companyNumState = true;
            };
            this.allCheck();
        },
        companyNumCheckInput() {
            let cnmLength1 = this.registerMessage.companyNum.length;
            if(cnmLength1 === 15 || cnmLength1 === 18) {
                this.registerMessageState.companyNumState = true;
            };
            this.allCheck();
        },
        //姓名验证
        userNameCheckInput() {
            let unLength = this.registerMessage.userName.length;
            this.registerMessageState.userNameState = true;
            this.allCheck();
        },
        //手机号验证
        phoneNumCheck() {
            let pnLength = this.registerMessage.phoneNum.length;
            if(pnLength > 0){
                if(!(/^1[3|4|5|7|8]\d{9}$/.test(this.registerMessage.phoneNum))) {
                    this.registerMessageState.phoneNumState = false;
                    this.registerMessageText.phoneNumText = '请输入正确手机号码';
                } else {
                    this.registerMessageState.phoneNumState = true;
                };
            }else{
                this.registerMessageState.phoneNumState = true;
            }
            this.allCheck();
        },
        phoneNumCheckInput() {
            let unLength = this.registerMessage.phoneNum.length;
            if(unLength > 0){
                if((/^1[3|4|5|7|8]\d{9}$/.test(this.registerMessage.phoneNum))) {
                    this.registerMessageState.phoneNumState = true;
                };
            }else{
                this.registerMessageState.phoneNumState = true;
            }
            this.allCheck();
        },
        allCheck() {
            for(let i in this.registerMessageState) {
                if(!this.registerMessageState[i]) {
                    this.registerBtn = false;
                    return;
                }
            };
            this.registerBtn = true;
        },
    },
    created(){
        console.log('hhhhhhh')
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
        width: 700px;
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
                    .border-btn{
                        border: 1px solid #c4c4c4;
                        background: #fff;
                    }
                    .gray{
                        background: #ccc;
                    }
                }
            }
        }
    }
    .r-container-in{
        width: 330px;
        margin: 0 auto;
    }
    .border {
        width: 100%;
        height: 40px;
        margin-top: 13px;
        position: relative;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 3px;
        .must{
            position: absolute;
            left: -20px;
            top: 0;
            height: 40px;
            line-height: 40px;
            color: red;
        }
        input {
            width: 100%;
            height: 38px;
            padding-left: 36px;
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
            bottom: 8px;
            left: 15px;
            font-size: 16px;
            color: #a7a7a7;
        }
    }
    .imgBorder{
        border: 1px solid #e0e0e0;
        border-radius: 3px;
    }
    .img-message {
        width: 100%;
        height: 38px;
        line-height: 40px;
        color: #a7a7a7;
    }
    #upfile {
        display: none;
    }
    .img-name {
        float: left;
        width: 167px;
        height: 38px;
        margin-left: 36px;
        line-height: 38px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
    }
    .up-btns {
        float: left;
        width: 115px;
        height: 38px;
        text-align: right;
        font-size: 14px;
        line-height: 38px;
    }
    .up-btn {
        display: inline-block;
        width: 54px;
        height: 28px;
        text-align: center;
        line-height: 28px;
        border-radius: 3px;
        cursor: pointer;
        color: #fff;
        background: #ff9827;
        font-size: 14px;
    }
    .prompt-message {
        position: absolute;
        right: -190px;
        top: 0;
        width: 180px;
        height: 40px;
        line-height: 36px;
        font-size: 12px;
        color: #ff1111;
    }

}
</style>

</style>
