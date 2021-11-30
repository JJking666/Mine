<!-- 蓝色简洁登录页面 -->
<template>
	<view class="login-bg">
		<view class="t-login">
			<form class="cl">
				<view class="t-a" style="margin-top: 4vh;">
					<image src="../../static/img/login/user.png"></image>
					<input type="" name="account" placeholder="请输入手机号或邮箱" maxlength="25" 
					v-model="account" />
					<text id="pd" v-show="pdAccount">请输入正确的手机号或邮箱</text>
				</view>
				<view class="t-a">
					<image src="../../static/img/login/pwd.png"></image>
					<input type="password" name="code" minlength="6" maxlength="18" placeholder="请输入密码6-18位" 
					v-model="pwd1" />
					<text id="pd" v-show="pdPassword">密码错误!</text>
				</view>
				<view class="t-a">
					<image src="../../static/img/login/pwd.png"></image>
					<input type="password" name="code" minlength="6" maxlength="18" placeholder="请重新输入密码" 
					v-model="pwd2"/>
					<text id="pd" v-show="pdPassword">密码错误!</text>
				</view>
				<sunui-mverify :Account="account" :Password="pwd1" :rePassword="pwd2"></sunui-mverify>
			</form>
		</view>
		<image class="img-a" src="../../static/img/login/bg1.png"></image>
	</view>
</template>
<script>
export default {
	data() {
		return {
			account: '', //手机号码
			pwd1: '' ,//密码
			pwd2:'',
			pdAccount:false,
			pdPassword:false
		};
	},
	onLoad() {
		let that =this
		uni.$on('enrollPd',this.showError)
	},
	methods: {
		showError(res){
			console.log(res)
			this.pdAccount=res.pdAccount
			this.pdPassword=res.pdPassword
			if(res.pdAccount){
				uni.showToast({
					title: '请检查账号',
					duration: 2000
				})
			}else if(res.pdPassword){
				uni.showToast({
					title: '请检查密码',
					duration: 2000
				})
			}
		}
	}
};
</script>
<style lang="scss">
	#pd{
		    position: absolute;
		    left: 50rpx;
		    top: 105rpx;
			font-size: 24rpx;
			color: red;
	}
.img-a {
	width: 100%;
	position: absolute;
	bottom: 0;
}
.login-bg {
	height: 100vh;
	padding: 20vh 0;
	    box-sizing: border-box;
	background-image:linear-gradient(to bottom right,rgba(249, 136, 162, 0.6),rgba(203, 89, 213, 0.6));
}

.t-login {
	width: 90vw;
	    padding: 3vh 5vw;
	    margin: 0 auto;
	    font-size: 28rpx;
	    background-color: #ffffff;
	    border-radius: 20rpx;
	    box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.15);
	    z-index: 9;
	    height: fit-content;
	    box-sizing: border-box;
}

.t-login button {
	font-size: 28rpx;
	background: linear-gradient(to right, #ff8f77, #fe519f);
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	margin-top: 100rpx;
}

.t-login input {
	padding: 0 20rpx 0 120rpx;
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 70rpx;
	background: #f6f6f6;
	border: 1px solid #f6f6f6;
	font-size: 28rpx;
	border-radius: 50rpx;
}

.t-login .t-a {
	position: relative;
}

.t-login .t-a image {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	left: 40rpx;
	top: 28rpx;
	padding-right: 20rpx;
}

.t-login .t-b {
	text-align: left;
	font-size: 46rpx;
	color: #000;
	padding: 300rpx 0 120rpx 0;
	font-weight: bold;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-c {
	text-align: right;
	color: #666666;
	margin: 30rpx 30rpx 40rpx 0;
}

.t-login .t-c .t-c-txt {
	margin-right: 300rpx;
}

.t-login .t-e {
	text-align: center;
	width: 600rpx;
	margin: 40rpx auto 0;
}

.t-login .t-g {
	float: left;
	width: 33.33%;
}

.t-login .t-e image {
	width: 70rpx;
	height: 70rpx;
}

.t-login .t-f {
	text-align: center;
	color: #999;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #b9b9b9;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #aeaeae;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
</style>
