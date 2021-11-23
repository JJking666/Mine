<template>
	<view class="handAccount">
		<swiper class="swiper-hor" easing-function="easeOutCubic" circular :interval="interval" :autoplay="autoplay"
			:duration="duration">
			<swiper-item id="s1">
				<swiper class="swiper-ver" easing-function="easeOutCubic" circular vertical=true :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<swiper-item id="s11">
						<view class="swiper-ver-nav">
							<image src="../../static/img/icon.jpg" mode="center"></image>
							<text>大帅哥</text>
							<image id="selectUser" src="../../static/uview/common/logo.png"></image>
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
							content
						</view>
						<view class="opioion">
							<view class="opioion-nav">
								<image src="../../static/img/icon.jpg"></image><text >2</text>
								<image src="../../static/img/memorandum/dm1.jpg"></image><text>2</text>
							</view>
							<view class="opioion-main">
								<view class="main-nav">
									<image src="../../static/img/memorandum/bk2.jpg"></image>
									<text>大白菜</text>
								</view>
								<text>阿巴阿巴阿巴啊叭叭叭阿宝阿坝吧阿叭叭阿巴巴巴</text>
							</view>
							<view class="opioion-main">
								<view class="main-nav">
									<image src="../../static/img/memorandum/bk2.jpg"></image>
									<text>大白菜</text>
								</view>
								<text>阿巴阿巴阿巴啊叭叭叭阿宝阿坝吧阿叭叭阿巴巴巴</text>
							</view>
							<view class="opioion-main">
								<view class="main-nav">
									<image src="../../static/img/memorandum/bk2.jpg"></image>
									<text>大白菜</text>
								</view>
								<text>阿巴阿巴阿巴啊叭叭叭阿宝阿坝吧阿叭叭阿巴巴巴</text>
							</view>
						</view>
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
			},
			//获取到手账数据
			getUser(res){
				console.log(res)
			}
		},
		onReady(){
			let that =this
			uni.$on('getUser',that.getUser)
		}
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
					position: relative;
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
								margin-left: 10vw;
								font-size: $fontSize-md;
								font-weight: 500;
								vertical-align: middle;
								margin-left: 5vw;
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
							overflow: auto;
							position: absolute;
							width: 80vw;
							margin: 3vh auto;
							height: 40vh;
							background-color: #A0CFFF;
							bottom: 0vh;
							left: 10vw;
							.opioion-nav{
								width: inherit;
								height: 8vh;
								background-color: #2979FF;
								display: flex;
								flex-direction: row;
								align-items: center;
								position: relative;
								& image:nth-of-type(1){
									position: absolute;
									left: 5vw;
									top: auto;
									width: $imgSize-md;
									height: $imgSize-md;
									display: inline-block;
									vertical-align: middle;
								}
								& text:nth-of-type(1){
									position: absolute;
									left: calc(6vh + 7vw);
									top: auto;
									line-height: $imgSize-md;
									display: inline-block;
									vertical-align: middle;
								}
								& image:nth-of-type(2){
									position: absolute;
									right: 7vw;
									top: auto;
									width: $imgSize-md;
									height: $imgSize-md;
									display: inline-block;
								}
								& text:nth-of-type(2){
									position: absolute;
									right: 2vw;
									top: auto;
									line-height: $imgSize-md;
									display: inline-block;
									vertical-align: middle;

								}
							}
							.opioion-main{
								width: 80vw;
								height: fit-content;
								display: flex;
								flex-direction: column;
								justify-content: center;
								display: inline-block;
								background-color: #8F939C;
								padding: 1.5vh 5vw;
								box-sizing: border-box;
								.main-nav{
									& image{
									width: $imgSize-md;
									height: $imgSize-md;
									border-radius: 100%;
									vertical-align: middle;
									}
									& text{
										margin: 0;
										width: fit-content;
										height: $imgSize-md;
										line-height: $imgSize-md;
										display: inline-block;
										vertical-align: middle;
										font-size: $fontSize-md;
										font-weight: 600;
										margin-left: 2vw;
									}
								}
								
								& text{
									font-size: $fontSize-sm;
									margin-top: 1.3vh;
									display: inline-block;
									font-weight: 500;
								}
							}
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
