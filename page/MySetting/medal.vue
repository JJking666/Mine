<template>
	<view class="medal">
		<image src="../../static/img/memorandum/bk2.jpg"></image>
		<view class="content1">
			<view id="head">
				<image :src="medalData.headImg" mode=""></image>
			</view>
			<view id="content">
				<text>{{medalData.name}}</text>
				<text>已{{medalData.medals.length}}解锁种身份</text>
				<view class="medals">
					<image :src="allMedals[item].medalPath" v-for="(item,index) in medalData.medals" :key="index"></image>
				</view>
			</view>
		</view>
		<view class="content2">
			<image src="../../static/img/memorandum/dm1.jpg" mode=""></image>
			<view class="medals2">
				<view class="image" v-for="(item,index) in allMedals" :key="index">
					<image :src="item.medalPath" mode=""></image>
					<text>{{index}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				medalData:{
					headImg:'',
					name:'',
					medals:[]
				},
				allMedals:[]
			}
		},
		onLoad(option) {
			let that =this
			uni.request({
				url: 'http://120.76.138.164:3000/homePage/queryHomePage?data=' + option.ID
			})
			.then((data) => {
				let [err, res] = data
				that.medalData.medals=res.data.data[0].medals
				that.medalData.headImg = res.data.data[0].HeadImg
				console.log(5,that.medalData)
			})
			let data1={
				_id:option.ID
			}
			console.log('peron',option.ID)
			uni.request({
				url: 'http://120.76.138.164:3000/user/queryUserById',
				data:data1
			})
			.then(data2=>{
				let [err2,res2]=data2
				console.log(res2.data)
				that.medalData.name = res2.data.data.Name
			})
			uni.request({
				url: 'http://120.76.138.164:3000/medal/getMedals'
			})
			.then((data1) => {
				let [err1, res1] = data1
				that.allMedals=res1.data.data
				console.log(5,res1)
			})
		},
	}
</script>

<style lang="scss">
	.medal {
		width: 100vw;
		height: 100vh;
		padding: 2vh 5vw;
		box-sizing: border-box;
		position: relative;

		&>image {
			position: absolute;
			left: 0;
			top: 0;
			width: inherit;
			height: inherit;
			z-index: -1;
			size: 100%;
		}

		;

		.content1 {
			box-sizing: border-box;
			margin-top: 2vh;
			width: 90vw;
			height: fit-content;
			background-color: #e8e8e8;
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
