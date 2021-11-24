<template>
	<view class="myNav">
		<view class="status_bar" :style="{height:statush+'px'} " >
			<!-- 这里是状态栏 -->
		</view>
		<view class="my-nav">
			<image src="../static/img/memorandum/toLeft.png" @tap="goback"></image><text @tap="goback">返回</text>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props:['statush'],
		name: "myNav",
		data() {
			return {

			};
		},
		methods:{
			goback(){
				uni.navigateBack({
				    delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">
	$navHeight:var(--status-bar-height);
	$imgSize:4vh;
	.myNav {
		width: 100vw;
		height: fit-content;
		padding: 1vh 0;
		border-bottom: 1rpx solid #C8C9CC;
		position: fixed;
		top: 0;
		left: 0;
		box-sizing: border-box;
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

		.my-nav {
			width: 100vw;
			height: $imgSize;
			position: relative;
			box-sizing: border-box;
			
			& image:nth-child(1) {
				position: absolute;
				display: inline-block;
				width: $imgSize;
				height: $imgSize;
				left: 2vw;
				top: 0;
			}
			text{
				position: absolute;
				left: 10vw;
				font-size: 32rpx;
				line-height: $imgSize;
				top: 0;
			}
		}
	}
</style>
