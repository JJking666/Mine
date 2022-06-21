<template>
	<view class="handAccount">
		<view id="nothing" v-if="handAccountData.length==0">
			<image src="../../static/img/bkImg/bk6.jpg" mode=""></image>
			<text>回到主页</text>
			<image src="../../static/img/more/biaoqianA01_biji-94.png" mode="" @tap="gotoMemorandum"></image>
			<text>快来发布些手账吧</text>
			<image src="../../static/img/more/biaoqianA01_biji-94.png" mode="" @tap="gotoCreation"></image>
			<text>添加些好友呀</text>
			<image src="../../static/img/more/xiangkan.png" mode="" @tap="gotoFriend"></image>
		</view>
		<swiper class="swiper-hor" easing-function="easeOutCubic" circular :interval="interval"
			v-if="handAccountData.length!=0" :duration="duration">
			<swiper-item id="s1" v-for="(item0,index0) in handAccountData" :key="parseInt(index0+1000)">
				<swiper class="swiper-ver" easing-function="easeOutCubic" circular vertical :interval="interval"
					:duration="duration">
					<swiper-item id="s11" v-for="(item,index) in item0" :key="index">
						<image id="filterImg" :src="nowBkImg[item.bkImgNumber]"></image>
						<view class="swiper-ver-nav">
							<image v-if="FriendArray&&FriendArray[index0].headImg"
								:src="FriendArray[index0].headImg||'../../static/img/icon.jpg'" mode=""></image>
							<text>{{FriendArray[index0].name}}</text>
							<image id="selectUser" src="../../static/img/common/home.png" @tap="gotoMemorandum">
							</image>
						</view>
						<view class="swiper-ver-head">
							<view class="date ">{{item.Date.slice(0,10)}}</view>
							<image :src="weatherArray[item.Weather].weatherPath" mode=""></image>
							<image :src="feelArray[item.Feel].feelPath" mode=""></image>
						</view>
						<view class="textmain" @tap="doubleTap(index0,index)">
							<image id="bk" :src="nowBkImg[item.bkImgNumber]"></image>
							<scroll-view :scroll-top="scrollTop" @touchstart.stop="" scroll-y="true"
								style="height: 900rpx;background-color:transparent;z-index: 99; box-sizing: border-box;">
								<editor :id="'editor'+index0+index" read-only="true"
									@ready="onEditorReady(index0,index)"></editor>
							</scroll-view>
							<image id="tz" :src="item1" v-for="(item1,index1) in item.stickerImg"
								:key="parseInt(index1+100)"
								:style="{left:item.stickerImgx[index1]+'px',top:item.stickerImgy[index1]+'px',transform:getScale(item.stickerImgs[index1])}">
							</image>
						</view>
						<view class="opioion" @tap="tapGood(index0,index)">
							<image :src="item.isGood?'../../static/img/more/aixin2.png':'../../static/img/more/aixin.png'"></image><text>{{item.good}}</text>
						</view>
						<view class="getGood" :animation="goodAnimation">
							<image src="../../static/img/more/aixin2.png"></image>
						</view>
						<!-- <view class="opioion" :animation = "opAnimation">
							<view class="opioion-nav" @tap="showOpioion" @blur="showOpioion">
								<image src="../../static/img/icon.jpg"></image><text >2</text>
								<image src="../../static/img/memorandum/dm1.jpg"></image><text>2</text>
							</view>
							<scroll-view class="opioion-scroll" scroll-y="true" @scroll="scroll">
								<view class="opioion-main" @click="say">
									<view class="main-nav">
										<image src="../../static/img/memorandum/bk2.jpg" ></image>
										<text>大白菜</text>
									</view>
									<text>阿巴阿巴阿巴啊叭叭叭阿宝阿坝吧阿叭叭阿巴巴巴</text>
								</view>
								<view class="opioion-main">
									<view class="main-nav">
										<image src="../../static/img/memorandum/bk2.jpg"></image>
										<text>大白菜</text>
									</view>
									<text>阿巴阿巴阿巴啊叭叭叭阿宝阿坝吧阿叭叭阿巴巴巴</text>
								</view>
								
								<view class="opioion-main">
									<view class="main-nav">
										<image src="../../static/img/memorandum/bk2.jpg"></image>
										<text>大白菜</text>
									</view>
									<text>阿巴阿巴阿巴啊叭叭叭阿宝阿坝吧阿叭叭阿巴巴巴</text>
								</view>
							</scroll-view>
						</view> -->
					</swiper-item>
				</swiper>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import Qs from 'qs'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				goodAnimation:null,
				touchNum: 0,
				getGood: [],
				nowBkImg: ["../../static/img/bkImg/pmoon.jpg", "../../static/img/bkImg/pdouble.jpg",
					"../../static/img/bkImg/double.jpg", "../../static/img/bkImg/free.jpg",
					"../../static/img/bkImg/eat.jpg", "../../static/img/bkImg/fly.jpg",
					"../../static/img/bkImg/girl.jpg"
				],
				id: '',
				scr: true,
				handAccountData: [],
				addGoodArr:[],
				delGoodArr:[],
				stickerArray: [], //贴纸总数据
				backgroundImgArray: [], //背景总数据
				feelArray: [], //心情总数据
				weatherArray: [], //天气总数据
				FriendArray: [{
					"id": "61a57f00e4a7438b252b1635",
					"headImg": "../../static/img/icon.jpg",
					"name": "大白菜",
					"sex": "woman"
				}, {
					"status": 1,
					"id": "61a488a32be844636ac72344",
					"headImg": "../../static/img/icon.jpg",
					"name": "马崇濠",
					"sex": "man"
				}], //关注列表数据
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				opAnimation: {},
				showOp: false,
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				interval: 2000,
				duration: 500,
				title: 'picker',
				array: ['中国', '美国', '巴西', '日本'],
				index: 0,
				date: currentDate,
				x: 0,
				y: 0,
				old: {
					x: 0,
					y: 0
				}
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			tapGood(i0, i1){
				this.$set(this.handAccountData[i0][i1],"isGood",!this.handAccountData[i0][i1].isGood)
				if(this.handAccountData[i0][i1].isGood === true) {
					this.addGoodArr.push(this.handAccountData[i0][i1]._id)
					if(this.goodAnimation)return 
					this.$set(this.handAccountData[i0][i1],"good",this.handAccountData[i0][i1].good + 1)
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
					this.$set(this.handAccountData[i0][i1],"good",this.handAccountData[i0][i1].good -1)
					this.handAccountData[i0][i1].funs = this.handAccountData[i0][i1].funs.filter(item=>{
						return item != this.id
					})
					this.delGoodArr.push(this.handAccountData[i0][i1]._id)
				}
			},
			doubleTap(i0, i1) {
				console.log("doubleTap", i0, i1,)
				this.touchNum++
				setTimeout(() => {
					if (this.touchNum == 1) {
						console.log('单击')
					}
					if (this.touchNum >= 2) {
						console.log('双击')
						this.addGoodArr.push(this.handAccountData[i0][i1]._id)
						if(this.goodAnimation || this.handAccountData[i0][i1].isGood)return
						this.$set(this.handAccountData[i0][i1],"good",this.handAccountData[i0][i1].good + 1)
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
						this.$set(this.handAccountData[i0][i1],"isGood",true)
					}
					this.touchNum = 0
				}, 250)
			},
			gotoCreation() {
				uni.navigateTo({
					url: '../Creation/creation'
				})
			},
			gotoFriend() {
				uni.navigateTo({
					url: '../Friends/friends'
				})
			},
			getScale(s) {
				return `transform:scale(${s})`
			},
			scroll: function (e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			scrolling(e) {
				console.log('sss', e)
				this.scrolling = false
			},
			say() {
				console.log(this.handAccountData)
				console.log(11)
			},
			bindPickerChange: function (e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindDateChange: function (e) {
				this.date = e.target.value
			},
			gotoMemorandum() {
				uni.reLaunch({
					url: '../Memorandum/memorandum'
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			showOpioion() {
				if (!this.showOp) {
					this.opanimation.height(49 + 'vh').step()
					this.showOp = !this.showOp
				} else {
					uni.switchTab({
						url: '../Memorandum/memorandum'
					})
					this.opanimation.height(7 + 'vh').step()
					this.showOp = !this.showOp
				}
				this.opAnimation = this.opanimation.export()
			},
			onEditorReady(index0, index) {
				let that = this;
				uni.createSelectorQuery().select('#editor' + index0 + index).context((res) => {
					this.editorCtx = res.context
					this.editorCtx.setContents({
						html: that.handAccountData[index0][index].Text
					})
				}).exec()
			},
		},
		onShow() {
			console.log('show')
			wx.hideTabBar()
		},
		onHide() {
			console.log('hide')
			wx.showTabBar()
		},
		onUnload() {
			const haArray = this.handAccountData
			const id =this.id
			haArray.forEach(async(item1,index1)=>{
				let userGood = 0
				item1.forEach(async (item2,index2)=>{
					console.log("item2.isGood",1)
					//增加作品赞数
					const data2 = {
						_id:item2._id,
						goodNum:item2.good
					}
					uni.request({
						url:'http://120.76.138.164:3000/handAccount/addGood',
						data:data2
					}).then(res=>{
						console.log("addGood",res)
					})	
					if(item2.isGood&&this.addGoodArr.includes(item2._id)){
						userGood++
						//记录点赞者id
						item2.funs.push(id)
						item2.funs = Array.from(new Set(item2.funs))
						const data1 = {
							_id:item2._id,
							funs:item2.funs
						}
						console.log("item2.isGood",2,data1)
						uni.request({
							url:'http://120.76.138.164:3000/handAccount/addFun',
							data:data1,
							method:'POST'
						}).then(res=>{
							console.log("addFun",res)
						})
					}
					if(!item2.isGood&&this.delGoodArr.includes(item2._id)){
						const data1 = {
							_id:item2._id,
							funs:item2.funs
						}
						console.log("item2.isGood",2,data1)
						uni.request({
							url:'http://120.76.138.164:3000/handAccount/addFun',
							data:data1,
							method:'POST'
						}).then(res=>{
							console.log("addFun",res)
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
				await uni.request({
					url: "http://120.76.138.164:3000/homePage/updateGood",
					data: data3
				})
				// item2.funs = Array.from(new Set(item2.funs))
				// const data1 = {
				// 	_id:item2._id,
				// 	funs:item2.funs
				// }
				// console.log("item2.isGood",2,data1)
				// uni.request({
				// 	url:'http://120.76.138.164:3000/handAccount/addFun',
				// 	data:data1,
				// 	method:'POST'
				// }).then(res=>{
				// 	console.log("addFun",res)
				// })
				// .then((data) => {
				// 	let [err, res] = data
				// 	that.homePageData.goods =res.data.data[0].goods
				// })
			})
		},
		onReady() {
			console.log('ready')
			let that = this
			// uni.$on('getUser',that.getUser)
			let opanimation = uni.createAnimation({
				duration: 1000,
				timingFunction: 'ease',
			})
			this.opanimation = opanimation
			uni.getStorage({
				key: 'UserID',
				success:async (res) => {
					that.$data.id = res.data
					that.handAccountData = [] //手账数据
					//that.stickerArray=[]//贴纸总数据
					that.backgroundImgArray = [] //背景总数据
					that.feelArray = [] //心情总数据
					that.weatherArray = [] //天气总数据
					that.FriendArray = [] //关注列表数据
					
					//添加自身手账
					console.log(that.FriendArray)
					uni.request({
						url: 'http://120.76.138.164:3000/handAccount/getHandAccounts?data=' + this.$data.id
					}).then(data => {
						let [err1, res1] = data
						let result = res1.data.data
						//若无手账则不添加自身
						if (result.length == 0) {
							return
						}
						let handAccount = result
						handAccount.forEach((item) => {
							item.stickerImg = item.stickerImg.toString().split(",")
							item.stickerImgs = item.stickerImgs.toString().split(",")
							item.stickerImgx = item.stickerImgx.toString().split(",")
							item.stickerImgy = item.stickerImgy.toString().split(",")
							item.isGood = item.funs.includes(this.$data.id)
							console.log("load",item.isGood,this.$data.id)
						})
						this.handAccountData.push(handAccount)
						console.log(3, this.handAccountData)
						let me = {
							_id: this.$data.id
						}
						uni.request({
							url: 'http://120.76.138.164:3000/user/queryUserById',
							data: me
						}).then(data => {
							let [err1, res1] = data
							let friend = {}
							friend.id = res1.data.data._id
							friend.headImg = res1.data.data.HeadImg || []
							friend.name = res1.data.data.Name
							friend.sex = res1.data.data.Sex
							that.FriendArray.push(friend)
						})
					})
					uni.request({
						url: 'http://120.76.138.164:3000/relationship/queryRelationship?data=' +
							'{"UserID":"' + res.data + '","status":[1,2]}'
					}).then(data => {
						let [err, res] = data
						// console.log(1,err,res)
						res.data.data.forEach((item) => {
							let friend = {}
							let handAccount = []
							friend.status = item.status
							uni.request({
								url: 'http://120.76.138.164:3000/handAccount/getHandAccounts?data=' +
									item.PeopleID
							}).then(data => {
								let [err1, res1] = data
								let result = res1.data.data
								let handAccount = result
								if (result.length == 0) return
								handAccount = handAccount.filter((item) => {
									return item.Public == true
								})
								handAccount.forEach((item) => {
									item.stickerImg = item.stickerImg
									.toString().split(",")
									item.stickerImgs = item.stickerImgs
										.toString().split(",")
									item.stickerImgx = item.stickerImgx
										.toString().split(",")
									item.stickerImgy = item.stickerImgy
										.toString().split(",")
									item.isGood = item.funs.includes(that.$data.id)
									console.log("load",item.isGood,that.$data.id)
								})
								that.handAccountData.push(handAccount)
								console.log(that.handAccountData)
								//添加朋友
								let data4 = {
									_id: item.PeopleID
								}
								uni.request({
									url: 'http://120.76.138.164:3000/user/queryUserById',
									data: data4
								}).then(data => {
									let [err1, res4] = data
									friend.id = res4.data.data._id
									friend.headImg = res4.data.data
										.HeadImg || []
									friend.name = res4.data.data.Name
									friend.sex = res4.data.data.Sex
									that.FriendArray.push(friend)
									console.log(that.FriendArray)
									that.$forceUpdate()
								})
							})
						})
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
				}
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
		height: 71vh !important;
		z-index:88;
	}

	.uni-app--showleftwindow+.uni-tabbar-bottom {
		display: none;
	}

	#nothing {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 100vh;
		width: 100vw;

		&>text {
			z-index: 9;
			font-size: larger;
			font-weight: 600;
		}

		&>image {
			margin-top: 1vh;
			z-index: 9;
			width: 7vh;
			height: 7vh;
			object-fit: cover;
		}

		&>image:nth-of-type(1) {
			position: absolute;
			margin-top: 0vh;
			z-index: 0;
			top: 0;
			left: 0;
			height: inherit;
			width: inherit;
			object-fit: cover;
		}
	}

	.handAccount {
		height: 100vh;
		width: 100vw;
		box-sizing: border-box;
		background-color: #A0CFFF;

		.swiper-hor {
			height: 100vh;
			width: 100vw;

			#s1 {
				background-color: #6A6A6A;
				height: 100vh;
				width: 100vw;

				.swiper-ver {
					height: 100vh;
					width: 100vw;
					position: relative;

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

					#s21 {
						height: 49vh;
						width: 100vw;
						background-color: #c2a7c0;
					}

					#s31 {
						height: 49vh;
						width: 100vw;
						background-color: #c9ea97;
					}
				}
			}

			#s2 {
				height: 100vh;
				width: 100vw;
				background-color: #c2a7c0;
			}

			#s3 {
				height: 100vh;
				width: 100vw;
				background-color: #c9ea97;
			}
		}
	}
</style> [{bkImgName: "粉色夏日" bkImgNumber: 1 bkImgPath: "../../static/img/bkImg/bk1.jpg"},{bkImgName: "碧水中月" bkImgNumber:
2 bkImgPath: "../../static/img/bkImg/bk2.jpg"},{bkImgName: "闲逸吉他" bkImgNumber: 3 bkImgPath:
"../../static/img/bkImg/bk3.jpg"},{bkImgName: "落日阳台" bkImgNumber: 4 bkImgPath:
"../../static/img/bkImg/bk4.jpg"},{bkImgName: "草莓与花" bkImgNumber: 5 bkImgPath:
"../../static/img/bkImg/bk5.jpg"},{bkImgName: "熊熊开门" bkImgNumber: 6 bkImgPath:
"../../static/img/bkImg/bk6.jpg"},{bkImgName: "动物狂欢" bkImgNumber: 7 bkImgPath: "../../static/img/bkImg/bk7.jpg"}]
