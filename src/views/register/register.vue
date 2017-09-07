<template>
	<div id="register" class="wrapper">
		<!--  header  -->
		<div class="r-header">
			<a href="/">
				<img src="../../assets/images/bxmlogo.png" alt="" />
			</a>
		</div>
		<!--  body  -->
		<div class="r-container" v-loading.body="loading" element-loading-text="请稍等...">
			<div class="r-container-in">
				<h2>广告主后台注册</h2>
				<div class="border">
					<i class="iconfont icon-zhanghao"></i>
					<input class="num" type="text" placeholder="请输入邮箱" @blur="emailCheck" @input="emailCheckInput" v-model="registerMessage.email" />
					<p class="prompt-message" v-if="!registerMessageState.emailState">{{registerMessageText.emailText}}</p>
				</div>
				<div class="border">
					<i class="iconfont icon-mima"></i>
					<input class="password" type="password" placeholder="请输入密码，6~16个字符，区分大小写" @blur="passWordCheck" @input="passWordCheckInput" v-model="registerMessage.passWord" />
					<p class="prompt-message" v-if="!registerMessageState.passWordState">{{registerMessageText.passWordText}}</p>
				</div>
				<div class="border">
					<i class="iconfont icon-mima"></i>
					<input class="password" type="password" placeholder="请确认密码" @blur="passWordAginCheck" @input="passWordAginCheckInput" v-model="registerMessage.passWordAgin" />
					<p class="prompt-message" v-if="!registerMessageState.passWordAginState">{{registerMessageText.passWordAginText}}</p>
				</div>
				<div class="border">
					<i class="iconfont icon-gongsi"></i>
					<input class="password" type="text" placeholder="请输入公司完整名称" @blur="companyNameCheck" @input="companyNameCheckInput" v-model="registerMessage.companyName" />
					<p class="prompt-message" v-if="!registerMessageState.companyNameState">{{registerMessageText.companyNameText}}</p>
				</div>
				<div class="border">
					<i class="iconfont icon-ad"></i>
					<input class="password" type="text" placeholder="请输入公司详细地址" @blur="companyAddrCheck" @input="companyAddrCheckInput" v-model="registerMessage.companyAddr" />
					<p class="prompt-message" v-if="!registerMessageState.companyAddrState">{{registerMessageText.companyAddrText}}</p>
				</div>
				<div class="border">
					<i class="iconfont icon-ad"></i>
					<input class="password" type="text" placeholder="请输入营业执照注册号" @blur="companyNumCheck" @input="companyNumCheckInput" v-model="registerMessage.companyNum" />
					<p class="prompt-message" v-if="!registerMessageState.companyNumState">{{registerMessageText.companyNumText}}</p>
				</div>
				<div class="border imgBorder">
					<i class="iconfont icon-yanzhengma"></i>
					<div class="img-message" v-loading.body="uploading">
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
					<input class="password" type="text" placeholder="请输入姓名" @blur="userNameCheck" @input="userNameCheckInput" v-model="registerMessage.userName" />
					<p class="prompt-message" v-if="!registerMessageState.userNameState">{{registerMessageText.userNameText}}</p>
				</div>
				<div class="border">
					<i class="iconfont icon-dianhua1"></i>
					<input class="password" type="text" placeholder="请输入手机号码" @blur="phoneNumCheck" @input="phoneNumCheckInput" v-model="registerMessage.phoneNum" />
					<p class="prompt-message" v-if="!registerMessageState.phoneNumState">{{registerMessageText.phoneNumText}}</p>
				</div>
				<div class="border code-in">
					<i class="iconfont icon-yanzhengma"></i>
					<input class="password" type="text" placeholder="请输入图片验证码" @blur="picCodeCheck" @input="picCodeCheckInput" v-model="picCodeMessage" />
					<p class="prompt-message" v-if="!picCodeMessageState">{{picCodeMessageText}}</p>
					<div class="code-true" id="picCode" @click="getPiccode">
						<img style="width: 100%;height: 100%;" :src="piccode" />
					</div>

				</div>
				<div class="border code-in">
					<i class="iconfont icon-yanzhengma"></i>
					<input class="password" type="text" placeholder="请输入手机验证码" @blur="codeCheck" @input="codeCheckInput" v-model="registerMessage.code" />
					<p class="prompt-message" v-if="!registerMessageState.codeState">{{registerMessageText.codeText}}</p>
					<div class="code-true" v-if="timeState" @click="getTime">
						{{timeText}}
					</div>
					<div class="code-true green" v-if="!timeState">
						{{timeText}}
					</div>
				</div>
				<div class="account-handle">
					<input type="checkbox" @change="agreeCheckInput" v-model="registerMessage.agree" /> 我已阅读并同意
					<a href="javascript:;" @click="changeAgree">《广告合作协议》</a>
					<p class="prompt-message" v-if="!registerMessageState.agreeState">请同意《广告合作协议》</p>
				</div>
				<div class="register" v-if="registerBtn" @click="goRegister">
					注册
				</div>
				<div class="register registergreen" v-if="!registerBtn">
					注册
				</div>
                <router-link class="goIndex" to="/registerSuccess">
                    已注册，去登录>
                </router-link>
			</div>
			<div class="agreement-wrapper" v-if="showAgree">
				<div class="agreement">
					<h3>广告合作协议 <i class="iconfont icon-cha" @click="changeAgree"></i></h3>
					<div class="agree-con">
						<p>
							感谢您使用杭州微财网络科技有限公司提供的服务，请仔细阅读下列内容并在明确理解的前提下注册：变现猫流量变现系统的所有权和运营权归杭州微财网络科技有限公司所有。为获得变现猫流量变现系统所提供的相关服务，您需要同意本《协议》全部条款并按照页面上的提示完成注册程序。如果您在注册过程中点击“同意”按钮即表示完全接受本《协议》的所有内容，并且在知情的基础上明确同意按本《协议》的规定处理、使用和披露您及您用户的信息。如果您不接受本《协议》，请不要安装、使用、注册或以其他方式访问我们的服务。
						</p>
						<h5>服务内容</h5>
						<p>
							变现猫流量变现系统的服务内容由杭州微财网络科技有限公司根据实际情况提供给您，我们保留随时修改本《协议》的权利，并会在修改后于本页面公布修改后的文本，因此，请经常查看本页。如果您继续使用我们的服务，就视同接受我们对本《协议》的修改。如因系统维护或升级的需要而需暂停网络服务，我们将尽可能亊先在重要页面进行通告，请您随时留意我们的页面。请您就所有文件及数据做好备份，除非专门协议，我们不承担为您或您的用户保存任何文件的责任，因为服务中断或者终止等产生的损失由您及您的用户自行承担。如果因为您的用户向我们索赔以至于我们承担了赔偿责任的，您应当作为最终赔偿责任人。
						</p>
						<h5>使用规则</h5>
						<p>
							1、你需要在申请注册变现猫流量变现系统时，先同意本《协议》，才能使用我们的服务。在您注册时，须要向我们提供准确的企业和个人资料（如邮箱、身份证、联系方式、公司或团队名称等），如您使用服务期间个人资料有所变更，应及时向我们发出书面通知，以便我们能够及时维护您的账户，并为您提供相应服务，否则对于可能造成的损失将由您自行承担，我们也可能利用这些信息来通知您最新的产品更新和市场活动。
							<br />
							<br /> 2、如果您通过下载或其他方式使用了本变现猫流量变现系统，则您就认可了该变现猫流量变现系统可由我们随时升级、下载更新和用于改进、增强及进一步开发该开发工具包的其他功能。
							<br />
							<br /> 3、为使用我们的服务，您在开发并向您的用户提供（无论是否有偿）应用程序时，应当向您的用户至少披露以下内容且取得您用户的明确同意：“本公司开发本应用程序时所对外签署或承诺的任何软件的许可协议条款或服务或隐私协议均对本应用程序的用户产生约束，为本应用程序不可分割的一部分。”以作为您的用户使用您开发的应用程序的必要条款。应当明确的是，您向您的用户实际是否披露且取得他们同意前述条款不影响您承担对外提供应用程序所应承担的责任，均与我们无关。
							<br />
							<br /> 4、您不得对本变现猫流量变现系统进行修改、二次创作、反编译或反向工程，或其他提取源代码的尝试以及实施任何涉嫌侵害著作权的行为，除非我们给予您明确的书面认可。
							<br />
							<br /> 5、您在使用我们提供的服务时，必须遵循以下原则：不得危害国家安全、泄露国家秘密，不得侵犯国家社会集体的和公民的合法权益，不得制作、复制、查阅和传播下列信息：违反宪法确定的基本原则的；危害国家安全，泄漏国家机密，颠覆国家政权，破坏国家统一的；损害国家荣誉和利益的；煽动民族仇恨、民族歧视，破坏民族团结的；破坏国家宗教政策，宣扬邪教和封建迷信的；散布谣言，扰乱社会秩序，破坏社会稳定的；散布或者从事淫秽、色情、赌博、洗钱、暴力、恐怖或者教唆犯罪的；侮辱或者诽谤他人，侵害他人合法权益的；煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；以非法民间组织名义活动的；含有法律、行政法规禁止的其它内容的。
							<br />
							<br /> 6、我们保留在任何时候根据适用法律、法规、法律程序或政府要求的需要而披露任何信息，或由我们自主决定全部或部分地编辑、拒绝张贴或删除任何信息或资料的权利。
							<br />
							<br /> 7、隐私权政策：为了给您提供更好的服务，当您使用或者启动变现猫流量变现系统时，涉及包括用户的相关信息、兑换记录等信息。除了得到您的授权、或者相关政府部门根据法律法规的规定提出要求、或者您违反了本《协议》的约定的条款、或者维护我们合法权利的情况外，我们将不会泄露您的任何信息。
							<br />
							<br /> 8、变现猫流量变现系统的替换、修改和升级：我们保留在任何时候为您提供本变现猫流量变现系统替换、修改、升级版本的权利。同时，您在此同意，为改善您体验，我们有权将公司的其他相关产品绑定在本变现猫流量变现系统上供您下载和安装。
							<br />
							<br /> 9、本变现猫流量变现系统可能使用的第三方软件或技术，是受到合法授权的。因第三方软件或技术引发的任何纠纷，由该第三方负责解决，我们不承担任何责任。我们不对第三方软件或技术提供客服支持，若您需要获取支持，请与该软件或技术提供商联系。
						</p>
						<h5>安全条款</h5>
						<p>
							1、非经我们或我们授权开发并正式发布的其它任何由本变现猫流量变现系统衍生的软件均属非法，下载、安装、使用上述衍生此类软件，将可能导致不可预知的风险，建议您不要轻易下载、安装、使用，由此产生的一切法律责任与纠纷一概与我们无关。
							<br /><br /> 2、您注册成功后，我们将给予您相应的账号、密码，该账号和密码由您负责保管，请您不要将您的账号、密码转让或出借予他人使用。如您发现您的账号遭他人非法使用，应立即变更密码并通知我们。
							<br /><br /> 3、注册之后，请严格保护好自己的APP KEY、App Secret。如若泄露需要及时联系我们替换。由于开发者主观或者客观原因泄露上述信息导致的风险或者损失由开发者承担。
							<br /><br /> 4、本变现猫流量变现系统同大多数互联网软件一样，可能受到各种安全问题的侵扰，继而影响本变现猫流量变现系统的正常使用等。您应加强信息安全及用户资料的保护意识，以免遭致损失和骚扰。
						</p>
						<h5>支付及结算条款</h5>
						<p>
							1、开发者在变现猫平台的账户不可用于其它业务使用，此账户仅用于变现猫收到开发者代充、代付指令后，向用户的账户或订单指定的账户完成支付。开发者对其发出的代充、代付指令的真实性、合法性予以负责。变现猫不提供任何形式的冲正功能，由于变现猫原因造成的支付相关的问题，由变现猫负责协调处理。交易结算以变现猫系统及第三方支付系统记录的充值、支付记录为准。
							<br /><br /> 2、为了保证交易安全、结算方便，双方采取交易预付款实时结算模式。业务开展后开发者应向付款账户打入交易预付款，变现猫根据收到乙方代充、代付指令实时扣款、结算。若因一方或双方原因致使对账单发生错误，并因此导致开发者多付或少付结算款给变现猫，则双方应及时协商纠正该等错误，并由一方根据实际情况多退少补结算款给对方。
							<br /><br /> 3、开发者账户预付款与用户账户资金以人民币为单位，开发者不得自行设置。
							<br /><br /> 4、各类结算项、活动的资费标准，请以变现猫后台价格表说明为准。我们保留根据市场变化调整规则、价格、资费的权利。价格变动会在后台公告中予以公告，请留意查看。
							<br /><br /> 5、应用开发者需及时补充资金到自己的账户。由于余额不足导致的支付服务暂停产生的影响由开发者自行负责。
						</p>
						<h5>法律责任与免责</h5>
						<p>
							1、如您违反本《协议》或相关的服务规定，导致或产生的任何第三方向我们及合作公司、关联公司主张的任何索赔、要求或损失，包括合理的诉讼费用和律师费用，您同意赔偿我们及其与合作公司、关联公司，并使之免受损害。对此，我们有权视您的行为性质，采取包括但不限于中断使用许可、停止提供服务、限制使用、法律追究等措施。
							<br /><br /> 2、使用本变现猫流量变现系统涉及到互联网服务，可能会受到各个环节不稳定因素的影响，存在因不可抗力、计算机病毒、黑客攻击、系统不稳定、您所在位置、关机以及其他任何网络、技术、通信线路等原因造成的服务中断或不能满足要求的风险，您须明白并自行承担以上风险，我们不承担任何责任。
							<br /><br /> 3、您因第三方如电信部门的通讯线路故障、技术问题、网络、电脑故障、系统不稳定性及其他各种不可抗力原因而遭受的经济损失，我们不承担任何责任。
							<br /><br /> 4、因技术故障等不可抗力事件影响到服务的正常运行的，我们承诺在第一时间内与相关单位配合，及时处理进行修复，但您因此而遭受的经济损失，我们不承担任何责任。
						</p>
						<h5>知识产权</h5>
						<p>
							1、变现猫流量变现系统由杭州微财网络科技有限公司开发。变现猫流量变现系统的一切版权等知识产权，以及与变现猫流量变现系统相关的所有信息内容，包括但不限于：文字表述及其组合、图标、图饰、图表、色彩、界面设计、版面框架、有关数据、印刷材料、或电子文档等均为杭州微财网络科技有限公司所有，受中国著作权法和国际著作权条约以及其他知识产权法律法规的保护。
							<br /><br /> 2、本《协议》未明示授权的其他一切权利仍归杭州微财网络科技有限公司所有，您使用其他权利时须另外取得杭州微财网络科技有限公司的书面同意。
						</p>
						<h5>内容所有权</h5>
						<p>
							您在变现猫流量变现系统上发布的信息内容我们双方共同所有，任何其他组织或个人未经我们授权同意，不得复制、转载、擅改其内容。
						</p>
						<h5>其他条款</h5>
						<p>
							1、本《协议》所定的任何条款的部分或全部无效的者，不影响其它条款的效力。
							<br /><br /> 2、本《协议》的解释、效力及纠纷的解决，适用于中华人民共和国法律。若您和我们之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，您同意将纠纷或争议提交杭州微财网络科技有限公司所在地有管辖权的法院诉讼解决。
						</p>
					</div>
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
				showAgree: false,
				upImgUrl: '',//营业执照图片链接
				timeState: true,
				timeText: '获取短信验证码',
				time: 60,
				registerBtn: false,
				isUpPic: false,
				upImageName: '请上传营业执照',
				poicState: true,
				picCodeMessage: '',
				picCodeMessageState: false,
				picCodeMessageText: '',
				piccode: this.api.commonUrl()+"getImgValidate?width=200&height=80&is_create_interference_line=true&interference_line_num=0",
				emailAgo: null,
				showLook:false,//查看按钮是否显示
				upBtnTxt: '浏览',//上传按钮文字
				loading: false,
				uploading: false,
				registerMessage: {
					email: '',
					passWord: '',
					passWordAgin: '',
					companyName: '',
					companyAddr: '',
					companyNum: '',
					userName: '',
					phoneNum: '',
					code: '',
					agree: true
				},
				registerMessageState: {
					emailState: false,
					passWordState: false,
					passWordAginState: false,
					companyNameState: false,
					companyAddrState: false,
					companyNumState: false,
					userNameState: false,
					phoneNumState: false,
					codeState: false,
					agreeState: true,
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
					codeText: '',
					agreeText: ''
				}
			}
		},
		methods: {
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
					reghisterMessage.password = md.md5(Util.trim(this.registerMessage.passWord));
					reghisterMessage.repassword = md.md5(Util.trim(this.registerMessage.passWordAgin));
					reghisterMessage.businessLicenseNo = this.registerMessage.companyNum;
					reghisterMessage.businessLicenseImg = this.upImgUrl;
					reghisterMessage.msgValidateCode = md.md5(Util.trim(this.registerMessage.code).toLowerCase());
					this.loading = true;
					let that = this;
					this.api.ajaxPost('register',reghisterMessage,function(res){
						that.loading = false;
						if(res.data.successed){
							window.location.href='registerSuccess.html'
						}else{
							alert(res.data.errorCode)
						}
					})
				};
			},
			//获取图片验证码
			getPiccode(event){
				event.target.src = this.piccode + '&' + new Date().getTime();
			},
			//点击同意变现猫协议
			changeAgree() {
				this.showAgree = !this.showAgree;
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
						if(files[0].size > 2048000){
							that.$message({
        						message: '请选择小于2M的图片',
        						duration: Util.time()
        					});
						}else{
							let param = new FormData();
							param.append('file',files[0],files[0].name);
							that.uploading = true;
							that.api.postUp('upload', param).then((data)=>{
								that.uploading = false;
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
							});
						}
					};
				};
			},
			//获取短信验证码
			getTime() {
				if(!this.registerMessageState.phoneNumState){
					this.phoneNumCheck()
				}else if(this.picCodeMessage.length < 1){
					this.picCodeCheck()
				}else{
					let that = this;
					let _imgValidateCode = md.md5(Util.trim(this.picCodeMessage).toLowerCase());
					this.api.ajaxPost('sendMsgValidateCode',{
						mobile: this.registerMessage.phoneNum,
						imgValidateCode: _imgValidateCode
					},function(res){
						if(res.data.successed){
							that.timeState = false;
							that.timeText = '重新发送（' + that.time + 's）';
							let timer = setInterval(function() {
								that.time--;
								that.timeText = '重新发送（' + that.time + 's）';
								if(that.time === 1) {
									that.time = 60;
									that.timeText = '获取验证码';
									that.timeState = true;
									clearInterval(timer);
								};
							}, 1000);
						}else{
							alert(res.data.errorCode)
						}
					})

				}
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
			userNameCheck() {
				let unLength = this.registerMessage.userName.length;
				if(unLength < 1) {
					this.registerMessageState.userNameState = false;
					this.registerMessageText.userNameText = '请输入您的名字';
				} else {
					this.registerMessageState.userNameState = true;
				};
				this.allCheck();
			},
			userNameCheckInput() {
				let unLength = this.registerMessage.userName.length;
				if(unLength >= 1) {
					this.registerMessageState.userNameState = true;
				};
				this.allCheck();
			},
			//手机号验证
			phoneNumCheck() {
				let pnLength = this.registerMessage.phoneNum.length;
				if(pnLength < 1) {
					this.registerMessageState.phoneNumState = false;
					this.registerMessageText.phoneNumText = '请输入手机号码';
				} else if(!(/^1[3|4|5|7|8]\d{9}$/.test(this.registerMessage.phoneNum))) {
					this.registerMessageState.phoneNumState = false;
					this.registerMessageText.phoneNumText = '请输入正确手机号码';
				} else {
					this.registerMessageState.phoneNumState = true;
				};
				this.allCheck();
			},
			phoneNumCheckInput() {
				let unLength = this.registerMessage.phoneNum.length;
				if((/^1[3|4|5|7|8]\d{9}$/.test(this.registerMessage.phoneNum))) {
					this.registerMessageState.phoneNumState = true;
				};
				this.allCheck();
			},
			//图片验证码验证
			picCodeCheck() {
				let cLength = this.picCodeMessage.length;
				if(cLength < 1) {
					this.picCodeMessageState = false;
					this.picCodeMessageText = '请输入图片验证码';
				} else {
					this.picCodeMessageState = true;
				};
			},
			picCodeCheckInput() {
				let cLength = this.picCodeMessage.length;
				if(cLength >= 1) {
					this.picCodeMessageState = true;
				};
			},
			//短信验证码验证
			codeCheck() {
				let cLength = this.registerMessage.code.length;
				if(cLength < 1) {
					this.registerMessageState.codeState = false;
					this.registerMessageText.codeText = '请输入短信验证码';
				} else {
					this.registerMessageState.codeState = true;
				};
				this.allCheck();
			},
			codeCheckInput() {
				let cLength = this.registerMessage.code.length;
				if(cLength >= 1) {
					this.registerMessageState.codeState = true;
				};
				this.allCheck();
			},
			//服务协议
			agreeCheckInput() {
				this.registerMessageState.agreeState = this.registerMessage.agree;
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
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="scss">
	#register {
		min-height: 760px;
		background: url(../../assets/images/login-topbg.png) no-repeat 0 72px;
		-webkit-background-size: 100%;
		background-size: 100%;
		.r-header {
			width: 100%;
			height: 72px;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			border-bottom: 1px solid #ececec;
			background: rgba(255, 255, 255, 0.9);
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
		.r-container {
			background: url(../../assets/images/login-bottombg.png) no-repeat bottom center;
			-webkit-background-size: 100%;
			background-size: 100%;
			width: 100%;
			height: 100%;
			position: relative;
		}
		.r-container-in {
			width: 330px;
			height: 750px;
			position: absolute;
			top: 72px;
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
		.code-in {
			padding-right: 130px;
			.code-true {
				width: 120px;
				height: 38px;
				position: absolute;
				right: 0;
				bottom: 2px;
				overflow: hidden;
				text-align: center;
				line-height: 36px;
				font-size: 12px;
				border-radius: 3px;
				background: #ff9827;
				color: #fff;
				cursor: pointer;
			}
			.green {
				background: #b5b5b5;
			}
		}
		.register {
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
		.registergreen {
			height: 39px;
			background: rgb(181, 181, 181);
		}
		.account-handle {
			margin-top: 10px;
			margin-bottom: 10px;
			position: relative;
			width: 100%;
			height: 40px;
			line-height: 40px;
			color: #a0a0a0;
			font-size: 12px;
			input {
				position: relative;
				top: 3px;
			}
			a {
				color: #a0a0a0;
			}
		}
		.agreement-wrapper {
			width: 100%;
			height: 100%;
			position: relative;
			z-index: 999;
			background: rgba(0, 0, 0, 0.3);
		}
		.agreement {
			width: 680px;
			height: 608px;
			background: #ffffff;
			overflow: auto;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			overflow: hidden;
			border-radius: 4px;
			-webkit-box-shadow: 0px 5px 30px 10px #888;
			-moz-box-shadow: 0px 5px 30px 10px #888;
			box-shadow: 0px 5px 30px 10px #888;
			h3 {
				height: 45px;
				padding: 0 32px;
				color: #666;
				font: 16px/45px "microsoft yahei";
				position: relative;
				border-bottom: 1px solid #e2e2e2;
				i {
					position: absolute;
					right: 20px;
					top: 0;
					transform: rotate(0deg);
					transition: all 0.3s linear;
				}
				i:hover {
					transform: rotate(270deg);
				}
			}
		}
		.agree-con {
			width: 696px;
			height: 533px;
			padding: 0 20px 0 32px;
			overflow-y: auto;
			p {
				color: #999;
				margin-bottom: 10px;
				font: 14px/24px "microsoft yahei";
			}
			h5 {
				color: #666;
				font: bold 14px/14px "microsoft yahei";
				margin: 20px 0;
			}
		}
		.goIndex{
			display: block;
			margin-top: 10px;
			width: 100%;
			height: 13px;
			text-align: center;
			font-size: 13px;
    		color: #a0a0a0;
		}
	}
</style>
