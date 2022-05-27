<template>
	<view class="lookFriend">
		<swiper :current="swiperIndex" vertical="true" circular="true" style="height: 100vh;">
			<swiper-item>
				<view class="home">
					<image :src="homePageData.HeadImg||'../../static/img/memorandum/bk2.jpg'" style="z-index: 9;" class="home-bk"></image>
					<view class="home-add" :animation="animationData1">
						<view class="home-add-md" :animation="animationData3">
							<image :src="homePageData.HeadImg||'../../static/img/memorandum/bk2.jpg'" mode=""></image>
						</view>
						<text>ID:{{id.slice(-6)}}</text>
						<text>昵称:{{FriendData.Name}}</text>
						<view class="someNumber">
							<text>{{homePageData.goods}}</text>
							<text>{{homePageData.FriendsCount}}</text>
							<text>{{homePageData.FanCount}}</text>
						</view>
						<view class="someMedals">
							<image :src="allMedals[item].medalPath" mode="" v-for="(item,index) in homePageData.medals">
							</image>
						</view>
						<text>{{FriendData.motto}}</text>
						<button type="primary" class="home-add-btn" @tap="homeAdd">{{isFriend?'已关注':'加为好友'}}</button>
					</view>
					<view class="home-send" :animation="animationData2">
						<view class="home-send-md">
							<text>{{FriendData.Name}}</text>
							<textarea value="" placeholder="快和Ta介绍一下自己吧~~" placeholder-style="color:#464646" />
						</view>
						<view class="home-send-btn">
							<button type="default" @tap="homeSend()">查看作品</button>
						</view>
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
				handAccountData: [],
				animationData1: {},
				animationData2: {},
				animationData3: {},
				allMedals: [],
				isFriend: false,
				nowBkImg: ["../../static/img/bkImg/pmoon.jpg", "../../static/img/bkImg/pdouble.jpg",
					"../../static/img/bkImg/double.jpg", "../../static/img/bkImg/free.jpg",
					"../../static/img/bkImg/eat.jpg", "../../static/img/bkImg/fly.jpg",
					"../../static/img/bkImg/girl.jpg"
				],
				stickerArray: [{
					"_id": "61a788c57533c4e420813108",
					"stickerNumber": 1,
					"stickerName": "海豚",
					"stickerPath": "../../static/img/tzIcon/haitun.png",
					"__v": 0
				}, {
					"_id": "61a78c414f9717e4a8eeaf7f",
					"stickerNumber": 2,
					"stickerName": "花儿",
					"stickerPath": "../../static/img/tzIcon/hua3.png",
					"__v": 0
				}, {
					"_id": "61a78c414f9717e4a8eeaf81",
					"stickerNumber": 4,
					"stickerName": "赤兔",
					"stickerPath": "../../static/img/tzIcon/ma.png",
					"__v": 0
				}, {
					"_id": "61a78c414f9717e4a8eeaf80",
					"stickerNumber": 3,
					"stickerName": "小脑虎",
					"stickerPath": "../../static/img/tzIcon/laohu.png",
					"__v": 0
				}, {
					"_id": "61a78c414f9717e4a8eeaf82",
					"stickerNumber": 5,
					"stickerName": "大蘑菇",
					"stickerPath": "../../static/img/tzIcon/mogu.png",
					"__v": 0
				}, {
					"_id": "61a78c414f9717e4a8eeaf83",
					"stickerNumber": 6,
					"stickerName": "牛宝",
					"stickerPath": "../../static/img/tzIcon/niu.png",
					"__v": 0
				}, {
					"_id": "61a78c414f9717e4a8eeaf84",
					"stickerNumber": 7,
					"stickerName": "大螃蟹",
					"stickerPath": "../../static/img/tzIcon/pangxie.png",
					"__v": 0
				}, {
					"_id": "61a78c414f9717e4a8eeaf85",
					"stickerNumber": 8,
					"stickerName": "仙人掌",
					"stickerPath": "../../static/img/tzIcon/xianrenzhang.png",
					"__v": 0
				}, {
					"_id": "61a78c414f9717e4a8eeaf86",
					"stickerNumber": 9,
					"stickerName": "栅栏",
					"stickerPath": "../../static/img/tzIcon/zhalan.png",
					"__v": 0
				}, {
					"_id": "61a78c414f9717e4a8eeaf87",
					"stickerNumber": 10,
					"stickerName": "猪宝宝",
					"stickerPath": "../../static/img/tzIcon/zhu.png",
					"__v": 0
				}], //贴纸总数据
				backgroundImgArray: [{
					"_id": "61a77a5309de386fef91088b",
					"bkImgNumber": 1,
					"bkImgName": "粉色夏日",
					"bkImgPath": "../../static/img/bkImg/bk1.jpg",
					"__v": 0
				}, {
					"_id": "61a77bf66d1c1d1e7077f12d",
					"bkImgNumber": 2,
					"bkImgName": "碧水中月",
					"bkImgPath": "../../static/img/bkImg/bk2.jpg"
				}, {
					"_id": "61a77bf66d1c1d1e7077f12e",
					"bkImgNumber": 3,
					"bkImgName": "闲逸吉他",
					"bkImgPath": "../../static/img/bkImg/bk3.jpg"
				}, {
					"_id": "61a77bf66d1c1d1e7077f12f",
					"bkImgNumber": 4,
					"bkImgName": "落日阳台",
					"bkImgPath": "../../static/img/bkImg/bk4.jpg"
				}, {
					"_id": "61a77bf66d1c1d1e7077f130",
					"bkImgNumber": 5,
					"bkImgName": "草莓与花",
					"bkImgPath": "../../static/img/bkImg/bk5.jpg"
				}, {
					"_id": "61a77bf66d1c1d1e7077f131",
					"bkImgNumber": 6,
					"bkImgName": "熊熊开门",
					"bkImgPath": "../../static/img/bkImg/bk6.jpg"
				}, {
					"_id": "61a77bf66d1c1d1e7077f132",
					"bkImgNumber": 7,
					"bkImgName": "动物狂欢",
					"bkImgPath": "../../static/img/bkImg/bk7.jpg"
				}], //背景总数据
				feelArray: [{
					"_id": "61c2e347bc1e29458db599c0",
					"feelNumber": 0,
					"feelName": "生气",
					"feelPath": "../../static/img/feel/angry.png"
				}, {
					"_id": "61c2e347bc1e29458db599c1",
					"feelNumber": 1,
					"feelName": "快乐",
					"feelPath": "../../static/img/feel/cool.png"
				}, {
					"_id": "61c2e347bc1e29458db599c2",
					"feelNumber": 2,
					"feelName": "哭泣",
					"feelPath": "../../static/img/feel/cry.png"
				}, {
					"_id": "61c2e347bc1e29458db599c3",
					"feelNumber": 3,
					"feelName": "郁闷",
					"feelPath": "../../static/img/feel/injury.png"
				}, {
					"_id": "61c2e347bc1e29458db599c4",
					"feelNumber": 4,
					"feelName": "甜蜜",
					"feelPath": "../../static/img/feel/kiss.png"
				}, {
					"_id": "61c2e347bc1e29458db599c5",
					"feelNumber": 5,
					"feelName": "难过",
					"feelPath": "../../static/img/feel/sad.png"
				}, {
					"_id": "61c2e347bc1e29458db599c6",
					"feelNumber": 6,
					"feelName": "睡觉",
					"feelPath": "../../static/img/feel/sleeping.png"
				}], //心情总数据
				weatherArray: [{
					"_id": "61c2e71abc1e29458db599c7",
					"weatherNumber": 0,
					"weatherName": "晴日",
					"weatherPath": "../../static/img/weather/qingtian.png"
				}, {
					"_id": "61c2e71abc1e29458db599c8",
					"weatherNumber": 1,
					"weatherName": "多云",
					"weatherPath": "../../static/img/weather/shaoyun.png"
				}, {
					"_id": "61c2e71abc1e29458db599c9",
					"weatherNumber": 2,
					"weatherName": "小雨",
					"weatherPath": "../../static/img/weather/baoyu.png"
				}, {
					"_id": "61c2e71abc1e29458db599ca",
					"weatherNumber": 3,
					"weatherName": "雷雨",
					"weatherPath": "../../static/img/weather/leizhenyu.png"
				}, {
					"_id": "61c2e71abc1e29458db599cb",
					"weatherNumber": 4,
					"weatherName": "小雪",
					"weatherPath": "../../static/img/weather/daxue.png"
				}, {
					"_id": "61c2e71abc1e29458db599cc",
					"weatherNumber": 5,
					"weatherName": "雾",
					"weatherPath": "../../static/img/weather/wu.png"
				}, {
					"_id": "61c2e71abc1e29458db599cd",
					"weatherNumber": 6,
					"weatherName": "雷阵雨",
					"weatherPath": "../../static/img/weather/tedazhenyu.png"
				}], //天气总数据
			}
		},
		onLoad(option) {
			let that = this
			this.id = option.id
			this.status = option.status
			console.log('friendID',option.id)
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
					url: 'http://120.76.138.164:3000/handAccount/getHandAccounts?data=' + this.$data.id
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
					console.log('hp',res)
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
					let isF = res.data.data.filter(item=>{
						return item.PeopleID ==this.$data.id
					})
					if(isF.length!=0&&isF[0].status !=0 ){
						this.$data.isFriend == true
					}
					that.homePageData.FanCount = fun
					that.homePageData.FriendsCount = friend
					this.$forceUpdate()
				})
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
				if(this.isFriend == true) return
				this.isFriend = true
				let animation2 = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease',
				})
				let animation3 = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease',
				})
				animation3.scale(0.8).step()
				animation3.translateX(-28 + 'vw').translateY(12 + 'vh').step()
				animation2.translateY(10 + 'vh').step()

				this.animationData3 = animation3.export()
				this.animationData2 = animation2.export()
				let data1 = {
					UserID:this.UserID,
					PeopleID:this.id
				}
				uni.request({
					url:'http://120.76.138.164:3000/relationship/addRelationship',
					data:data1
				})
				.then((data)=>{
					let [err,res]=data	
				})
			},
			homeSend() {
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
				animation2.translateY(66 + 'vh').step()
				this.animationData2 = animation2.export()
				this.animationData3 = animation3.export()
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
			background-color: #a3d5f6;
			border-radius: 3%;
			display: flex;
			flex-direction: column;
			transform: translateY(66vh);

			.home-send-md {
				width: 90vw;
				background-color: #a3d5f6;
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
					background-color: #fdfeff;
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
					background-color: #89b5f1;
					border-radius: 3%;
				}
			}

		}
	}
</style>
