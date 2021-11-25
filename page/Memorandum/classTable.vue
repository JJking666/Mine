<template>
	<view class="classTable">
		<!-- <uni-file-picker></uni-file-picker> -->
		<swiper class="swiper" :indicator-dots="indicatorDots">
			<swiper-item v-for="(item,index) in imagePath" :key="index"><!--   -->
				<textarea id="xm" v-model="valueData[index]" placeholder="姓名" maxlength="6" placeholder-style=""></textarea>
				<textarea v-model="titleData[index]" placeholder="学号" maxlength="12" placeholder-style="line-height: 5vh;"></textarea>
				<image  v-if="item" :src="item" ></image><!-- ||'../../static/img/icon.jpg' -->
			</swiper-item>
		</swiper>
		<button type="primary" @tap="openImg1()">从相册选取</button>
		<button type="primary" @tap="openImg2()">从相机获取</button>
	</view>
</template>

<script>
	Page:({})
	export default {
		data() {
			return {
				titleData:[''],
				valueData:[''],
				name: "file.txt",
				extname: "txt",
				url: "https://xxxx",
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
		background-color: #A0CFFF;
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
