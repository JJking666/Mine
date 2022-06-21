<template>
	<view class="creation">
		<image id="submit" src="../../static/img/more/rili.png" mode="" @tap="getRes"></image>
		<image id="filterImg" :src="backgroundImgArray[bkindex].bkImgPath||'../../static/img/bkImg/aisi.jpg'"></image>
		<view class="creation-bk">
			<view class="creation-content">
				<image :src="backgroundImgArray[bkindex].bkImgPath||'../../static/img/bkImg/aisi.jpg'"></image>
				<!-- backgroundImgArray == []?'':backgroundImgArray[bkindex].bkImgPath -->
				<view class="content-nav">
					<picker class="date" mode="date" :value="date" :start="startDate" :end="endDate"
						@change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
					<picker class="weather" @change="wtChange" :value="creationData.Weather" :range="weatherarray"
						style="width: 5vh;">
						<view class="uni-input" id="viewImg1" style="position: relative;">
							<image class="wtImg"
								:src="weatherArray[creationData.Weather].weatherPath||'../../static/img/weather/qingtian.png'"
								mode=""></image>
						</view>
					</picker>
					<picker class="feel" @change="feelChange" :value="creationData.Feel" :range="feelarray"
						style="margin-left:2vw;width: 5vh;">
						<view class="uni-input" id="viewImg2" style="position: relative;">
							<image class="feelImg"
								:src="feelArray[creationData.Feel].feelPath||'../../static/img/feel/angry.png'" mode=""></image>
						</view>
					</picker>
				</view>
				<jin-edit :jpheight="jpheight" :index="jinzindex" :creationData="creationData"></jin-edit>
				<view class="jin" style="margin-top: -120rpx;"></view>
				<movable-area class="moveArea">
					<movable-view class="moveView" :x="creationData.stickerImgx[index]||0"
						:y="creationData.stickerImgy[index]||0" v-for="(item,index) in creationData.stickerImg" :key="index"
						direction="all" @change="onChange1($event,index)" @scale="onChange2($event,index)"
						inertia="true" scale="true" scale-max=2>
						<image :src="creationData.stickerImg[index]" mode=""
							style="width: inherit;height: inherit;size: 100%;object-fit: cover;"></image>
					</movable-view>
				</movable-area>
			</view>
		</view>
		<view class="footer">
			<view class="addBk ">
				<picker id="p1" @change="bkChange" :value="bkindex" :range="bkPath">
					<button type="" :class="[`buttonStyle${(bkindex - '0')+1}`]">{{bkPath[bkindex]}}</button>
				</picker>
			</view>
			<view class="moveTz ">
				<button type="" :class="[`buttonStyle${(bkindex - '0')+1}`]" @tap="moveTz">移动贴纸</button>
			</view>
			<view class="addTz ">
				<picker id="p1" @change="tzChange" :value="tzindex" :range="tzName">
					<button type="" :class="[`buttonStyle${(bkindex - '0')+1}`]">{{tzName[tzindex]}}</button>
				</picker>
			</view>
		</view>
	</view>
</template>
<script>
	import myNav from '../../components/myNav.vue'
	export default {
		components: {
			myNav
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				saving: null,
				isSave: null,
				id: '',
				test: '',
				creationData: {
					UserID: '',
					bkImgNumber: 0,
					Text: '',
					Date: '',
					Weather: 0,
					Feel: 0,
					Public: '',
					stickerImg: [],
					stickerImgx: [],
					stickerImgy: [],
					stickerImgs: [],
				},
				stickArray: [],
				stickerArray: [{
					"stickerNumber": 1,
					"stickerName": "星球",
					"stickerPath": "../../static/img/tzIcon/waixingqiu.png",
				}, {
					"stickerNumber": 2,
					"stickerName": "花儿",
					"stickerPath": "../../static/img/tzIcon/hua3.png",
				}, {
					"stickerNumber": 4,
					"stickerName": "火箭",
					"stickerPath": "../../static/img/tzIcon/huojian.png",
				}, {
					"stickerNumber": 3,
					"stickerName": "小脑虎",
					"stickerPath": "../../static/img/tzIcon/laohu.png",
				}, {
					"stickerNumber": 5,
					"stickerName": "大蘑菇",
					"stickerPath": "../../static/img/tzIcon/mogu.png",
				}, {
					"stickerNumber": 6,
					"stickerName": "火龙",
					"stickerPath": "../../static/img/tzIcon/konglong.png",
				}, {
					"stickerNumber": 7,
					"stickerName": "大螃蟹",
					"stickerPath": "../../static/img/tzIcon/pangxie.png",
				}, {
					"stickerNumber": 8,
					"stickerName": "仙人掌",
					"stickerPath": "../../static/img/tzIcon/xianrenzhang.png",
				}, {
					"stickerNumber": 9,
					"stickerName": "栅栏",
					"stickerPath": "../../static/img/tzIcon/zhalan.png",
				}, {
					"stickerNumber": 10,
					"stickerName": "章鱼",
					"stickerPath": "../../static/img/tzIcon/zhangyu.png",
				}],
				backgroundImgArray: [{
					"_id": "61a77a5309de386fef91088b",
					"bkImgNumber": 1,
					"bkImgName": "粉色夏日",
					"bkImgPath": "../../static/img/bkImg/艾斯.jpg",
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
				bkindex: 0,
				bkPath: ['月亮', '光遇', '情侣', '悠闲', '干饭', '飞翔', '美少女'],
				tzindex: 0,
				tzName: ['星球', '花儿朵', '火箭', '小脑虎', '大蘑菇', '火龙', '大螃蟹', '仙人掌', '栅栏儿', '章鱼'],
				jinzindex: 999,
				wtindex: 0,
				weatherarray: ['晴日', '多云', '小雨', '雷雨', '小雪', '雾', '雷阵雨'],
				feelindex: 0,
				feelarray: ['生气', '快乐', '哭泣', '郁闷', '甜蜜', '难过', '睡觉'],
				index1: 0,
				jpheight: 0,
				date: currentDate,
				x: 0,
				y: 0,
				tzscale: 1,
				oldX: [],
				oldY: [],
				oldScale: [],
				nowBkImg: ["../../static/img/bkImg/pmoon.jpg", "../../static/img/bkImg/pdouble.jpg",
					"../../static/img/bkImg/double.jpg", "../../static/img/bkImg/free.jpg",
					"../../static/img/bkImg/eat.jpg", "../../static/img/bkImg/fly.jpg",
					"../../static/img/bkImg/girl.jpg"
				]
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
			tzChange(e) {
				this.tzindex = e.target.value
				console.log(e.target.value)//index
				this.stickArray.push(e.target.value)
				this.creationData.stickerImg.push(this.stickerArray[e.target.value].stickerPath)
				//console.log('tz',this.stickArray[e.target.value].stickerPath)
				this.creationData.stickerImgx.push(0)
				this.creationData.stickerImgy.push(0)
				this.creationData.stickerImgs.push(1)
				console.log('tz', this.creationData.stickerImgy.length)
			},
			bkChange(e) {
				this.bkindex = e.target.value
				this.creationData.bkImgNumber = e.target.value
			},
			moveTz() {
				this.jinzindex = this.jinzindex == 0 ? 999 : 0;
			},
			onChange1(e, index) {
				this.oldX[index] = e.detail.x
				this.oldY[index] = e.detail.y
				this.creationData.stickerImgx[index] = e.detail.x
				this.creationData.stickerImgy[index] = e.detail.y
			},
			onChange2(e, index) {
				this.oldX[index] = e.detail.x
				this.oldY[index] = e.detail.y
				this.oldScale[index] = e.detail.scale
				this.creationData.stickerImgx[index] = e.detail.x
				this.creationData.stickerImgy[index] = e.detail.y
				this.creationData.stickerImgs[index] = e.detail.scale
			},
			wtChange(e) {
				this.wtindex = e.target.value
				this.creationData.Weather = e.target.value
			},
			feelChange(e) {
				this.feelindex = e.target.value
				this.creationData.Feel = e.target.value
			},
			bindDateChange: function (e) {
				this.date = e.target.value
				let data1 = this.getDate()
				this.creationData.Date = data1
				if (this.date == data1) {
					uni.showToast({
						title: '今天才' + data1 + '耶~',
						duration: 2000
					})
				}
				console.log(this.date, this.creationData.Date)
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			getRes(res, isSave) {
				let that = this
				let isPublic = false
				console.log('nei11', res)
				if(this.saving)clearInterval(this.saving)
				if (res.type != "tap" && res.type != "click") {		//点击时向editor发送以获取数据 当editor返回数据则进行操作
					uni.showModal({
						content: '是否仅自己可见？',
						success: (res11) => {
							if (res11.confirm) isPublic = true
							else isPublic = false
							console.log('nei1', res)
							if (this.creationData.id === undefined) this.creationData.id = ''
							this.creationData.status = 1 //发布	
							this.creationData.Text = res.html
							this.creationData.Public = isPublic
							console.log('nei2', this.creationData)
							uni.showLoading({
								title: '发布中'
							})
							uni.request({
								url: 'http://120.76.138.164:3000/handAccount/addHandAccount',
								data: that.creationData,
								method:'POST'
							}).then(data => {
								let [err1, res1] = data
								let result = res1.data.data || []
								uni.switchTab({
									url: '../HandAccount/handAccount'
								})
								uni.hideLoading()
							})
						}
					})
					// setTimeout(()=>{uni.$emit('getUser',this.creationData)},500)
					// // console.log(1,this.creationData)
					// console.log(2,res)
				} else {					
					//获取富文本中内容
					console.log('wai', res)
					uni.$emit('getres', 'a');
				}
				
			}
			,getSave(res) {
				console.log('getSave11111111111', res)
			},
			getSaveData(res) {
				uni.$emit('initText',res.Text)
				console.log('getSaveData', res)
				this.$set(this.creationData,'bkImgNumber',res.bkImgNumber)
				this.$set(this.creationData,'Feel',res.Feel)
				this.$set(this.creationData,'Weather',res.Weather)
				this.bkindex = res.bkImgNumber
				this.$set(this.creationData,'stickerImgy',res.stickerImgy)
				this.$set(this.creationData,'stickerImgx',res.stickerImgx)
				this.$set(this.creationData,'stickerImgs',res.stickerImgs)
				this.$set(this.creationData,'stickerImg',res.stickerImg)
				this.date = res.Date.slice(0,10)
			},
		},
		onShow() {
			let that = this
			this.saving = setInterval(() => {
				console.log('getsave2222', this.creationData.id)
				if (this.creationData.id === undefined) this.creationData.id = '' //当删除草稿和没有草稿且要保存时id为''
				uni.$emit('getsave', 'a');
			}, 8000)
		},
		onUnload(){
			if(this.saving)clearInterval(this.saving)
		},
		onReady(option) {
			wx.showTabBar()
			let that = this
			uni.onKeyboardHeightChange(res => {
				that.jpheight = res.height
				console.log('jin', that.jpheight)
			})
			uni.$on('editOk', that.getRes)
			uni.$on('saveOk', (res) => {
				this.creationData.status = 0 //保存
				this.creationData.Text = res.html
				this.creationData.Public = true
				console.log('save', this.creationData)
				uni.request({
					url: 'http://120.76.138.164:3000/handAccount/addHandAccount',
					method: 'POST',
					data: that.creationData
				}).then(data => {
					console.log('saveOk!!!!!！！', data)
					if(data[1].data.data._id)this.creationData.id = data[1].data.data._id
					// clearInterval(this.saving)
				})
				console.log('saveOk!!!', res)
			})
			uni.getStorage({
				key: "UserID",
				success: (res) => {
					this.$data.id = res.data
					that.creationData.UserID = res.data
					that.test = res.data
					console.log('r', that.test)
					uni.request({
						url: 'http://120.76.138.164:3000/handAccount/getDrafts?data=' + res.data,
					}).then((data) => {
						let theData = data[1].data.data
						if (theData.length != 0) {
							const deleteId = theData[0]._id
							uni.showModal({
								title: '提示',
								content: '您要恢复上一次的编辑吗？',
								success: (res1) => {
									console.log(this.$data)
									if (res1.confirm) {
										// this.creationData.id = 1
										this.creationData.id = deleteId
										that.getSaveData(theData[0])
									} else if (res1.cancel) {
										//删除之前草稿
										this.creationData.id = ''
										uni.request({
											url: 'http://120.76.138.164:3000/handAccount/removeHandAccount?data=' +
												deleteId,
										}).then(res => console.log(res)).catch(err =>
											console.log(err0))
										return
									}
								}
							})
						}
						console.log('getDrafts', data)
					})
					uni.request({
						url: 'http://120.76.138.164:3000/creation/getCreationInfo?data=' + res.data,
					}).then(data => {
						let [err1, res1] = data
						let result = res1.data.data || []
						console.log("result", result)
						that.feelArray = result.feels || []
						// that.stickerArray = result.stickers || []
						that.weatherArray = result.weathers || []
						that.backgroundImgArray = []
						result.backgroundImgs.forEach((item, index) => {
							let bkArray = {}
							bkArray.bkImgName = item.bkImgName
							bkArray.bkImgNumber = item.bkImgNumber
							bkArray.bkImgPath = that.nowBkImg[index]
							that.backgroundImgArray.push(bkArray)
						})
						that.creationData.Date = that.date
						console.log("backgroundImgArray", that.backgroundImgArray)
					})
				}
			})
		}
	}
</script>
<style lang="scss">
	$createBackgroundC:rgba(255, 255, 255, 0.2);
	$content-h:75vh;
	$content-w:90vw;
	$imgSize:4vh;
	$border_radius:30rpx;

	#viewImg1,
	#viewImg2 {
		width: 5vh;
	}

	.wtImg,
	.feelImg {
		position: absolute;
		left: 0;
		top: 0;
		width: 3vh;
		height: 3vh;
		object-fit: cover;
	}

	button {
		height: 6vh;
		font-size: $fontSize-sm !important;
		border: 1rpx solid transparent;
		border-radius: 20rpx;
		padding: 0.2vh 3vw;
		vertical-align: middle;
		display: inline-block;
		margin: 0;
		white-space: nowrap;
		background-image: linear-gradient(to right bottom, $shadowC1, #d9f1f9);
		font-family: emoji;
		font-weight: 500;
		color: #292929;
	}

	#img1 {
		position: absolute;
		width: $imgSize;
		height: $imgSize;
		right: 3vw;
		top: 0;
	}

	#submit {
		width: 5vh;
		height: 5vh;
		display: block;
		position: absolute;
		right: 3vw;
		top: 0vh;
		size: 100%;
		z-index: 999;
	}

	.creation {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		padding: 5vh 5vw;
		background-image: linear-gradient(to right bottom, $shadowC1 20%, #d9f1f9 50%);

		.creation-bk {
			width: $content-w;
			height: $content-h;
			border: 1rpx solid transparent;
			border-radius: $border_radius;
			margin-top: 7vh;
			box-shadow: 0rpx 0rpx 55rpx $shadowC2;

			.creation-content {
				overflow: hidden;
				width: inherit;
				height: inherit;
				background-color: rgba(255, 192, 203, 0.2);
				z-index: 99;
				border: 1rpx solid transparent;
				border-radius: $border_radius;
				position: relative;
				box-shadow: 0rpx 0rpx 25rpx $shadowC1;

				.jin {
					height: 20vh;
					width: calc(100%-60rpx);
					background-color: rgba(255, 255, 255, 0.2);
					z-index: 999;
					margin: 0 30rpx;
				}

				.moveArea {
					position: fixed;
					top: 12vh;
					height: inherit;
					width: inherit;
					left: 5vw;
					border: 1rpx solid transparent;

					.moveView {
						width: 10vh;
						height: 10vh;
						z-index: 99;
						size: 100%;
						box-sizing: border-box;
					}
				}

				image {
					width: inherit;
					height: inherit;
					size: 100%;
					object-fit: cover;
					position: absolute;
					top: 0;
					left: 0;
					z-index: -1;
					border-radius: $border_radius;
				}

				.content-nav {
					width: $content-w;
					height: 6vh;
					padding: 0.5vh 5vw;
					box-sizing: border-box;
					border: 1rpx solid transparent;
					border-radius: $border_radius;
					position: fixed;
					top: 5vh;
					left: 5vw;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					.date {
						width: 25vw;
						height: 5vh;
						display: inline-block;

						view {
							width: 25vw;
							height: 5vh;
							text-align: center;
							font-size: $fontSize-md;
							line-height: 5vh;
						}
					}

					.weather {
						width: 25vw;
						height: 5vh;
						display: inline-block;

						view {
							width: 25vw;
							height: 5vh;
							text-align: center;
							font-size: $fontSize-sm;
							line-height: 5vh;
						}
					}

					.feel {
						width: 25vw;
						height: 5vh;
						display: inline-block;

						view {
							width: 25vw;
							height: 5vh;
							text-align: center;
							font-size: $fontSize-sm;
							line-height: 5vh;
						}
					}
				}
			}
		}

		.footer {
			width: 100vw;
			height: 8vh;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			padding: auto 10vw;
			position: fixed;
			bottom: 2vh;
			left: 0;
			z-index: 999;
			font-size: $fontSize-sm !important;

			.addBk {
				display: inline-block;
				width: fit-content;
				height: fit-content;
				box-sizing: border-box;

				& #p1 {
					font-size: 40rpx;
					line-height: 6vh;
					padding: 0.2vh auto;
					vertical-align: middle;
					display: inline-block;
					margin: 0;
					box-sizing: border-box;
				}
			}

			.addTz {
				display: inline-block;
				width: fit-content;
				height: fit-content;
				box-sizing: border-box;

				& #p1 {
					font-size: 40rpx;
					line-height: 6vh;
					padding: 0.2vh auto;
					vertical-align: middle;
					display: inline-block;
					margin: 0;
					box-sizing: border-box;
				}
			}

			.moveTz {
				display: inline-block;
				width: fit-content;
				height: fit-content;
				box-sizing: border-box;
			}

			.moveTz,
			.addTz,
			.addBk {
				button {
					min-width: 20vw;
				}
			}
		}
	}
</style>
