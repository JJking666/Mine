<!-- 蓝色简洁登录页面 -->
<template>
	<view class="login-bg">
		<view class="t-login">
			<form class="cl">
				<view class="t-a" style="margin-top: 4vh;">
					<image src="../../static/img/login/user.png"></image>
					<input type="" name="account" placeholder="请输入手机号码" v-model="account" />
					<text id="pd" v-show="pdAccount">请输入正确的账号或邮箱</text>
				</view>
				<view class="t-a">
					<image src="../../static/img/login/pwd.png"></image>
					<input type="password" placeholder="请输入密码" v-model="password" />
					<text id="pd" v-show="pdPassword">密码错误!</text>
				</view>

				<button @tap="login()">登 录</button>
				<view class="t-c">
					<text class="t-c-txt" @tap="reg()">注册账号</text>
					<text @tap="forgotPwd()">忘记密码</text>
				</view>
			</form>
			<view class="t-f"><text>—————— 其他登录方式 ——————</text></view>
			<view class="t-e cl">
				<view class="t-g" @tap="wxLogin()">
					<image src="../../static/img/login/wx2.png"></image>
				</view>
				<view class="t-g" @tap="zfbLogin()">
					<image src="../../static/img/login/qq2.png"></image>
				</view>
				<view class="t-g" @tap="zfbLogin()">
					<image src="../../static/img/login/wb.png"></image>
				</view>
			</view>
		</view>
		<image class="img-a" src="../../static/img/login/bg1.png"></image>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				account: '', //手机号码
				password: '', //密码
				pdAccount: false,
				pdPassword: false,
				isPassword: false
			};
		},
		methods: {
			//当前登录按钮操作
			login() {
				var that = this;
				if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.account)) {
					that.pdAccount = true
					uni.showToast({
						title: '请输入正确手机号',
						icon: 'none'
					});
					return;
				} else {
					uni.showLoading({
						title: '登录中'
					})
					uni.request({
							url: 'http://120.76.138.164:3000/login?data=' + this.account
						})
						.then(data => {
							var [err, res] = data;
							if (res.data.data[0].Password == this.password) this.isPassword = true;
							if (!this.isPassword) {
								this.pdPassword = true
								uni.showToast({
									title: '请输入正确密码',
									icon: 'none'
								});
								return;
							}
							uni.setStorage({
								key: 'UserAccount',
								data: that.account,
							});
							uni.setStorage({
								key: 'UserPassword',
								data: that.password,
							});
							setTimeout(() => {
								uni.hideLoading()
								uni.showToast({
									title: '登录成功！',
									icon: 'none'
								});
								uni.switchTab({
									url: '../MySetting/mySetting'
								})
							}, 1200)
						})
				}

			},
			//忘记密码
			forgotPwd() {
				uni.showToast({
					title: '忘记密码',
					icon: 'none'
				});
			},
			//立刻注册
			reg() {
				uni.redirectTo({
					url: 'enroll'
				})
			}
		},
		onLoad() {
			uni.getStorage({
				key: "UserAccount",
				success(res) {
					console.log(res.data)
					uni.showLoading({
						title: '登录中'
					})
					setTimeout(() => {
						uni.hideLoading()
						uni.showToast({
							title: '登录成功！',
							icon: 'none'
						});
						uni.switchTab({
							url: '../Memorandum/memorandum'
						})
					}, 1200)
				}
			})
		}
	};
</script>
<style lang="scss">
	#pd {
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
		background-image: linear-gradient(to bottom right, rgba(249, 136, 162, 0.6), rgba(203, 89, 213, 0.6));
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
