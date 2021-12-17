<template>
	<view class="privacy">
		<view class="content1">
			<view class="content1-item" v-for="(item,index) in itemData" :key="index">
				<text>{{item.content}}</text>
				<switch id="sw" :checked="item.if" @change="switch1Change" />
			</view>
		</view>
		<view class="content2">
			<picker id="p1" @change="blackPickerChange" :value="blackindex" :range="blackarray">
				<view class="uni-input" style="height:5vh;">我的黑名单</view>
			</picker>
			<picker id="p2" @change="showPickerChange" :value="showindex" :range="showarray">
				<view class="uni-input" style="height:3vh;">作品可见天数</view>
			</picker>
			<view class="border">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				blackarray: ['中国', '美国', '巴西', '日本'],
				blackindex: 0,
				showarray: ['当天', '三天内', '一个月内', '半年内'],
				showindex: 0,
				itemData: [{
					content: '粉丝可以查看我',
					if: true
				}, {
					content: '朋友可以查看我',
					if: true
				}, {
					content: '作品私密',
					if: true
				}, {
					content: '好友申请',
					if: true
				}]
			}
		},
		methods: {
			showPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.showindex = e.target.value
			},
			blackPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.blackindex = e.target.value
			},
		}
	}
</script>

<style lang="scss">
	.privacy {
		width: 100vw;
		height: 100vh;
		padding: 2vh 5vw;
		box-sizing: border-box;

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
			flex-direction: column;
			align-items: flex-start;
			padding: 2vh 5vw;

			.content1-item {
				height: 6vh;
				width: 80vw;
				padding: 1vh 0;
				border-bottom: 1rpx solid #dedede;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				
				text {
					line-height: 4vh;
					display: inline-block;
					font-size: $fontSize-sm;
				}

				#sw {

					line-height: 4vh;
					transform: scaleX(1.2) scaleY(0.9);
					margin-top: -0.2vh;
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
			align-items: flex-start;
			padding: 2vh 5vw;

			.border {
				width: 80vw;
				height: 1vh;
				position: absolute;
				top: 5vh;
				left: 5vw;
				border-bottom: 1rpx solid #d1ddde;
			}
		}
	}
</style>
