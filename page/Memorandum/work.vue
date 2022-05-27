//修改页面
<template>
	<view class="work">
		<u-subsection :list="list" mode="subsection" :current="ubIndex" fontSize="16px"  active-color="#00ACD7"
			@change="changeCurrent1">
		</u-subsection>
		<swiper class="swiper work-swiper linear_back" :current="swiperIndex" @change="changeCurrent"
			:style="{height:swiperIndex==0?swiperH1+'px':swiperH2+'px'}">
			<swiper-item>
				<!-- 待办 -->
				<view class="swiper-item work-itemA" id="workitem1">
					<!-- <view style="margin-top: 10vh;background-color: red;height: 1px;"></view> -->
					<view :id="'content-wrap1' + index" v-for="(item,index) in workData1" :key="item.id"
						@tap="workOption(1,index)">
						<!-- workOption(index) -->
						<text>{{item.title}}</text>
						<text>{{item.content}}</text>
						<text>{{item.time.toString().slice(0,10)}}</text>
						<view class="options" :style="{height:option1[index]==true?'42px':'0vh'}">
							<button class="" @click.stop="deleteWork(1,index)">
								<image src="../../static/img/common/cuowu.png"></image>
							</button>
							<button class="" @click.stop="addFinishWork(index)">
								<image src="../../static/img/common/dagou.png"></image>
							</button>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<!-- 已完成 -->
				<view class="swiper-item work-itemA" id="workitem2">
					<view :id="'content-wrap2' + index" v-for="(item,index) in workData2" :key="item.id"
						@tap="workOption(2,index)">
						<!-- workOption(index) -->
						<text>{{item.title}}</text>
						<text>{{item.content}}</text>
						<text>{{item.time.toString().slice(0,10)}}</text>
						<view :style="{height:option2[index]==true?'42px':'0vh'}" class="options">
							<button class="" @click.stop="deleteWork(2,index)">
								<image src="../../static/img/common/cuowu.png"></image>
							</button>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<button class="create" @tap="gotoWriteWork">
			<!--  -->
			<image src="../../static/img/memorandum/tianjia.png"></image>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperH1: 10,
				swiperH2: 10,
				firstCard: '2vh',
				workData1: [],
				workData2: [],
				option1: [],
				option2: [],
				maxid: 6,
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				list: ['待办', '已完成'],
				ubIndex: 1,
				swiperIndex: 0,
			}
		},
		computed:{
			workData22:()=>{
				if(!this)return
				return this.workData2.reverse()
			},
			workData11:()=>{
				if(!this)return
				return this.workData1.reverse()
			}
		},
		methods: {
			changeCurrent(index) {
				this.swiperIndex = index.detail.current || 0
				this.ubIndex = this.swiperIndex == 0 ? 1 : 0;
			},
			changeCurrent1(index) {
				console.log(typeof index, index)
				this.ubIndex = index == 0 ? 1 : 0;
			},
			gotoWriteWork() {
				console.log("tap")
				uni.navigateTo({
					url: './writeWork',
				})
			},
			addWork(data) {
				if (!data.title && !data.value) return;
				if (!data.title) data.title = "无"
				if (!data.value) data.value = "无"
				let work = {
					id: this.maxid,
					title: data.title,
					content: data.value,
					date: "11/17",
					option: false
				}
				this.noteData1.unshift(work);
			},
			workOption(num, index) {
				if (num == 1) {
					let optionA = !this.option1[index]
					if (optionA == true) this.swiperH1 += 20
					else this.swiperH1 -= 20
					this.option1.splice(index, 1, optionA)
				} else {
					let optionB = !this.option2[index]
					if (optionB == true) this.swiperH2 += 42
					else this.swiperH2 -= 42
					this.option2.splice(index, 1, optionB)
				}
				let l1 = 0
				let l2 = 0
				this.option1.forEach((item) => {
					if (item == true) l1++
				})
				this.option1.forEach((item) => {
					if (item == true) l2++
				})
			},
			deleteWork(num, index) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除该事务吗？',
					success: (res) => {
						console.log(this.$data)
						if (res.confirm) {
							let d1 = {
								_id: num == 1 ? this.$data.workData1[index]._id : this.$data.workData2[
									index]._id
							}

							uni.request({
									url: 'http://120.76.138.164:3000/work/deleteWork',
									data: d1
								})
								.then(data1 => {
									let [err1, res1] = data1
									if (num == 1) {
										console.log('de1`')
										this.workData1.splice(index, 1)
										this.option1.splice(index, 1)
									} else {
										console.log('de2`')
										this.option2.splice(index, 1)
										this.workData2.splice(index, 1)
									}
								})
						} else if (res.cancel) {
							return
						}
					}
				})
			},
			show() {
				console.log('show')
				let element, query
				setTimeout(() => {
					this.workData1 = this.workData1 || []
					this.workData2 = this.workData2 || []
					this.workData1.forEach((item, index) => {
						element = "#content-wrap1" + index
						query = uni.createSelectorQuery().in(this);
						query.select(element).boundingClientRect();
						query.exec((res) => {
							if (res && res[0]) {
								this.swiperH1 += res[0].height;
								this.swiperH1 += 12;
							}
						});
					})
					this.workData2.forEach((item, index) => {
						element = "#content-wrap2" + index
						query = uni.createSelectorQuery().in(this);
						query.select(element).boundingClientRect();
						query.exec((res) => {
							if (res && res[0]) {
								this.swiperH2 += res[0].height;
								this.swiperH2 += 12;
							}
						});
					})
					this.$forceUpdate()
				}, 100)
				setTimeout(() => {
					if (this.swiperH2 < 700) this.swiperH2 = 700
					if (this.swiperH1 < 700) this.swiperH1 = 700
					this.$forceUpdate()
				}, 500)
			},
			addFinishWork(index) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '该事务是否完成?',
					success: (res) => {
						if (res.confirm) {
							let that = this
							let work = this.workData1[index]._id
							let d1 = {
								_id: work
							}
							uni.request({
									url: 'http://120.76.138.164:3000/work/addFinishWork',
									data: d1
								})
								.then(data1 => {
									let [err1, res1] = data1
									let element = "#content-wrap1" + index
									let query = uni.createSelectorQuery().in(this);
									query.select(element).boundingClientRect();
									query.exec((res) => {
										if (res && res[0]) {
											that.swiperH1 -= res[0].height;
											that.swiperH1 -= 12;
											that.swiperH2 += res[0].height;
											that.swiperH2 += 12;
										}
									});
									setTimeout(() => {
										if (that.swiperH2 < 800) that.swiperH2 = 800
										if (that.swiperH1 < 800) that.swiperH1 = 800
									}, 500)
									that.workData2.push(that.workData1[index])
									that.workData1.splice(index, 1)

								})
						} else if (res.cancel) {
							return
						}
					}
				});
				console.log(index, this.workData1[index])

			}
		},
		onShow() {
			console.log('onload')
			uni.$on('addWork', this.addWork)
			uni.getStorage({
				key: "UserID",
				success: (res) => {
					let id = res.data
					let that = this
					uni.request({
							url: 'http://120.76.138.164:3000/work/getWorks?data=' + id
						})
						.then(data1 => {
							let [err1, res1] = data1
							that.option1 = []
							that.workData1 = []
							that.workData2 = []
							that.option2 = []
							that.swiperH1 = 10
							that.swiperH2 = 10
							let option11 = []
							let workData11 = []
							let option21 = []
							let workData21 = []
							res1.data.data.forEach((item, index) => {
								if (item.status == 0) {
									let work = item;
									option11.push(false)
									workData11.push(work)
								} else {
									let work = item;
									option21.push(false)
									workData21.push(work)
								}
							})
							that.option1 = option11 || []
							that.workData1 = workData11 || []
							that.option2 = option21 || []
							that.workData2 = workData21 || []
							console.log(2)
							this.show()
						})
				}
			})
		},
	}
</script>

<style lang="scss">
	#workitem1,
	#workitem2 {
		width: 90vw;
		height: fit-content;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;

		&>view {
			padding: 2vh 5vw;
			background: #ffffff;
			margin: 5px 0;
			border-radius: 15rpx;
		}

		text {
			width: 80vw;
			display: block;
		}

		text:nth-of-type(1) {
			text-align: center;
			font-size: $fontSize-md;
			font-weight: 700;
			height: 65rpx;
			width: 80vw;
			margin: 0 auto;
			border-bottom: 1rpx solid $backgroundC;
		}

		text:nth-of-type(2) {
			margin: 15rpx 0;
			font-size: 32rpx;
			font-weight: 500;
		}

		text:nth-of-type(3) {
			text-align: center;
			font-size: $fontSize-sm;
			height: 55rpx;
			line-height: 55rpx;
			color: #797979;
			border-top: 1rpx solid $backgroundC;
		}
	}

	.work {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;

		.work-swiper {
			height: 92vh;
			background-color: $backgroundC0;
			.work-itemA {
				width: 100vw;
				height: 100%;
				// background-color: white;
				margin-top: -2vh;
				padding: 0.5vh 0;

				.options {
					width: inherit;
					height: 42px;
					display: flex;
					flex-direction: row;
					justify-content: space-evenly;
					align-items: center;
					transition: all 0.6s;
					overflow: hidden;
					background-color: white;
					& button {
						padding: 0px;
						width: 10vh;
						height: 42px;
						border: 0rpx solid transparent;
						border-radius: 3rpx;
						margin: 0;
						display: inline-block;

						image {
							width: 4vh;
							height: 60rpx;
							margin-top: 12rpx;
							size: 100%;
						}
					}
				}
			}

			.work-itemB {
				width: 100vw;
				height: 100%;
				background-color: #DBF1E1;
			}
		}

		
	}
</style>
