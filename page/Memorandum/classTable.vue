<template>
	<view class="classTable">
		<!-- <uni-file-picker></uni-file-picker> -->
		<swiper class="swiper" :indicator-dots="indicatorDots" @change="changeIndex">
			<swiper-item v-for="(item,index) in classTableData.classPath" :key="index">
				<!--   -->
				<textarea id="xm" v-model="classTableData.className[index]" placeholder="姓名" maxlength="6"
					placeholder-style="" @input="this.update=1"></textarea>
				<textarea v-model="classTableData.classNumber[index]" placeholder="学号" maxlength="12"
					placeholder-style="line-height: 5vh;" @input="this.update=1"></textarea>
				<image v-if="item" :src="item"></image><!-- ||'../../static/img/icon.jpg' -->
			</swiper-item>
		</swiper>
		<button type="primary" @tap="openImg1(nowIndex)">从相册选取</button>
		<button type="primary" @tap="openImg2(nowIndex)">从相机获取</button>
		<!-- 		<image src="../../static/more/微信图片_20211126111429.jpg" mode=""></image> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nowIndex: 0,
				classTableData: [],
				indicatorDots: true,
				update: 0,
				id:'',
			}
		},
		methods: {
			openImg1(index) {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						that.update = 1
						this.$data.classTableData.classPath.splice(this.$data.nowIndex, 1, res.tempFilePaths[
							0])
					}
				});
			},
			openImg2(index) {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: (res) => {
						that.update = 1
						this.$data.classTableData.classPath.splice(this.$data.nowIndex, 1, res.tempFilePaths[
							0])
					}
				});
			},
			changeIndex(e) {
				this.nowIndex = e.detail.current
			}
		},
		onUnload() {
			let that = this
			console.log(4,this.id)
			if (this.update == 1) {
				uni.request({
						url: 'http://120.76.138.164:3000/classTable/updateClassTable',
						data: {
							"data1": {
								"UserID":that.id
							},
							"data2": {
								"className": that.classTableData.className,
								"classNumber": that.classTableData.classNumber,
								"classPath": that.classTableData.classPath
							}
						},
					})
					.then(data => {
						let [err, res] = data
						console.log(2, err, res)
						that.update=0
					})
			}
		},

		onLoad() {
			this.update = 1
			let that = this
			uni.getStorage({
				key: "UserID",
				success: (res) => {
					this.$data.id = res.data
					console.log(4,this.$data.id ,res.data)
					uni.request({
							url: 'http://120.76.138.164:3000/classTable/getClassTables?data=' + this.$data.id
						})
						.then(data1 => {
							let [err1, res1] = data1
							that.classTableData = res1.data.data[0]
						})
				}
			})
		}
	}
</script>

<style lang="scss">
	#xm {
		display: inline-block;
		width: 45vw;
		margin-left: 5vw;
	}

	.classTable {
		width: 100vw;
		height: 100vh;
		background-color: #b8f1cc;
		padding: $padding-tb $padding-lr;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;

		.swiper {
			margin-top: 3vh;
			width: 100vw;
			height: 47vh;

			textarea {
				font-size: $fontSize-lg;
				display: inline-block;
				width: 50vw;
				height: 5vh;
			}
		}

		& image {
			margin-top: 2vh;
			width: 100vw;
			height: 40vh;
			size: 100%;
		}

		& button:nth-of-type(1) {
			width: 70vw;
			line-height: 8vh;
			margin-top: 13vh;
			height: 8vh;
		}

		& button:nth-of-type(2) {
			width: 70vw;
			margin-top: 3vh;
			height: 8vh;
			line-height: 8vh;
		}
	}
</style>
