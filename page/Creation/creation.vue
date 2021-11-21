<template>
	<view class="creation">
		<view class="creation-bk">
			<view class="creation-content">
				<image src="../../static/img/memorandum/dm6.jpg"></image>
				<view class="content-nav">
					<picker class="date" mode="date" :value="date" :start="startDate" :end="endDate"
						@change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
					<picker class="weather" @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
					<picker class="feel" @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
				<view class="content-main">
					<jin-edit :jpheight="jpheight"></jin-edit>
					<view class="moveArea">
						<movable-area>
							<movable-view :x="x" :y="y" direction="all" @change="onChange">{{jpheight}}</movable-view>
						</movable-area>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				jpheight:0,
				array: ['中国', '美国', '巴西', '日本'],
				index: 0,
				date: currentDate,
				x: 0,
				y: 0,
				old: {
					x: 0,
					y: 0
				}
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			getHeight(e){
				this.jpheight = e.detail.height
				console.log(e.detail)
			},
			onChange: function(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
		
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		},
		onReady(){
			let that = this
			uni.onKeyboardHeightChange(res => {
			  that.jpheight=res.height
			})
		}
	}
</script>

<style lang="scss">
	$content-h:70vh;
	$content-w:90vw;
	.creation {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		padding: 5vh 5vw;
		background-color: #BBBCBE;

		.creation-bk {
			width: $content-w;
			height: $content-h;
			border: 1rpx solid transparent;
			border-radius: 30rpx;
			margin-top: 5vh;
			.creation-content {
				width: inherit;
				height: inherit;
				background-color: rgba(255, 192, 203, 0.8);
				z-index: 99;
				border: 1rpx solid transparent;
				border-radius: 30rpx;
				image {
					width: inherit;
					height: inherit;
					size: 100%;
					object-fit: cover;
					position: fixed;
					top: 5vh;
					left: 5vw;
					z-index: -1;
				}

				.content-nav {
					width: $content-w;
					height: 6vh;
					background-color: #e0f8f7;
					padding: 0.5vh 5vw;
					box-sizing: border-box;
					border: 1rpx solid transparent;
					border-radius: 30rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					.date {
						width: 25vw;
						height: 5vh;
						display: inline-block;

						view {
							width: 25vw;
							height: 5vh;
							background-color: ragb(221, 160, 221, 0.5);
							text-align: center;
							font-size: $fontSize-sm;
							line-height: 5vh;
						}
					}

					.weather {
						width: 25vw;
						height: 5vh;
						display: inline-block;

						view {
							width: 25vw;
							height: 5vh;
							text-align: center;
							font-size: $fontSize-sm;
							line-height: 5vh;
						}
					}

					.feel {
						width: 25vw;
						height: 5vh;
						display: inline-block;

						view {
							width: 25vw;
							height: 5vh;
							text-align: center;
							font-size: $fontSize-sm;
							line-height: 5vh;
						}
					}

				}
			}
		}
	}
</style>
