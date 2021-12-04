<template>
	<view class="classTable">
		<!-- <uni-file-picker></uni-file-picker> -->
		<swiper class="swiper" :indicator-dots="indicatorDots">
			<swiper-item v-for="(item,index) in classTableData.classPath" :key="index"><!--   -->
				<textarea id="xm" v-model="classTableData.className[index]" placeholder="姓名" 
				maxlength="6" placeholder-style=""></textarea>
				<textarea v-model="classTableData.classNumber[index]" placeholder="学号" maxlength="12"
				 placeholder-style="line-height: 5vh;"></textarea>
				<image  v-if="item" :src="item" ></image><!-- ||'../../static/img/icon.jpg' -->
			</swiper-item>
		</swiper>
		<button type="primary" @tap="openImg1()">从相册选取</button>
		<button type="primary" @tap="openImg2()">从相机获取</button>
<!-- 		<image src="../../static/more/微信图片_20211126111429.jpg" mode=""></image> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				classTableData:[],
				titleData:[''],
				valueData:[''],
				name: "file.txt",
				extname: "txt",
				imagePath: ['http://tmp/VLdOvIq3KLCSee414af7c3dab6e7b062ee781d0c54d1.jpg'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			openImg1() {
				let that = this;
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						that.imagePath = res.tempFilePaths;
					}
				});
			},
			openImg2() {
				let that = this;
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: function(res) {
						that.imagePath = res.tempFilePaths;
					}
				});
			},
		},
		onLoad() {
			let that =this
			uni.getStorage({
				key:"UserID",
				success(res) {
					let id =res.data
					uni.request({
						url:'http://127.0.0.1:3000/classTable/getClassTables?data='+id
					})
					.then(data1=>{
						let [err1,res1]=data1
						that.classTableData = res1.data.data[0]
						console.log(res1)
					})
				}
			})
		}
	}
</script>

<style lang="scss">
	#xm{
		display:inline-block;
		width:45vw;
		margin-left:5vw;
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
		.swiper{
			margin-top: 3vh;
			width: 100vw;
			height: 47vh;
			textarea{
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
