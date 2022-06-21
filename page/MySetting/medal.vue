<template>
	<view class="medal">
		<image src="../../static/img/memorandum/bk2.jpg"></image>
		<view class="setting-main1">
			<view class="main1-card">
				<view class="main1-title">
					<view  style="float: right;display: flex;align-items: center;">
						<text style="float: right;">加入Mine已 </text>
					<view  style="float:right;margin:0px 6px"><text style="font-size: 24px;color: #f991b7;">{{ allDay }}</text></view>
					<text style="float:right;">天</text>
					</view>
				</view>
				<view style="width: 100%;">
					<view class="nav-something">
						<text>{{homePageData.goods||0}}</text>
						<text>{{homePageData.FriendsCount||0}}</text>
						<text>{{homePageData.FanCount||0}}</text>
					</view>
				</view>
				<view>
					<view class="main1-card">
						<view style="display: flex;justify-content: space-evenly; width: 100%;margin-top: -3vh;">
							<view class="main1-card-item">
								<image src="../../static/img/medals/account.png"></image>
								<text>{{allAccount}}</text>
							</view>
							<view class="main1-card-item">
								<image src="../../static/img/medals/work.png"></image>
								<text>{{allWork}}</text>
							</view>
							<view class="main1-card-item" >
								<image src="../../static/img/medals/plan.png"></image>
								<text>{{allPlan}}</text>
							</view>

						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="selectDate">
			<LinK9711Multiple :label-name="isCheckLabel" :list="LinList" :isShow="isShow" :isMultiple="false"
				@confirm="handleConfirm"></LinK9711Multiple>
		</view>
		<view class="charts-box">
			<qiun-data-charts type="ring" :opts="opts" :chartData="chartData" />
		</view>
		<!-- <view class="content2">
			<view class="medals2">
				<view class="image" v-for="(item,index) in allMedals" :key="index">
					<image :src="item.medalPath" mode=""></image>
					<text>{{allMedalName[index]}}</text>
				</view>
			</view>
		</view> -->
	</view>
</template>
<script>
	import LinK9711Multiple from "@/components/LinK9711-multiple/LinK9711-multiple.vue"
	export default {
		components: {
			LinK9711Multiple
		},
		computed: {
			isCheckLabel() {
				return this.LinList.find(item => item.isCheckbox === true).label
			},
			allWork(){
				let res = this.chartData.series[0].data
				return res[3].value + res[4].value
			},
			allPlan(){
				let res = this.chartData.series[0].data
				return res[1].value + res[2].value
			},
			allAccount(){
				let res = this.chartData.series[0].data
				return res[0].value
			}
		},
		data() {
			return {
				allDay: '',
				id: '',
				allItem: ['手账', '未完成计划', '已完成计划', '未完成事务', '已完成事务'],
				// LinList: [],
				LinList: [{
					value: '1',
					label: '所有',
					isCheckbox: true
				}, {
					value: '7',
					label: '一周内',
					isCheckbox: false
				}, {
					value: '30',
					label: '一个月内',
					isCheckbox: false
				}, {
					value: '180',
					label: '半年内',
					isCheckbox: false
				}],
				isMultiple: true, //true多选/false单选
				isShow: false, //显示
				chartData: {},
				homePageData: {
					UserID: '',
					Name: '',
					HeadImg: '',
					motto: '',
					FriendsCount: 0,
					FanCount: 0,
					workCount: 0,
					medals: [],
					goods: 0
				},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['ring'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					animation: true,
					rotate: false,
					rotateLock: false,
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					// padding: [45, 5, 5, 5],
					dataLabel: true,
					legend: {
						show: true,
						position: "bottom",
						lineHeight: 25,
						// margin:  [1, 5, 5, 5],
					},
					title: {
						name: "",
						fontSize: 15,
						color: "#666666"
					},
					subtitle: {
						name: "",
						fontSize: 25,
						color: "#7cb5ec"
					},
					extra: {
						ring: {
							ringWidth: 160,
							activeOpacity: 0.5,
							activeRadius: 10,
							offsetAngle: 10,
							labelWidth: 15,
							border: true,
							borderWidth: 6,
							borderColor: "#FFFFFF",
							linearType: "custom"
						}
					},
				},
				medalData: {
					headImg: '',
					name: '',
					medals: []
				},
				allMedals: [],
				allMedalName: ['小白', '咸鱼', '萌新', '佛系', '万人迷', '社交名流', '过关斩将', '宏图伟略', '卷王'],
			}
		},
		methods: {
			handleConfirm(res) {
				// res.isCheckbox = !res.isCheckbox
				const delIndex = this.LinList.findIndex((item) => item.isCheckbox === true)
				const addIndex = this.LinList.findIndex((item) => item.value === res.value)
				this.$set(this.LinList[delIndex], 'isCheckbox', false)
				if (addIndex === delIndex) return
				this.$set(this.LinList[addIndex], 'isCheckbox', !res.isCheckbox)
				console.log('handleConfirm', res)
				//根据标签发送请求
				let item = this.LinList[addIndex]
				const obj = {
					userID: this.id,
					day: parseInt(item.value),
					isAll: item.value === '1' ? 1 : 0
				}
				uni.request({
					url: 'http://120.76.138.164:3000/user/getStatistics',
					method: 'POST',
					data: obj
				}).then((data1) => {
					let [err1, res1] = data1
					res1 = res1.data.data
					const allData = []
					let i = 0
					for (const [key, val] of Object.entries(res1)) {
						if (key == 'useDay') {
							this.allDay = val
							continue
						}
						allData.push({
							name: this.allItem[i++],
							value: val
						})
					}
					const res = {
						series: [{
							data: allData
						}]
					}
					this.chartData = JSON.parse(JSON.stringify(res));
					console.log('getStatistics', res1, this.chartData)
				})
			},
			async getServerData() {
				//模拟从服务器获取数据时的延时
				const obj = {
					userID: this.id,
					isAll: 1,
					day: 0
				}
				console.log('getStatistics', obj)
				const data1 = await uni.request({
					url: 'http://120.76.138.164:3000/user/getStatistics',
					method: 'POST',
					data: obj
				})
				let [err1, res1] = data1
				console.log('getStatistics', res1, obj)
				res1 = res1.data.data
				const allData = []
				let i = 0
				for (const [key, val] of Object.entries(res1)) {
					if (key == 'useDay') {
						this.allDay = val
						continue
					}
					allData.push({
						name: this.allItem[i++],
						value: val
					})
				}
				const res = {
					series: [{
						data: allData
					}]
				}
				this.chartData = JSON.parse(JSON.stringify(res));
				console.log('getServerData', res, this.chartData)
				// setTimeout(() => {
				// 	//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
				// 	let res = {
				// 		series: [{
				// 			data: [{
				// 				"name": "手账",
				// 				"value": 50
				// 			}, {
				// 				"name": "已完成计划",
				// 				"value": 30
				// 			}, {
				// 				"name": "未完成计划",
				// 				"value": 20
				// 			}, {
				// 				"name": "已完成事务",
				// 				"value": 18
				// 			}, {
				// 				"name": "未完成事务",
				// 				"value": 8
				// 			}]
				// 		}]
				// 	};
				// }, 500);
			},
		},
		onLoad(option) {
			let that = this
			this.id = option.ID
			this.getServerData()
			uni.request({
				url: 'http://120.76.138.164:3000/homePage/queryHomePage?data=' + option.ID
			}).then((data) => {
				let [err, res] = data
				// that.medalData.medals = res.data.data[0].medals
				// that.medalData.headImg = res.data.data[0].HeadImg
				// console.log(5, that.medalData)
			})
			uni.request({
				url: 'http://120.76.138.164:3000/homePage/queryHomePage?data=' + option.ID
			}).then((data) => {
				let [err, res] = data
				console.log('queryHomePage', res)
				that.homePageData.goods = 1
				that.$forceUpdate()
			})
			uni.request({
				url: 'http://120.76.138.164:3000/relationship/queryRelationship?data=' + '{"UserID":"' + option
					.ID + '","status":[0,1,2]}'
			}).then(data => {
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
			let data1 = {
				_id: option.ID
			}
			console.log('peron', option.ID)
			// uni.request({
			// 	url: 'http://120.76.138.164:3000/user/queryUserById',
			// 	data: data1
			// }).then(data2 => {
			// 	let [err2, res2] = data2
			// 	console.log(res2.data)
			// 	that.medalData.name = res2.data.data.Name
			// })
			// uni.request({
			// 	url: 'http://120.76.138.164:3000/medal/getMedals'
			// }).then((data1) => {
			// 	let [err1, res1] = data1
			// 	that.allMedals = res1.data.data
			// 	console.log(5, res1)
			// })
		},
	}
</script>
<style lang="scss">
	.charts-box {
		width: 100%;
		height: 300px;
	}

	.medal {
		width: 100vw;
		height: 100vh;
		padding: 2vh 5vw;
		box-sizing: border-box;
		position: relative;
		background-color: whitesmoke;

		&>image {
			position: absolute;
			left: 0;
			top: 0;
			width: inherit;
			height: 25vh;
			z-index: 19;
			size: 100%;
		}

		.selectDate {
			float: right;
			width: 100px;
			margin-top: 30px;
			background-color: aquamarine;

			.multiple_input {
				width: 100%;
			}

			.multiple_cont {
				width: 100%;
				padding: 20rpx;
			}

			.multiple_cont_flex {
				font-size: 28rpx;
			}
		}
		
		.nav-thing {
			z-index: 10;
			display: flex;
			flex-direction: row;
			margin-top: 1.5vh;
		
			// color: white;
			&>text:nth-of-type(1) {
				font-size: $fontSize-md;
				font-weight: 500;
		
				&::after {
					content: '手账';
					margin-left: 2vw;
					font-size: $fontSize-sm;
				}
			}
		
			&>text:nth-of-type(2) {
				margin-left: 7vw;
				font-size: $fontSize-md;
				font-weight: 500;
		
				&::after {
					content: '事务';
					margin-left: 2vw;
					font-size: $fontSize-sm;
				}
			}
		
			& text:nth-of-type(3) {
				margin-left: 7vw;
				font-size: $fontSize-md;
				font-weight: 500;
		
				&::after {
					content: '计划';
					margin-left: 2vw;
					font-size: $fontSize-sm;
				}
			}
		}
		
		.nav-something {
			z-index: 10;
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			margin-top: 1.5vh;
			width: 100%;
			// color: white;
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

		.setting-main1 {
			position: relative;
			height: 26vh;
			width: 100vw;
			margin-top: 15vh;
			box-sizing: border-box;
			z-index: 29;

			.main1-card {
				width: 90vw;
				height: fit-content;
				background-color: white;
				padding: 1vh 5vw;
				padding-top: 5vh;
				padding-bottom: 5px;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
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
					border-bottom: 1px solid #ffffff;
					font-weight: bold;

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

		.content1 {
			box-sizing: border-box;
			margin-top: 2vh;
			width: 90vw;
			height: fit-content;
			// background-color: #e8e8e8;
			border: 1rpx solid transparent;
			border-radius: 12rpx;
			position: relative;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			padding: 2vh 5vw;

			#head {
				width: 20vw;
				height: 10vh;

				image {
					width: 7vh;
					height: 7vh;
					size: 100%;
					border-radius: 100%;
				}
			}

			#content {
				width: 63vw;
				height: fit-content;
				display: flex;
				flex-direction: column;
				align-items: flex-start;

				text:nth-of-type(1) {
					font-size: $fontSize-lg;
					font-weight: 500;
				}

				text:nth-of-type(2) {
					font-size: $fontSize-sm;
					display: block;
					margin-top: 1vw;
					color: #909193;
				}

				.medals {
					width: 58vw;
					height: fit-content;
					margin-top: 1vh;

					&>image:nth-of-type(1) {
						margin-left: 0 !important;
					}

					&>image:nth-of-type(7) {
						margin-left: 0 !important;
					}

					image {
						display: inline-block;
						width: 8vw;
						height: 8vw;
						size: 100%;
						margin-left: 2vw;
					}
				}
			}
		}

		.content2 {
			box-sizing: border-box;
			margin-top: 2vh;
			width: 90vw;
			height: fit-content;
			background-color: #e8e8e8;
			border: 1rpx solid transparent;
			border-radius: 12rpx;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 2vh 5vw;

			image {
				width: 60vw;
				height: 9vh;
				size: 100%;
				display: block;
			}

			.medals2 {
				width: 90vw;
				height: fit-content;
				display: flex;
				flex-direction: row;
				//justify-content: space-around;
				align-items: flex-start;
				padding: 2vh 5vw;
				box-sizing: border-box;
				flex-wrap: wrap;

				&>view {
					width: 25vw;
					height: 16vh;
					margin-left: 2.5vw;
					margin-top: 3vh;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					image {
						width: 8vh;
						height: 8vh;
						size: 100%;
					}

					text {
						font-size: $fontSize-md;
					}
				}

				&>view:nth-of-type(3n+1) {
					margin-left: 0;
				}
			}
		}
	}
</style>
