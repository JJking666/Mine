<template>
	<view class="classTable linear_back">
		<!-- <uni-file-picker></uni-file-picker> -->
		<swiper class="swiper" :indicator-dots="indicatorDots" @change="changeIndex">
			<swiper-item v-for="(item,index) in classTableData.classPath" :key="index">
				<!--   -->
				<view id="xmxhView">
					<textarea id="xmxh" style="" v-model="classTableData.className[index]" placeholder="姓名" maxlength="6"
						placeholder-style="" @input="this.update=1"></textarea>
					<textarea id="xmxh" style="margin-left: 0rpx;" v-model="classTableData.classNumber[index]" placeholder="学号" maxlength="12"
					placeholder-style="line-height: 5vh;" @input="this.update=1"></textarea>
				</view>
				<view id="other">
					<text>学院：</text>
					<textarea  v-model="majorArr[index]" maxlength="16"></textarea>
				</view>
				<view id="other">
					<text>专业：</text>
					<textarea  v-model="academyArr[index]" maxlength="16"></textarea>
				</view>
				<view id="other">
					<text>班级：</text>
					<textarea  v-model="classArr[index]" maxlength="16"></textarea>
				</view>
				<image  :src="item||'../../static/img/icon.jpg'"></image><!-- ||'../../static/img/icon.jpg' -->
			</swiper-item>
		</swiper>
		<view class="button_view">
			<button type="primary" class="linear_button" @tap="openImg1(nowIndex)">相册选取</button>
			<button type="primary" class="linear_button" @tap="openImg2(nowIndex)">相机获取</button>	
		</view>
		
		<!-- 		<image src="../../static/more/微信图片_20211126111429.jpg" mode=""></image> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				academyArr:["网络空间安全学院","文学与传媒学院","网络空间安全学院","网络空间安全学院","网络空间安全学院"],
				majorArr:["软件工程","传媒","软件工程","软件工程","软件工程"],
				classArr:["19软卓1","19广编1","19软卓1","19软卓1","19软卓1"],
				nowIndex: 0,
				classTableData:new Object(),
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
						this.$data.update = 1
						this.$data.classTableData.classPath.splice(this.$data.nowIndex, 1, res.tempFilePaths[0])
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
						console.log(this.$data.classTableData)
						this.$data.classTableData.classPath.splice(this.$data.nowIndex, 1, res.tempFilePaths[0])
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
							url: 'http://120.76.138.164:3000/classTable/queryClassTable?data=' + this.$data.id
						})
						.then(data1 => {
							let [err1, res1] = data1
							console.log(res1.data.data)
							if(res1.data.data.length!=0){
								that.classTableData = res1.data.data[0]
								console.log('notnull')
							}else{
								uni.request({
									url: 'http://120.76.138.164:3000/classTable/addClassTable?data=' + this.$data.id
								})
								that.$set(that.classTableData,'className',['','','','','',''])
								that.$set(that.classTableData,'classNumber',['','','','','',''])
								that.$set(that.classTableData,'classPath',new Array(5).fill('../../static/img/icon.jpg'))
								// that.classTableData.className=['','','','','','']
								// that.classTableData.classNumber=['','','','','','']
								// that.classTableData.classPath=new Array(5).fill('../../static/img/icon.jpg')
								console.log(that.classTableData)
							}
						})
				}
			})
		}
	}
</script>

<style lang="scss">
	#xmxhView{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 90vw;
		margin-left: 5vw;
		textarea:nth-of-type(1){
			color: #2b2b2b;
			font-weight: bolder;
		}
		textarea:nth-of-type(2){
			text-align: end;
		}
	}
	#other{
		display: flex;
		justify-content: space-between;
		margin-left: 5vw;
		width: 90vw;
		align-items: center;
		height: 60rpx;
		margin-bottom: 20rpx;
		text,textarea{
			line-height: 60rpx;
			height: 60rpx;
		}
		text{
			color: #424242;
		}
		textarea{
			text-align: end;
		}
	}
	.classTable {
		width: 100vw;
		height: 100vh;
		padding: $padding-tb $padding-lr;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		textarea{
			color: white;
		}
		.swiper {
			margin-top: 3vh;
			width: 100vw;
			height: 70vh;

			textarea {
				font-size: $fontSize-lg;
				display: inline-block;
				width: 50vw;
				height: 5vh;
			}
		}

		& image {
			margin-top: 3vh;
			width: 90vw;
			height: 38vh;
			margin-left: 5vw;
			size: 100%;
		}
		.button_view{
			display: flex;
			justify-content: space-around;
			width: 90vw;
			& button:nth-of-type(1) {
				width: 35vw;
				line-height: 8vh;
				margin-top: 5vh;
				height: 8vh;
				display: inline-block;
			}
			
			& button:nth-of-type(2) {
				display: inline-block;
				width: 35vw;
				margin-top: 5vh;
				height: 8vh;
				line-height: 8vh;
			}
		}
		
	}
</style>
