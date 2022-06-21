//修改页面 <template>
	<view class="work">
		<u-subsection :list="list" mode="subsection" :current="ubIndex" fontSize="16px" active-color="#00ACD7"
			@change="changeCurrent1">
		</u-subsection>
		<swiper class="swiper work-swiper linear_back" :current="swiperIndex" @change="changeCurrent"
			:style="{height:swiperIndex==0?swiperH1+'px':swiperH2+'px'}">
			<swiper-item>
				<!-- 待办 -->
				<view class="swiper-item work-itemA" id="workitem1">
					<LinK9711Multiple :label-name="checkLabelList||'请选择标签'" :list="LinList" :isShow="isShow" :isMultiple="isMultiple"
						@confirm="handleConfirm"></LinK9711Multiple>
					<!-- <view style="margin-top: 10vh;background-color: red;height: 1px;"></view> -->
					<view :id="'content-wrap1' + index" v-for="(item,index) in workData1" :key="item.id"
						@tap="workOption(1,index)" :style="{backgroundColor:priorityColor[item.priority]}">
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
			<swiper-item>
				<!-- <Record></Record> -->
				<view class="record linear_back">
					<input id="record-input" placeholder="搜索记录(内容|日期如06-15)" placeholder-style="lineHight:5vh" v-model="inputValue"
						@input="select" />
					<view style="display: inline-block;">
						<view
							style="width: 45vw;height: fit-content; margin: 1vw 0; box-sizing: border-box;margin-left: 3vw;display: inline-block;">
							<view class="recordItem" v-for="(item,index) in recordData1" :key="index"
								@tap="showRecord(1,index)">
								<view id="text" v-html="item.content"></view>
								<text>{{item.time.slice(0,10)}}</text>
								<image id="deleteImg" @tap=deleteRecord(1,index)
									src="../../static/img/memorandum/close-bold.png" mode=""></image>
							</view>
						</view>
						<view style="width: 45vw;height: fit-content; margin: 1vw 0; box-sizing: border-box;margin-left: 2vw;
							display: inline-block;vertical-align: top;">
							<view class="recordItem" v-for="(item,index) in recordData2" :key="index"
								@tap="showRecord(2,index)">
								<view id="text" v-html="item.content"></view>
								<text>{{item.time.slice(0,10)}}</text>
								<image id="deleteImg" @tap=deleteRecord(2,index)
									src="../../static/img/memorandum/close-bold.png" mode=""></image>
							</view>
						</view>
					</view>
					<!-- <button  class="create" @tap="gotoWriteRecord">
						
						<image src="../../static/img/memorandum/tianjia.png"></image>
					</button> -->
					<view id="BigRecord" :animation="recordAnimation" @tap="hideRecord()">
						<image src="../../static/img/memorandum/rocket.png" mode="widthFix"></image>
						{{bigrecord}}
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
	import Record from './record'
	import LinK9711Multiple from "@/components/LinK9711-multiple/LinK9711-multiple.vue"
	export default {
		data() {
			return {
				id:'',
				LinList: [],
				// LinList: [{value: '1',label: '精装',isCheckbox:true}, {value: '2',label: '简装',isCheckbox:false}, {value: '3',label: '豪装',isCheckbox:false},{value: '4',label: '清水',isCheckbox:false}],
				isMultiple: true, //true多选/false单选
				isShow: false, //显示
				priorityColor: ['', 'white', '#ffd8d8', '#f59d9d', '#fb8181'],
				swiperH1: 60,
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
				list: ['事务', '随笔'],
				ubIndex: 1,
				swiperIndex: 0,
				recordData: [],
				bigrecord: "",
				recordAnimation: '',
				inputValue: "",
				selecting: 0,
				t1: null,
				maxid: 10,
				show: 0,
				deleteID: '',
				firstRecord: [],
				isGetTag:0
			}
		},
		components: {
			Record,
			LinK9711Multiple
		},
		computed: {
			recordData1() {
				return this.recordData.filter((item, index) => {
					return index % 2 == 0
				})
			},
			recordData2() {
				return this.recordData.filter((item, index) => {
					return index % 2 != 0
				})
			},
			checkList(){
				return this.LinList.filter((item)=>{
					return item.isCheckbox === true
				})
			},
			checkLabelList(){
				const arr = this.LinList.filter((item)=>{
					return item.isCheckbox === true
				})
				let text = ''
				arr.forEach((item,index)=>{
					text += '#' + item.label + ' '
				})
				return text
			}
		},
		watch:{
			checkLabelList(){
				let that = this
				if(this.isGetTag===0){
					this.isGetTag=1
					return
				}
				console.log('change')
				if(this.checkList[0].value === ''){
					uni.request({
						url: 'http://120.76.138.164:3000/work/getWorks?data=' + this.id
					}).then(data1 => {
						let [err1, res1] = data1
						that.option1 = []
						that.workData1 = []
						that.workData2 = []
						that.option2 = []
						that.swiperH1 = 60
						that.swiperH2 = 60
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
						this.show1()
					})
					return 
				}
				let param = {
					userID:this.id,
					tag:this.checkList[0].value
				}
				console.log('change',this.$qs.stringify(param))
				uni.request({
					url: 'http://120.76.138.164:3000/work/getTagWorks?'+ this.$qs.stringify(param)
				})
				.then(data1 => {
					let [err1, res1] = data1
					that.option1 = []
					that.workData1 = []
					that.workData2 = []
					that.option2 = []
					that.swiperH1 = 60
					that.swiperH2 = 60
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
					this.show1()
				})
				
			}
		},
		methods: {
			handleConfirm(res) {
				// res.isCheckbox = !res.isCheckbox
				console.log('handleConfirm', res)
				const delIndex = this.LinList.findIndex((item) => item.isCheckbox === true)
				const addIndex = this.LinList.findIndex((item) => item.value === res.value)
				this.$set(this.LinList[delIndex], 'isCheckbox', false)
				if (addIndex === delIndex) return
				this.$set(this.LinList[addIndex], 'isCheckbox', !res.isCheckbox)
				console.log('handleConfirm', res ,this.checkList)
				//根据标签发送请求
			},
			deleteRecord(num, index) {
				this.deleteID = num == 1 ? this.recordData[index * 2]._id : this.recordData[index * 2 + 1]._id
				console.log(this.deleteID)
				uni.showModal({
					title: '提示',
					content: '您确定要删除该计划吗？',
					success: (res) => {
						if (res.confirm) {
							let that = this
							uni.request({
								url: 'http://120.76.138.164:3000/record/deleteRecord?data=' + that
									.deleteID
							}).then(data1 => {
								let [err1, res1] = data1
								if (num == 1) {
									that.recordData.splice(index * 2, 1);
								} else {
									that.recordData.splice(index * 2 + 1, 1);
								}
							})
							that.firstRecord = JSON.parse(JSON.stringify(that.recordData))
							this.hideRecord()
						} else if (res.cancel) {
							this.hideRecord()
							return
						}
					}
				})
			},
			hideRecord() {
				this.animation1.scale(0).step({
					duration: 700
				})
				this.recordAnimation = this.animation1.export()
				setTimeout(() => {
					this.recordAnimation = null
				}, 100);
				this.show = 0;
			},
			showRecord(num, index) {
				if (this.show == 0) {
					if (num == 1) {
						this.bigrecord = this.recordData1[index].content;
					} else {
						this.bigrecord = this.recordData2[index].content;
					}
					this.animation1.scale(1.3).step({
						duration: 700
					})
					this.show = 1
				} else {
					this.animation1.scale(0).step({
						duration: 400
					})
					if (num == 1) {
						this.bigrecord = this.recordData1[index].content;
					} else {
						this.bigrecord = this.recordData2[index].content;
					}
					this.animation1.scale(1.3).step({
						duration: 500
					})
				}
				this.recordAnimation = this.animation1.export()
				setTimeout(() => {
					this.recordAnimation = null
				}, 100);
			},
			select() {
				if (this.inputValue.length == 0) {
					this.recordData = JSON.parse(JSON.stringify(this.firstRecord))
					return
				}
				console.log('s')
				if (this.t1) {
					clearInterval(this.t1)
				}
				this.t1 = setTimeout(() => {
					console.log('t')
					let r1 = []
					let r2 = []
					this.recordData = JSON.parse(JSON.stringify(this.firstRecord))
					this.recordData1.forEach((item, index) => {
						let str = new RegExp(this.inputValue)
						if (item.content.match(str) || item.time.match(str)) {
							r1.push(index)
							item.content = item.content.replace(this.inputValue,
								`<span style="color: red">${this.inputValue}</span>`)
						}
					})
					this.recordData2.forEach((item, index) => {
						let str = new RegExp(this.inputValue)
						if (item.content.match(str) || item.time.match(str)) {
							r2.push(index)
							item.content = item.content.replace(this.inputValue,
								`<span style="color: red">${this.inputValue}</span>`)
						}
					})
					r1.forEach((item) => {
						let item1 = this.recordData1[item]
						this.recordData1.splice(item, 1);
						this.recordData1.unshift(item1)
					})
					r2.forEach((item) => {
						let item2 = this.recordData2[item]
						this.recordData2.splice(item, 1);
						this.recordData2.unshift(item2)
					})
				}, 500);
				// this.textList.forEach((item)=>{
				// 	let str = new RegExp(this.inputValue)
				// 	item.textvalue=item.textvalue.replace(this.inputValue,`<span style="color: red">${this.inputValue}</span>`)
				// })
			},
			gotoWriteRecord() {
				uni.navigateTo({
					url: 'createRecord'
				})
			},
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
				if (this.ubIndex === 1) {
					uni.navigateTo({
						url: './writeWork',
					})
				} else {
					uni.navigateTo({
						url: './createRecord',
					})
				}
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
							}).then(data1 => {
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
			show1() {
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
								this.swiperH1 += res[0].height;
								this.swiperH1 += 12;
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
							}).then(data1 => {
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
		onReady() {
			let that = this
			let animation1 = uni.createAnimation({
				duration: 1000,
				timingFunction: 'ease',
			})
			this.animation1 = animation1
		},
		onLoad() {
			let that = this
			let id
			uni.getStorage({
				key: "UserID",
				success: (res) => {
					id = res.data
					console.log(id)
					uni.request({
						url: 'http://120.76.138.164:3000/record/queryRecords?data=' + id
					}).then(data => {
						let [err1, res1] = data
						that.recordData = res1.data.data
						that.firstRecord = JSON.parse(JSON.stringify(that.recordData))
						that.$forceUpdate()
					})
					
					
				}
			})
		},
		onShow() {
			console.log('onload')
			uni.$on('addWork', this.addWork)
			uni.getStorage({
				key: "UserID",
				success: (res) => {
					let id = res.data
					let that = this
					this.id = res.data
					uni.request({
						url: 'http://120.76.138.164:3000/record/queryRecords?data=' + id
					}).then(data => {
						let [err1, res1] = data
						that.recordData = res1.data.data
						that.firstRecord = JSON.parse(JSON.stringify(that.recordData))
						that.$forceUpdate()
					})
					
					uni.request({
						url: 'http://120.76.138.164:3000/work/getTags?data=' + id
					}).then(data => {
						let [err1, res1] = data
						let res = res1.data.data.filter(item => item != '')
						// this.LinList = new Array()
						res.forEach((item,index)=>{
							this.$set(this.LinList,index,{
								value: item,
								label: item,
								isCheckbox: false
							})
						}) 
						this.LinList.unshift({
							value: '',
							label: '所有',
							isCheckbox: true
						})
						this.$forceUpdate()
						// LinList: [{value: '1',label: '精装',isCheckbox:true}
						console.log('work/getTags', res1, this.LinList)
					})
					
					uni.request({
						url: 'http://120.76.138.164:3000/work/getWorks?data=' + id
					}).then(data1 => {
						let [err1, res1] = data1
						that.option1 = []
						that.workData1 = []
						that.workData2 = []
						that.option2 = []
						that.swiperH1 = 60
						that.swiperH2 = 60
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
						this.show1()
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
			border-bottom: 1rpx solid #d8d8d89c;
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
			border-top: 1rpx solid #d8d8d89c;
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
				background-color: $backgroundC1;
			}
		}
	}

	#workitem2 {
		view {
			background-color: $backgroundC1;
		}

		text {
			color: $fontC;
		}

		.options {
		}
	}

	#BigRecord,
	#work {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		min-height: 12vh;
		max-height: 60vh;
		margin: auto;
		height: fit-content;
		width: 60vw;
		transform: scale(0);
		background-color: #c4bff9cf;
		border-radius: 35rpx;
		padding: 5vh 8vw;
		box-sizing: border-box;
		font-size: $fontSize-sm;
		font-weight: 500;
		color: white;
		box-shadow: 0rpx 0rpx 25rpx $mainColor3;

		image {
			position: absolute;
			top: -30rpx;
			right: 5vw;
			width: 80rpx;
			height: 80rpx;
		}
	}

	.record {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		overflow: auto;

		#record-input {
			margin: 1vh auto;
			width: 70vw;
			height: 5vh;
			border: 1rpx solid transparent;
			border-radius: 30rpx;
			font-size: $fontSize-sm;
			background-color: #f6fff9;
			line-height: 5vh;
			padding: 0 5vw;
		}

		#record-bk {
			position: fixed;
			top: 0;
			left: -30vw;
			width: 160vw;
			height: inherit;
			size: 100%;
			z-index: -1;
		}

		& .recordItem {
			width: 100%;
			height: calc(fit-content+2vh); //
			margin: 1vw;
			padding: 5vw;
			vertical-align: top;
			border: 1rpx solid transparent;
			border-radius: 20rpx;
			background-color: $item-backgroundC;
			display: block;
			overflow: hidden;
			box-sizing: border-box;
			position: relative;

			#deleteImg {
				position: absolute;
				right: 1vw;
				top: 1vh;
				display: inline-block;
				width: 1.5vh;
				height: 1.5vh;
				size: 100%;
			}

			#text {
				width: 80%;
				height: fit-content;
				display: -webkit-box;
				font-size: $fontSize-md;
				overflow: hidden;
				-webkit-line-clamp: 5;
				-webkit-box-orient: vertical;
				line-height: 150%;
			}

			text:nth-of-type(1) {
				display: inline-block;
				margin-top: 2vh;
				width: 80%;
				height: 2vh;
				font-size: $fontSize-sm;
				color: $fontC;
				line-height: 150%;
			}
		}
	}
</style>
