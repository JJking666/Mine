<template>
	<view class="mysetting">
		<view class="setting-nav">
			<view class="nav-vip">
				<image :src="homePageData.HeadImg" mode=""></image>
				<text>Mine会员</text>
			</view>
			<image src="../../static/img/memorandum/dm7.jpg" mode=""></image>
			<image src="../../static/img/memorandum/bk2.jpg" mode=""></image>
			<text>{{homePageData.Name}}</text>
			<view class="qianm">
				<text>{{homePageData.motto}}</text>
			</view>
			<view class="nav-something">
				<text>{{homePageData.goods}}</text>
				<text @tap="gotoFriends">{{homePageData.FriendsCount}}</text>
				<text @tap="gotoFuns">{{homePageData.FanCount}}</text>
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
			return {
				UserAccount: '',
				homePageData:{
					UserID:'',
					Name:'',
					HeadImg:'',
					motto:'',
					FriendsCount:0,
					FanCount:0,
					workCount:0,
					medals:[],
					goods:0
				}
			}
		},
		methods: {
			gotoFriends() {
				let that =this
				uni.navigateTo({
					url: "../Friends/friends?ID="+that.homePageData.UserID
				})
			},
			gotoFuns() {
				let that =this
				uni.navigateTo({
					url: "../Friends/funs?ID="+that.homePageData.UserID
				})
			},
			gotoPerson() {
				let that =this
				uni.navigateTo({
					url: "person?ID="+that.homePageData.UserID
				})
			},
			gotoAccount() {
				let that =this
				uni.navigateTo({
					url: "account?ID="+that.homePageData.UserID
				})
			},
			gotoPrivacy() {
				let that =this
				uni.navigateTo({
					url: "privacy?ID="+that.homePageData.UserID
				})
			},
			gotoMedal() {
				let that =this
				uni.navigateTo({
					url: "medal?ID="+that.homePageData.UserID
				})
			},
		},
		onShow(){
			let that =this
			uni.getStorage({
				key: "UserAccount",
				success(res) {
					uni.request({
						url: 'http://127.0.0.1:3000/user/queryUser?data=' + res.data
					})
					.then(data=>{
						let [err, res] = data
						that.homePageData.Name=res.data.data[0].Name
						that.homePageData.UserID=res.data.data[0]._id
						uni.setStorage({
							key:"UserID",
							data:res.data.data[0]._id
						})
						uni.request({
							url: 'http://127.0.0.1:3000/homePage/queryHomePage?data=' + res.data.data[0]["_id"]
						})
						.then((data) => {
							let [err, res] = data
							that.homePageData.HeadImg=res.data.data[0].HeadImg,
							that.homePageData.motto=res.data.data[0].motto,
							that.homePageData.FriendsCount=res.data.data[0].FriendsCount,
							that.homePageData.FanCount=res.data.data[0].FanCount,
							that.homePageData.workCount=res.data.data[0].workCount,
							that.homePageData.medals=res.data.data[0].medals
							that.homePageData.goods =res.data.data[0].goods
						})
						uni.request({
							url:'http://127.0.0.1:3000/relationship/queryRelationship?data='+
							'{"UserID":"'+that.homePageData.UserID+'","status":[0,1,2]}'
						})
						.then(data=>{
							let [err,res]=data
							let fun=0
							let friend=0
							res.data.data.forEach((item)=>{
								if(item.status==0||item.status==2) fun++;
								if(item.status==1||item.status==2) friend++
							})
							that.homePageData.FanCount=fun
							that.homePageData.FriendsCount=friend
						})
					})
					
				}
			})
			
		},
		onReady() {
			let that = this
			uni.getStorage({
				key: "UserAccount",
				success(res) {
					uni.request({
						url: 'http://127.0.0.1:3000/user/queryUser?data=' + res.data
					})
					.then(data=>{
						let [err, res] = data
						that.homePageData.Name=res.data.data[0].Name
						that.homePageData.UserID=res.data.data[0]._id
						// uni.setStorage({
						// 	key:"UserID",
						// 	data:res.data.data[0]._id
						// })
						uni.request({
							url: 'http://127.0.0.1:3000/homePage/queryHomePage?data=' + res.data.data[0]["_id"]
						})
						.then((data1) => {
							let [err1, res1] = data1
							that.homePageData.HeadImg=res1.data.data[0].HeadImg,
							that.homePageData.motto=res1.data.data[0].motto,
							that.homePageData.FriendsCount=res1.data.data[0].FriendsCount,
							that.homePageData.FanCount=res1.data.data[0].FanCount,
							that.homePageData.workCount=res1.data.data[0].workCount,
							that.homePageData.medals=res1.data.data[0].medals
							that.homePageData.goods =res1.data.data[0].goods
						})
						uni.request({
							url:'http://127.0.0.1:3000/relationship/queryRelationship?data='+
							'{"UserID":"'+that.homePageData.UserID+'","status":[0,1,2]}'
						})
						.then(data2=>{
							let [err2,res2]=data2
							let fun=0
							let friend=0
							res2.data.data.forEach((item)=>{
								if(item.status==0||item.status==2) fun++;
								if(item.status==1||item.status==2) friend++
							})
							that.homePageData.FanCount=fun
							that.homePageData.FriendsCount=friend
						})
					})
					
				}
			})

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
