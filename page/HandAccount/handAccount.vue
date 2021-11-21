<template>
	<view class="handAccount">
		<swiper class="swiper-hor" easing-function="easeOutCubic" circular :interval="interval" :autoplay="autoplay"
			:duration="duration">
			<swiper-item id="s1">
				<swiper class="swiper-ver" easing-function="easeOutCubic" circular vertical=true :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<swiper-item id="s11">
						<view class="swiper-ver-nav">
							<image src="../../static/img/memorandum/min_button.png" mode="center"></image>
							<text>大帅哥</text>
							<image id="selectUser" src="../../static/uview/example/js_select_bak.png"></image>
						</view>
						<view class="swiper-ver-head">
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
						<view class="textmain">
							sssa
						</view>
						<view class="opioion">
							评论
						</view>
						<movable-area class="moveArea">
							<movable-view class="moveView" :x="x" :y="y" direction="all" @change="onChange">text</movable-view>
						</movable-area>
					</swiper-item>
					<swiper-item id="s21">
						<view class="swiper-item uni-bg-green">B</view>
					</swiper-item>
					<swiper-item id="s31">
						<view class="swiper-item uni-bg-blue">C</view>
					</swiper-item>
				</swiper>
			</swiper-item>
			<swiper-item id="s2">
				<view class="swiper-item uni-bg-green">B</view>
			</swiper-item>
			<swiper-item id="s3">
				<view class="swiper-item uni-bg-blue">C</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				interval: 2000,
				duration: 500,
				title: 'picker',
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
	}
</script>

<style lang="scss">
	.handAccount {
		height: 100vh;
		width: 100vw;
		box-sizing: border-box;
		background-color: #A0CFFF;

		.swiper-hor {
			height: 100vh;
			width: 100vw;

			#s1 {
				background-color: #6A6A6A;
				height: 100vh;
				width: 100vw;

				.swiper-ver {
					height: 100vh;
					width: 100vw;

					#s11 {
						background-color: rgba(129, 129, 129, 0.5);
						height: 100vh;
						width: 100vw;

						.swiper-ver-nav {
							width: 100vw;
							height: 8vh;
							background-image: linear-gradient(rgba(129, 129, 129, 0.5), rgba(255, 234, 255, 0.2));
							position: fixed;
							top: 0vh;
							left: 0;
							padding: 1vh 10vw;
							box-sizing: border-box;

							image {
								position: center;
								width: 6vh;
								height: 6vh;
								border-radius: 100%;
								object-fit: cover;
							}

							text {
								display: inline-block;
								height: 8vh;
								margin-left: 5vw;
								font-size: $fontSize-md;
								font-weight: 500;
								vertical-align: middle;
							}

							#selectUser {
								float: right;
								margin-top: 0.5vh;
								position: center;
								width: 5vh;
								height: 5vh;
								border-radius: 100%;
								object-fit: cover;
							}
						}

						.swiper-ver-head {
							width: 100vw;
							height: 6vh;
							background-color: #e0f8f7;
							margin-top: 8vh;
							padding: 0.5vh 5vw;

							.date {
								width: 30vw;
								height: 5vh;
								display: inline-block;

								view {
									width: 30vw;
									height: 5vh;
									background-color: ragb(221, 160, 221, 0.5);
									text-align: center;
									font-size: $fontSize-sm;
									line-height: 5vh;
								}
							}

							.weather {
								width: 30vw;
								height: 5vh;
								display: inline-block;

								view {
									width: 30vw;
									height: 5vh;
									text-align: center;
									font-size: $fontSize-sm;
									line-height: 5vh;
								}
							}

							.feel {
								width: 30vw;
								height: 5vh;
								display: inline-block;

								view {
									width: 30vw;
									height: 5vh;
									text-align: center;
									font-size: $fontSize-sm;
									line-height: 5vh;
								}
							}
						}

						.textmain {
							width: 100vw;
							height: 75vh;
							padding: 10vw;
							background-color: #71D5A1;
							box-sizing: border-box;
						}

						.opioion {
							width: 80vw;
							margin: 3vh auto;
							height: 8vh;
							background-color: #A0CFFF;
						}
						
						.moveArea{
							position: fixed;
							bottom: 0;
							left: 0;
							width: 90vw;
							height: 80vw;
							margin: 0 auto;
							background-color: #F0AD4E;
							.moveView{
								width: 20vw;
								height: 15vh;
								background-color: #A0CFFF;
							}
						}
					}

					#s21 {
						height: 50vh;
						width: 100vw;
						background-color: #c2a7c0;
					}

					#s31 {
						height: 50vh;
						width: 100vw;
						background-color: #c9ea97;
					}
				}
			}

			#s2 {
				height: 100vh;
				width: 100vw;
				background-color: #c2a7c0;
			}

			#s3 {
				height: 100vh;
				width: 100vw;
				background-color: #c9ea97;
			}
		}

	}
</style>
