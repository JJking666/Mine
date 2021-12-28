<template>
	<view class="lookFriend">
		<swiper :current="swiperIndex" vertical="true" circular="true" style="height: 100vh;">
			<swiper-item>
				<view class="home">
					<image :src="homePageData.HeadImg" mode="" class="home-bk"></image>
					<view class="home-add" :animation="animationData1">
						<view class="home-add-md" :animation="animationData3">
							<image :src="homePageData.HeadImg" mode="" ></image>
						</view>
						<text>ID:{{id.slice(-6)}}</text>
						<text>昵称:{{FriendData.Name}}</text>
						<view class="someNumber">
							<text>{{homePageData.goods}}</text>
							<text>{{homePageData.FriendsCount}}</text>
							<text>{{homePageData.FanCount}}</text>
						</view>
						<view class="someMedals">
							<image :src="allMedals[item].medalPath" mode="" v-for="(item,index) in homePageData.medals"></image>
						</view>
						<text>{{FriendData.motto}}</text>
						<button type="primary" class="home-add-btn" @tap="homeAdd">加为好友</button>
					</view>
					<view class="home-send" :animation="animationData2">
						<view class="home-send-md">
							<text>{{FriendData.Name}}</text>
							<textarea value="" placeholder="快和Ta介绍一下自己吧~~" placeholder-style="color:#F8F8F8"/>
						</view>
						<view class="home-send-btn">
							<button type="default" @tap="homeSend()">查看作品</button>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				B
			</swiper-item>
			<swiper-item>
				C
			</swiper-item>
		</swiper>
	</view>
	
</template>

<script>
	export default {
		data() {
		    return {
				id:'',
				swiperIndex:0,
				homePageData:{},
				FriendData:{},
				animationData1: {},
				animationData2: {},
				animationData3:{},
				allMedals:[]
		    }
		},
		onLoad(option){
			let that = this
			this.id = option.id
			console.log(option.id)
			let data1={
				_id:option.id
			}
			uni.request({
				url:'http://120.76.138.164:3000/user/queryUserById',
				data:data1
			})
			.then(data=>{
				let [err,res1]=data
				let friend={}
				that.FriendData = res1.data.data
				console.log(that.FriendData)
			})
			uni.request({
				url: 'http://120.76.138.164:3000/homePage/queryHomePage?data=' + option.id
			})
			.then((data) => {
				let [err, res] = data
				console.log(1,res.data.data)
				that.homePageData.HeadImg=res.data.data[0].HeadImg,
				that.homePageData.motto=res.data.data[0].motto,
				that.homePageData.FanCount=res.data.data[0].FanCount,
				that.homePageData.FriendsCount=res.data.data[0].FriendsCount,
				that.homePageData.workCount=res.data.data[0].workCount,
				that.homePageData.medals=res.data.data[0].medals
				that.homePageData.goods =res.data.data[0].goods
			})
			uni.request({
				url: 'http://120.76.138.164:3000/medal/getMedals'
			})
			.then((data1) => {
				let [err1, res1] = data1
				that.allMedals=res1.data.data
			})
			uni.request({
				url:'http://120.76.138.164:3000/relationship/queryRelationship?data='+
				'{"UserID":"'+option.id+'","status":[0,1,2]}'
			})
			.then(data=>{
				let [err,res]=data
				let fun=0
				let friend=0
				console.log(2,res.data.data)
				res.data.data.forEach((item)=>{
					if(item.status==0||item.status==2) fun++;
					if(item.status==1||item.status==2) friend++
				})
				that.homePageData.FanCount=fun
				that.homePageData.FriendsCount=friend
				console.log(that.homePageData.FriendsCount)
			})
		},
		methods:{
			homeAdd(){
				let animation2 = uni.createAnimation({
					duration: 1000,
				    timingFunction: 'ease',
				})
				let animation3 = uni.createAnimation({
					duration: 1000,
				    timingFunction: 'ease',
				}) 
				animation3.scale(0.8).step()
				animation3.translateX(-28+'vw').translateY(12+'vh').step()
				animation2.translateY(10+'vh').step() 

				this.animationData3 = animation3.export()
				this.animationData2 = animation2.export()
			},
			homeSend(){
				this.swiperIndex++
				let animation2 = uni.createAnimation({
					duration: 1000,
				    timingFunction: 'ease',
				}) 
				let animation3 = uni.createAnimation({
					duration: 1000,
				    timingFunction: 'ease',
				}) 
				animation3.scale(1).step()
				animation3.translateX(0).translateY(0).step()
				animation2.translateY(66+'vh').step()
				this.animationData2 = animation2.export()
				this.animationData3 = animation3.export()
			},
		    rotateAndScale: function () {
				// 旋转同时放大
				this.animation.rotate(45).scale(2, 2).step()
				this.animationData = this.animation.export()
			},
		}
	}
</script>

<style lang="scss">

.home{
	overflow: hidden;
	width: 750rpx;
	height: 100vh;
	background-color: #3F536E;
	position:relative;
	.home-bk{
		z-index: -1;
		width: 750rpx;
		height: 100vh;
		filter: blur(8px);
	}
	.home-add{
		padding-top: 100rpx;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		position:absolute;
		left:0;
		top:0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.someMedals{
			width: 58vw;
			height: fit-content;
			margin-top: 3vh;
			display: flex;
			justify-content: center;
			image {
				display: inline-block;
				width: 8vw;
				height: 8vw;
				size: 100%;
				margin-left: 2vw;
			}
			image:nth-of-type(1) {
				display: inline-block;
				width: 8vw;
				height: 8vw;
				size: 100%;
				margin-left: 0vw;
			}
		}
		.someNumber{
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
		& text{
			z-index: 100;
			margin-top: 30rpx;
			width:70%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
			font-size: 30rpx;
			text-align-last: center;
		}
		.home-add-btn{
			position: absolute;
			left: 15vw;
			bottom: 5vh;
			width: 70vw;
			height: 100rpx;
			background-color: #9690ed;
			border-radius: 3%;
		}
		.home-add-md{
			z-index: 999;
			width: 300rpx;
			height: 300rpx;
			position: relative;
			border: 1rpx solid #F8F8F8;
			border-radius: 15rpx;
			box-shadow:  0rpx 5rpx 5rpx 5rpx #1a2122;
			margin-top: -200rpx;
			& image:nth-child(1){
				width: 100%;
				height: 100%;
			}
			& image:nth-child(2){
				position: absolute;
				right:10rpx;
				bottom:20rpx;
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
	.home-send{
		overflow: hidden;
		z-index: 555;
		position: absolute;
		left: 5vw;
		top: 35vh;
		width: 90vw;
		height: 56vh;
		background-color: #ed8e8e;
		border-radius: 3%;
		display: flex;
		flex-direction: column;
		transform: translateY(66vh);
		.home-send-md{
			width: 90vw;
			background-color: #ed8e8e;
			height: 50vh;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			flex-direction: column;
			text{
				margin-left: 8vw;
				margin-top: 30rpx;
				font-size: 40rpx;
				font-weight: 500;
			}
			textarea{
				margin-left: 5vw;
				    width: 75vw;
				margin: 0px auto;
				margin-top: 30rpx;
				padding: 25rpx;
				background-color: #dc5030;
				color: #F8F8F8;
			}
		}
		.home-send-btn{
			position: absolute;
			width: 86vw;
			bottom: 3vh;
			left: 2vw;
			display: flex;
			flex-direction: row;
			justify-content: center;
			button{
				width: 70vw;
				height: 100rpx;
				background-color: #f1e989;
				border-radius: 3%;
			}	
		}
		
	}
}
</style>
