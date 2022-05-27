<template>
	<view class="lookFriend">
		<swiper :current="swiperIndex" vertical="true" circular="true" style="height: 100vh;">
			<swiper-item>
				<view class="home">
					<image :src="homePageData.HeadImg||'../../static/img/memorandum/bk2.jpg'" style="z-index: 9;" mode="" class="home-bk"></image>
					<view class="home-add" :animation="animationData1">
						<view class="home-add-md" :animation="animationData3">
							<image :src="homePageData.HeadImg||'../../static/img/memorandum/bk2.jpg'" mode=""></image>
						</view>
						<text>ID:{{id.slice(-6)}}</text>
						<text>昵称:{{FriendData.Name}}</text>
						<view class="someNumber">
							<text>{{homePageData.goods||0}}</text>
							<text>{{homePageData.FriendsCount}}</text>
							<text>{{homePageData.FanCount}}</text>
						</view>
						<view class="someMedals">
							<image :src="allMedals[item].medalPath" mode="" v-for="(item,index) in homePageData.medals">
							</image>
						</view>
						<text>{{FriendData.motto}}</text>
						<button type="primary" class="home-add-btn" @tap="homeAdd">{{isFriend?'取消关注':'关注Ta'}}</button>
					</view>
				</view>
			</swiper-item>
			<swiper-item id="s11" v-for="(item,index) in handAccountData" :key="index">
				<image id="filterImg" :src="nowBkImg[item.bkImgNumber]"></image>
				<view class="swiper-ver-nav">
					<image :src="homePageData.HeadImg" mode="">
					</image>
					<text>{{FriendData.Name}}</text>
				</view>
				<!-- <view class="swiper-ver-nav" >
					<image :src="homePageData.HeadImg" mode="">
					</image>
					<text>{{FriendData.Name}}</text>
					<image id="selectUser" src="../../static/uview/common/logo.png"></image>
				</view> -->
				<view class="swiper-ver-head">
					<view class="date">{{item.Date.slice(0,10)}}</view>
					<image :src="weatherArray[item.Weather].weatherPath" mode=""></image>
					<image :src="feelArray[item.Feel].feelPath" mode=""></image>
				</view>
				<view class="textmain" @tap="doubleTap(index)">
					<image id="bk" :src="nowBkImg[item.bkImgNumber]"></image>
					<scroll-view :scroll-top="scrollTop" @touchstart.stop="" scroll-y="true"
						style="height: 900rpx;background-color:transparent;z-index: 99; box-sizing: border-box;">
						<editor :id="'editor'+index" read-only="true"
							@ready="onEditorReady(index)"></editor>
					</scroll-view>
					<image id="tz" :src="item1" v-for="(item1,index1) in item.stickerImg"
						:key="parseInt(index1+100)"
						:style="{left:item.stickerImgx[index1]+'px',top:item.stickerImgy[index1]+'px',transform:getScale(item.stickerImgs[index1])}">
					</image>
				</view>
				<view class="opioion" @tap="tapGood(index)">
					<image :src="item.isGood?'../../static/img/more/aixin2.png':'../../static/img/more/aixin.png'"></image><text>{{item.good}}</text>
				</view>
				<view class="getGood" :animation="goodAnimation">
					<image src="../../static/img/more/aixin2.png"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				UserID: '',
				status: '',
				swiperIndex: 0,
				homePageData: {},
				FriendData: {},
				allMedals: [],
				isFriend: true,
				handAccountData: [],
				animationData1: {},
				animationData2: {},
				animationData3: {},
				addGoodArr:[],
				goodAnimation:null,
				nowBkImg: ["../../static/img/bkImg/pmoon.jpg", "../../static/img/bkImg/pdouble.jpg",
					"../../static/img/bkImg/double.jpg", "../../static/img/bkImg/free.jpg",
					"../../static/img/bkImg/eat.jpg", "../../static/img/bkImg/fly.jpg",
					"../../static/img/bkImg/girl.jpg"
				],
				stickerArray: [], //贴纸总数据
				backgroundImgArray: [], //心情总数据
				weatherArray: [], //天气总数据
				touchNum:0
			}
		},
		methods: {
			tapGood(index){
				this.$set(this.handAccountData[index],"isGood",!this.handAccountData[index].isGood)
				if(this.handAccountData[index].isGood === true) {
					if(this.goodAnimation)return 
					this.addGoodArr.push(this.handAccountData[index]._id)
					this.$set(this.handAccountData[index],"good",this.handAccountData[index].good + 1)
					this.goodAnimation = uni.createAnimation({
						timingFunction: 'ease',
					})
					this.goodAnimation.opacity(0.5).step({duration: 200})
					this.goodAnimation.scale(1.0).opacity(0.9).step({duration: 400})
					this.goodAnimation.translateX(16 + 'vw').translateY(-16 + 'vh').opacity(0).step({duration: 1200})
					this.goodAnimation.scale(0).translateX(0 + 'vw').translateY(0 + 'vh').step({duration: 100})
					this.goodAnimation=this.goodAnimation.export()
					setTimeout(()=>{
						this.goodAnimation = null
					},1900)
				}else{
					this.$set(this.handAccountData[index],"good",this.handAccountData[index].good -1)
					this.handAccountData[index].funs = this.handAccountData[index].funs.filter(item=>{
						return item != this.id
					})
				}
			},
			doubleTap(index) {
				// console.log("doubleTap", index,)
				this.touchNum++
				setTimeout(() => {
					if (this.touchNum == 1) {
						console.log('单击')
					}
					if (this.touchNum >= 2) {
						console.log('双击')
						if(this.goodAnimation || this.handAccountData[index].isGood)return
						this.addGoodArr.push(this.handAccountData[index]._id)
						this.$set(this.handAccountData[index],"good",this.handAccountData[index].good + 1)
						this.goodAnimation = uni.createAnimation({
							timingFunction: 'ease',
						})
						this.goodAnimation.opacity(0.5).step({duration: 200})
						this.goodAnimation.scale(1.0).opacity(0.9).step({duration: 400})
						this.goodAnimation.translateX(16 + 'vw').translateY(-16 + 'vh').opacity(0).step({duration: 1200})
						this.goodAnimation.scale(0).translateX(0 + 'vw').translateY(0 + 'vh').step({duration: 100})
						this.goodAnimation=this.goodAnimation.export()
						setTimeout(()=>{
							this.goodAnimation = null
						},1900)
						this.$set(this.handAccountData[index],"isGood",true)
					}
					this.touchNum = 0
				}, 250)
			},
			homeAdd() {
				this.isFriend = !this.isFriend
			},
			onEditorReady(index) {
				let that = this;
				uni.createSelectorQuery().select('#editor' + index).context((res) => {
					this.editorCtx = res.context
					this.editorCtx.setContents({
						html: that.handAccountData[index].Text
					})
				}).exec()
			},
			getScale(s) {
				return `transform:scale(${s})`
			},
		},
		async onUnload() {
			const haArray = this.handAccountData
			const id =this.id
			let userGood = 0
			haArray.forEach(async (item,index)=>{
				console.log("item.isGood",1)
				if(item.isGood&&this.addGoodArr.includes(item._id)){
					userGood++
					//记录点赞者id
					item.funs.push(id)
					item.funs = Array.from(new Set(item.funs))
					const data1 = {
						_id:item._id,
						funs:item.funs
					}
					console.log("item2.isGood",2,data1)
					uni.request({
						url:'http://120.76.138.164:3000/handAccount/addFun',
						data:data1
					}).then(res=>{
						console.log("addFun",res)
					})
					//增加作品赞数
					const data2 = {
						_id:item._id,
						goodNum:item.good + 1
					}
					uni.request({
						url:'http://120.76.138.164:3000/handAccount/addGood',
						data:data2
					}).then(res=>{
						console.log("addGood",res)
					})
				}
			})
			const data3 = {
				_id:id,
				goods:''
			}
			const homePageData = await uni.request({
				url: 'http://120.76.138.164:3000/homePage/queryHomePage?data=' + id 
			})
			data3.goods = homePageData[1].data.data[0].goods + userGood
			console.log("success",homePageData)
			uni.request({
				url: "http://120.76.138.164:3000/homePage/updateGood",
				data: data3
			})
			if (this.isFriend == false) {
				console.log(this.status)
				let deleteFriendID1 = ''
				let deleteFriendID2 = ''
				if (this.status == 1) {
					deleteFriendID1=this.id
				} else {
					deleteFriendID2=this.id
				}
				let r = {
					UserID: this.UserID,
					deleteFriendID1: deleteFriendID1,
					deleteFriendID2: deleteFriendID2
				}
				uni.request({
						url: 'http://120.76.138.164:3000/relationship/deleteRelationship',
						data: r
					})
					.then((data) => {
						console.log('ok1')
					})
			}
		},

		onLoad(option) {
			let that = this
			this.id = option.id
			this.status = option.status
			console.log(option.id)
			let data1 = {
				_id: option.id
			}
			uni.getStorage({
				key: 'UserID',
				success: (res) => {
					console.log('userid', res.data)
					this.UserID = res.data
				}
			})
			uni.request({
					url: 'http://120.76.138.164:3000/handAccount/getHandAccounts?data=' + option.id
				})
				.then(data => {
					let [err1, res1] = data
					let result = res1.data.data
					//若无手账则不添加自身
					if (result.length == 0) {
						return
					}
					let handAccount1 = result
					handAccount1 = handAccount1.filter((item) => {
						return item.Public == true
					})
					handAccount1.forEach((item) => {
						item.stickerImg = item.stickerImg.toString().split(",")
						item.stickerImgs = item.stickerImgs.toString().split(",")
						item.stickerImgx = item.stickerImgx.toString().split(",")
						item.stickerImgy = item.stickerImgy.toString().split(",")
						item.isGood = item.funs.includes(this.UserID)
					})
					that.handAccountData = handAccount1
				})
			uni.request({
					url: 'http://120.76.138.164:3000/user/queryUserById',
					data: data1
				})
				.then(data => {
					let [err, res1] = data
					let friend = {}
					console.log('qi',res1)
					that.FriendData = res1.data.data
					that.homePageData.HeadImg = res1.data.data.HeadImg
					that.homePageData.motto = res1.data.data.motto
				})
			uni.request({
					url: 'http://120.76.138.164:3000/homePage/queryHomePage?data=' + option.id
				})
				.then((data) => {
					let [err, res] = data
					// that.homePageData.HeadImg = res.data.data[0].HeadImg,
					// 	that.homePageData.motto = res.data.data[0].motto,
					console.log("queryHomePage",res)
						that.homePageData.FanCount = res.data.data[0].FanCount,
						that.homePageData.FriendsCount = res.data.data[0].FriendsCount,
						that.homePageData.workCount = res.data.data[0].workCount,
						that.homePageData.medals = res.data.data[0].medals
					that.homePageData.goods = res.data.data[0].goods
				})
			uni.request({
					url: 'http://120.76.138.164:3000/medal/getMedals'
				})
				.then((data1) => {
					let [err1, res1] = data1
					that.allMedals = res1.data.data
				})
				uni.request({
					url: 'http://120.76.138.164:3000/creation/getCreationInfo'
				}).then(data => {
					let [err1, res1] = data
					let result = res1.data.data
					that.feelArray = result.feels || []
					// that.stickerArray = result.stickers||[]
					that.weatherArray = result.weathers || []
					that.backgroundImgArray = result.backgroundImgs || []
					that.$forceUpdate()
				})
			uni.request({
					url: 'http://120.76.138.164:3000/relationship/queryRelationship?data=' +
						'{"UserID":"' + option.id + '","status":[0,1,2]}'
				})
				.then(data => {
					let [err, res] = data
					let fun = 0
					let friend = 0
					res.data.data.forEach((item) => {
						if (item.status == 0 || item.status == 2) fun++;
						if (item.status == 1 || item.status == 2) friend++
					})
					that.homePageData.FanCount = fun
					that.homePageData.FriendsCount = friend
					that.$forceUpdate()
				})
		}

	}
</script>

<style lang="scss">
	$content-h:75vh;
	$content-w:90vw;
	$border_radius:30rpx;
	$imgSize:4vh;
	$optionImgSize:5vh;
	

	editor {
		z-index: 88;
		height: 71vh !important;
	}

	#s11 {
		background-color: rgba(251, 232, 232, 0.9);
		height: 100vh;
		width: 100vw;
		touch-action: none;
	
		.swiper-ver-nav {
			width: 100vw;
			height: 8vh;
			background-image: linear-gradient(rgb(80,151,242), rgba(205,239,250,90%),rgba(183,203,248 ,75%));
			position: fixed;
			top: 0vh;
			left: 0;
			padding: 1vh 10vw;
			box-sizing: border-box;
	
			image {
				position: center;
				width: 6vh;
				height: 6vh;
				border-radius: 100%;
				object-fit: cover;
			}
	
			text {
				display: inline-block;
				height: 8vh;
				margin-left: 10vw;
				font-size: $fontSize-md;
				font-weight: 500;
				vertical-align: middle;
				margin-left: 5vw;
			}
	
			#selectUser {
				float: right;
				margin-top: 1vh;
				position: center;
				width: 4vh;
				height: 4vh;
				border-radius: 100%;
				object-fit: cover;
			}
		}
	
		.swiper-ver-head {
			width: 100vw;
			height: 6vh;
			margin-top: 9vh;
			padding: 0.5vh 5vw;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
	
			&>image:nth-of-type(1) {
				display: inline-block;
				margin-left: -12vw;
				width: $imgSize-md;
				height: $imgSize-md;
				object-fit: cover;
			}
	
			&>image:nth-of-type(2) {
				margin-right: 6vw;
				width: $imgSize-md;
				height: $imgSize-md;
				object-fit: cover;
			}
	
			.date {
				width: 30vw;
				height: 5vh;
				display: inline-block;
				z-index: 999;
	
				view {
					width: 30vw;
					height: 5vh;
					background-color: ragb(221, 160, 221, 0.5);
					text-align: center;
					font-size: $fontSize-lg;
					line-height: 5vh;
				}
			}
		}
	
		.textmain {
			width: $content-w;
			height: $content-h;
			margin: 0.5vh auto;
			box-sizing: border-box;
			position: relative;
			padding: 2vh 5vw;
			border: 1rpx solid transparent;
			border-radius: $border_radius;
			box-shadow: 0rpx 0rpx 55rpx $shadowC2;
	
			& #bk {
				opacity: 0.8;
				width: $content-w;
				height: $content-h;
				position: absolute;
				left: 0;
				top: 0;
				size: 100%;
				display: block;
				border-radius: $border_radius;
			}
	
			& #content {
				width: calc(90vw - 60rpx);
				height: 70vh;
				margin: auto;
				display: block;
				font-size: $fontSize-md;
				overflow: auto;
				z-index: 1;
			}
	
			& #tz {
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				width: 10vh;
				height: 10vh;
				size: 100%;
				z-index: 2;
			}
		}
	
		.opioion {
			// overflow: scroll;
			position: fixed;
			width: 15vw;
			margin: 0 auto;
			height: 11vw;
			/* background-color: #A0CFFF; */
			bottom: 30rpx;
			right: 12vw;
			z-index: 9;
			display: flex;
			justify-content: space-between;
			align-items: center;
	
			image {
				width: 80%;
				height: 100%;
				size: 100%;
				min-width: 80%;
			}
	
			.opioion-scroll {
				height: 42vh;
				width: 80vw;
			}
	
			.opioion-nav {
				width: inherit;
				height: 7vh;
				background-color: #2979FF;
				display: flex;
				flex-direction: row;
				align-items: center;
				position: relative;
	
				& image:nth-of-type(1) {
					position: absolute;
					left: 5vw;
					top: auto;
					width: $optionImgSize;
					height: $optionImgSize;
					display: inline-block;
					vertical-align: middle;
				}
	
				& text:nth-of-type(1) {
					position: absolute;
					left: calc(6vh + 7vw);
					top: auto;
					line-height: $optionImgSize;
					display: inline-block;
					vertical-align: middle;
				}
	
				& image:nth-of-type(2) {
					position: absolute;
					right: 7vw;
					top: auto;
					width: $optionImgSize;
					height: $optionImgSize;
					display: inline-block;
				}
	
				& text:nth-of-type(2) {
					position: absolute;
					right: 2vw;
					top: auto;
					line-height: $optionImgSize;
					display: inline-block;
					vertical-align: middle;
				}
			}
	
			.opioion-main {
				width: 80vw;
				height: 17vh;
				display: flex;
				flex-direction: column;
				justify-content: center;
				display: inline-block;
				background-color: #8F939C;
				padding: 1.5vh 5vw;
				box-sizing: border-box;
	
				.main-nav {
					& image {
						width: $imgSize-md;
						height: $imgSize-md;
						border-radius: 100%;
						vertical-align: middle;
					}
	
					& text {
						margin: 0;
						width: fit-content;
						height: $imgSize-md;
						line-height: $imgSize-md;
						display: inline-block;
						vertical-align: middle;
						font-size: $fontSize-md;
						font-weight: 600;
						margin-left: 2vw;
					}
				}
	
				& text {
					font-size: $fontSize-sm;
					margin-top: 1.3vh;
					display: inline-block;
					font-weight: 500;
				}
			}
		}
			
		.getGood {
			position: absolute;
			top:0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			width: 24vw;
			height: 23vw;
			transform: scale(0);
			z-index: 9999;
			image{
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		.moveArea {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 90vw;
			height: 80vw;
			margin: 0 auto;
			background-color: #F0AD4E;
	
			.moveView {
				width: 20vw;
				height: 15vh;
				background-color: #A0CFFF;
			}
		}
	}
	.home {
		overflow: hidden;
		width: 750rpx;
		height: 100vh;
		background-color: #3F536E;
		position: relative;

		.home-bk {
			z-index: -1;
			width: 750rpx;
			height: 100vh;
			filter: blur(8px);
		}

		.home-add {
			padding-top: 100rpx;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.someMedals {
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

			.someNumber {
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
						white-space: nowrap;
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
						white-space: nowrap;
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
						white-space: nowrap;
					}
				}
			}

			& text {
				z-index: 100;
				margin-top: 30rpx;
				width: 70%;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				font-size: 30rpx;
				text-align-last: center;
			}

			.home-add-btn {
				position: absolute;
				left: 15vw;
				bottom: 5vh;
				width: 70vw;
				height: 100rpx;
				background-color: #9690ed;
				border-radius: 3%;
				z-index: 9;
			}

			.home-add-md {
				z-index: 999;
				width: 300rpx;
				height: 300rpx;
				position: relative;
				border: 1rpx solid #F8F8F8;
				border-radius: 15rpx;
				box-shadow: 0rpx 5rpx 5rpx 5rpx #1a2122;
				margin-top: -200rpx;

				& image:nth-child(1) {
					width: 100%;
					height: 100%;
				}

				& image:nth-child(2) {
					position: absolute;
					right: 10rpx;
					bottom: 20rpx;
					width: 50rpx;
					height: 50rpx;
				}
			}
		}

		.home-send {
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

			.home-send-md {
				width: 90vw;
				background-color: #ed8e8e;
				height: 50vh;
				display: flex;
				justify-content: center;
				align-items: flex-start;
				flex-direction: column;

				text {
					margin-left: 8vw;
					margin-top: 30rpx;
					font-size: 40rpx;
					font-weight: 500;
				}

				textarea {
					margin-left: 5vw;
					width: 75vw;
					margin: 0px auto;
					margin-top: 30rpx;
					padding: 25rpx;
					background-color: #dc5030;
					color: #F8F8F8;
				}
			}

			.home-send-btn {
				position: absolute;
				width: 86vw;
				bottom: 3vh;
				left: 2vw;
				display: flex;
				flex-direction: row;
				justify-content: center;

				button {
					width: 70vw;
					height: 100rpx;
					background-color: #f1e989;
					border-radius: 3%;
				}
			}

		}
	}
</style>
