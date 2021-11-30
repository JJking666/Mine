<template>
	<view class="mysetting">
		<view class="setting-nav">
			<view class="nav-vip">
				<image src="../../static/uview/common/logo.png" mode=""></image>
				<text>Mine会员</text>
			</view>
			<image src="../../static/img/memorandum/dm7.jpg" mode=""></image>
			<image src="../../static/img/memorandum/bk2.jpg" mode=""></image>
			<text>name</text>
			<view class="qianm">
				<text>&nbsp;你好好你好好你好好你好好你好好你好好你好好你好好你好好你好好你好好你好好你好好你好</text>
			</view>
			<view class="nav-something">
				<text>20000</text>
				<text @tap="gotoFriends">200</text>
				<text @tap="gotoFuns">200</text>
			</view>
		</view>
		<view class="setting-main1">
			<view class="main1-card">
				<view class="main1-title">
					<text>个人</text>
				</view>
				<view class="main1-card-item" @tap="gotoPerson">
					<image src="../../static/img/icon.jpg"></image>
					<text>个人</text>
				</view>
				<view class="main1-card-item" @tap="gotoAccount">
					<image src="../../static/img/icon.jpg"></image>
					<text>账户</text>
				</view>
				<view class="main1-card-item" @tap="gotoPrivacy">
					<image src="../../static/img/icon.jpg"></image>
					<text>隐私</text>
				</view>
				<view class="main1-card-item" @tap="gotoMedal">
					<image src="../../static/img/icon.jpg"></image>
					<text>勋章</text>
				</view>
			</view>
		</view>
		<view class="setting-main2">
			<view class="main2-card">
				<view class="main2-title">
					<text>更多服务</text>
				</view>
				<view class="main2-card-item" @tap="gotoPerson">
					<image src="../../static/img/icon.jpg"></image>
					<text>夜间</text>
				</view>
				<view class="main2-card-item" @tap="gotoPerson">
					<image src="../../static/img/icon.jpg"></image>
					<text>创作</text>
				</view>
				<view class="main2-card-item">
					<image src="../../static/img/icon.jpg"></image>
					<text>历史</text>
				</view>
				<view class="main2-card-item">
					<image src="../../static/img/icon.jpg"></image>
					<text>Family</text>
				</view>
				<view class="main2-card-item">
					<image src="../../static/img/icon.jpg"></image>
					<text>福利</text>
				</view>
				<view class="main2-card-item">
					<image src="../../static/img/icon.jpg"></image>
					<text>社区</text>
				</view>
				<view class="main2-card-item">
					<image src="../../static/img/icon.jpg"></image>
					<text>青少年</text>
				</view>
				<view class="main2-card-item">
					<image src="../../static/img/icon.jpg"></image>
					<text>客服</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			gotoFriends(){
				uni.navigateTo({
					url:"../Friends/friends"
				})
			},
			gotoFuns(){
				uni.navigateTo({
					url:'../Friends/funs'
				})
			},
			gotoPerson() {
				uni.navigateTo({
					url: 'person'
				})
			},
			gotoAccount() {
				uni.navigateTo({
					url: 'account'
				})
			},
			gotoPrivacy() {
				uni.navigateTo({
					url: 'privacy'
				})
			},
			gotoMedal() {
				uni.navigateTo({
					url: 'medal'
				})
			},
		},
		onLoad(){
			
		}
	}
</script>

<style lang="scss">
	.mysetting {
		height: 100vh;
		width: 100vw;
		background-color: #e6ebf4;
		position: relative;

		.nav-vip {
			position: absolute;
			right: 0;
			top: 5vh;
			height: 5vh;
			width: fit-content;
			padding: 0.5vh 2vw;
			box-sizing: border-box;
			background-color: rgba($color: #242424, $alpha: 0.7);
			z-index: 2;

			&>image {
				vertical-align: middle;
				display: inline-block;
				width: 4vh;
				height: 4vh;
				size: 100%;
				object-fit: cover;
			}

			&>text {
				vertical-align: middle;
				margin-left: 2vw;
				display: inline-block;
				height: 4vh;
				line-height: 4vh;
				font-size: $fontSize-md;
				font-weight: 500;
			}
		}

		.setting-nav {
			width: 100vw;
			height: 35vh;
			padding: 2vh 5vw;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			position: relative;
			color: white;

			&>image:nth-of-type(1) {
				position: absolute;
				height: inherit;
				left: 0;
				top: 0;
				width: 100vw;
				size: 100%;
				object-fit: cover;
				z-index: 1;
			}

			&>image:nth-of-type(2) {
				height: 18vh;
				width: 18vh;
				border-radius: 100%;
				size: 100%;
				object-fit: cover;
				z-index: 10;
			}

			.qianm {
				width: fit-content;
				max-width: 75vw;
				height: 6vh;
				z-index: 10;
				margin-top: 1vh;

				image {
					height: 4vh;
					width: 2vh;
					size: 100%;
					object-fit: cover;
					z-index: 10;
					display: inline-block;
				}

				text {
					font-size: $fontSize-sm;
					display: -webkit-box;
					overflow: hidden;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					z-index: 10;
				}
			}

			&>text:nth-of-type(1) {
				font-size: $fontSize-lg;
				font-weight: 600;
				z-index: 10;
				margin-top: 0;
				display: block;
				width: 18vh;

			}



			.nav-something {
				z-index: 10;
				display: flex;
				flex-direction: row;
				margin-top: 1.5vh;
				color: white;

				&>text:nth-of-type(1) {
					font-size: $fontSize-md;
					font-weight: 500;

					&::after {
						content: '获赞';
						margin-left: 2vw;
						font-size: $fontSize-sm;
					}
				}

				&>text:nth-of-type(2) {
					margin-left: 7vw;
					font-size: $fontSize-md;
					font-weight: 500;

					&::after {
						content: '关注';
						margin-left: 2vw;
						font-size: $fontSize-sm;
					}
				}

				& text:nth-of-type(3) {
					margin-left: 7vw;
					font-size: $fontSize-md;
					font-weight: 500;

					&::after {
						content: '粉丝';
						margin-left: 2vw;
						font-size: $fontSize-sm;
					}
				}
			}

		}

		.setting-main1 {
			height: 26vh;
			width: 100vw;
			padding: 4vh 5vw;
			padding-bottom: 1vh;
			box-sizing: border-box;

			.main1-card {
				width: 90vw;
				height: fit-content;
				background-color: #9deaa6;
				padding: 1vh 5vw;
				padding-top: 8vh;
				padding-bottom: 1vh;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-around;
				position: relative;
				border-radius: 25rpx;

				.main1-title {
					height: 6vh;
					width: 80vw;
					position: absolute;
					left: 5vw;
					top: 0;
					border-bottom: 1px solid #939395;

					text {
						line-height: 6vh;
						font-size: $fontSize-md;
						font-weight: 500;
					}
				}

				.main1-card-item {
					width: 15vw;
					height: 11vh;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 1vh 0;

					&>image {
						width: 8vh;
						size: 100%;
						object-fit: cover;
						height: 8vh;
					}

					&>text {
						font-size: 25rpx;
						display: block;
						margin-top: 1vh;
					}
				}
			}
		}

		.setting-main2 {
			margin-top: 2vh;
			height: fit-content;
			width: 100vw;
			padding: 4vh 5vw;
			padding-top: 0;
			box-sizing: border-box;
			padding-bottom: 1vh;

			.main2-card {
				border-radius: 25rpx;
				width: 90vw;
				height: fit-content;
				background-color: #a6e4f1;
				padding: 1vh 5vw;
				padding-top: 8vh;
				padding-bottom: 1vh;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-around;
				position: relative;

				.main2-title {
					height: 6vh;
					width: 80vw;
					position: absolute;
					left: 5vw;
					top: 0;
					border-bottom: 1px solid #939395;

					text {
						line-height: 6vh;
						font-size: $fontSize-md;
						font-weight: 500;
					}
				}

				.main2-card-item {
					width: 18vw;
					height: 11vh;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 1vh 0;

					&>image {
						width: 8vh;
						size: 100%;
						object-fit: cover;
						height: 8vh;
					}

					&>text {
						font-size: 25rpx;
						display: block;
						margin-top: 1vh;
					}
				}
			}
		}
	}
</style>
