<template name='sunui-mverify'>
	<view class="sunui-slider">
		<text style="color: #666;">{{ hint }}</text>
		<view class='sunui-slider-bg' @blur="blur" :style="{left:-(w + 2)+'px',transform:cssAnimation}">
			<text>{{ succeedMsg }}</text>
			<view class='sunui-slider-box' @touchmove='moveStart' @touchend='moveEnd'>
				<text class="iconfont" :class="[isVerify?'icon-wancheng':'icon-youjiantou']"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			Account: {
				type: String,
				default: '0'
			},
			Password: {
				type: String,
				default: '0'
			},
			rePassword: {
				type: String,
				default: '0'
			},
		},
		data() {
			return {
				hint: '右滑注册',
				sysW: uni.getSystemInfoSync().windowWidth,
				xAxial: 0,
				x: 0,
				w: (uni.getSystemInfoSync().windowWidth * 0.8) - 50,
				cssAnimation: 'translate3d(0, 0, 0)',
				succeedMsg: '',
				pullStatus: true,
				isVerify: false
			}
		},
		name: 'sunui-mverify',
		methods: {
			blur(){
				this.cssAnimation = 'translate3d(' + 0 + 'px, 0, 0)';
			},
			addUserData(){
				let Info
				let that =this
				if(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.Account)){
					Info={
						Account:this.Account,
						Password:this.Password,
						Phone:this.Account,
					}
				}else{
					Info={
						Account:this.Account,
						Password:this.Password,
						Email:this.Account,
					}
				}
				uni.request({
					url: 'http://127.0.0.1:3000/user/addUser',
					data:Info
				})
				.then(data=>{
					let [err,res]=data
					console.log(res.data.data._id)
					let info = {
						_id:res.data.data._id
					}
					uni.request({
						url: 'http://127.0.0.1:3000/homePage/addHomePage',
						data:info
					})
				})
				
			},
			moveStart(e) {
				if(this.Password!=this.rePassword){
					uni.showToast({
						title:'两次密码不同',
						duration:1000,
					})
					return
				}
				if (this.pullStatus) {
					this.x = e.changedTouches[0].clientX - ((this.sysW * 0.1) + 25);
					this.x >= this.w ? this.xAxial = this.w : this.xAxial = this.x;
					if (this.x < 25) this.xAxial = 0;
					this.cssAnimation = 'translate3d(' + this.xAxial + 'px, 0, 0)';
					this.cssAnimation = this.cssAnimation
					this.succeedMsg = '注册中...';
				}
			},
			moveEnd() {
				let tag;
				let error={};
				let that = this
				error.pdAccount = false
				error.pdPassword = false
				if ((!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.Account) &&
					!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.Account))||
					(this.Password.length < 6 || this.Password.length > 18)) {
					if((!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.Account) &&
					!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.Account))){
						error.pdAccount = true
					}
					
					if (this.Password.length < 6 || this.Password.length > 18) {
						error.pdPassword = true;
					}
					uni.$emit('enrollPd', error)
					this.xAxial = 0
					this.cssAnimation = 'translate3d(' + this.xAxial + 'px, 0, 0)';
					return;
				}
				if (this.x >= this.w) {
					this.xAxial = this.w;
					this.succeedMsg = '注册成功';
					tag = true;
					this.pullStatus = false;
					this.isVerify = true;
				} else {
					this.xAxial = 0;
					this.succeedMsg = '';
					tag = false;
					this.isVerify = false;
				}
				this.$emit('change', {
					msg: tag
				});
				this.cssAnimation = 'translate3d(' + this.xAxial + 'px, 0, 0)';
				this.succeedMsg = this.succeedMsg;
				this.cssAnimation = this.cssAnimation;
				uni.showToast({
					title: '注册成功...',
					duration: 1000
				})
				this.addUserData()
				console.log(that.Account)
				let Info={
					Account:that.Account,
					Password:that.Password
				}
				setTimeout(() => {
					uni.redirectTo({
						url: '../../page/Login/login'
					})
				}, 1200)
			}
		}
	}
</script>

<style>
	@import url("iconfont");

	.sunui-slider {
		position: relative;
		overflow: hidden;
		width: 602upx;
		height: 80upx;
		line-height: 80upx;
		margin: 0 auto;
		border-radius: 5px;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, .1);
		font-size: 32upx;
		text-align: center;
	}

	.sunui-slider-bg {
		position: absolute;
		overflow: hidden;
		top: 0;
		width: 101%;
		height: 80upx;
		line-height: 80upx;
		background-color: #7BBB55;
		border-radius: 5px;
		color: #fff;
	}

	.sunui-slider-box {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		width: 58px;
		background-color: #EBEBEB;
	}
</style>
