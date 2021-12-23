<template>
	<view class="handAccount">
		<swiper class="swiper-hor" easing-function="easeOutCubic" circular :interval="interval" 
			:duration="duration">
			<swiper-item id="s1">
				<swiper class="swiper-ver" easing-function="easeOutCubic" circular vertical=true 
					:interval="interval" :duration="duration">
					<swiper-item id="s11" v-for="(item,index) in handAccountData" :key="index">
						<view class="swiper-ver-nav" @tap="showOpioion" >
							<image src="../../static/img/icon.jpg" mode=""></image>
							<text>大帅哥</text>
							<image id="selectUser" src="../../static/uview/common/logo.png"></image>
						</view>
						<view class="swiper-ver-head">
							<picker class="date" mode="date" :value="item.Date.slice(0,10)" 
								@change="bindDateChange">
								<view class="uni-input">{{workData.date}}</view>
							</picker>
							<image :src="weatherArray[item.Weather].weatherPath" mode=""></image>
							<image :src="feelArray[item.Feel].feelPath" mode=""></image>
						</view>
						<view class="textmain">
							<image id="bk" src="../../static/more/微信图片_20211126111417.jpg"></image>
							<editor :id="'editor'+index" read-only="true" @ready="onEditorReady(index)"></editor>
							<image id="tz" :src="item1" v-for="(item1,index1) in item.stickerImg" :key="parseInt(index1+100)"
							:style="{left:item.stickerImgx[index1]+'px',top:item.stickerImgy[index1]+'px',transform:getScale(item.stickerImgs[index1])}"></image>
						</view>
						<view class="opioion" :animation = "opAnimation">
							<view class="opioion-nav" @tap="showOpioion">
								<image src="../../static/img/icon.jpg"></image><text >2</text>
								<image src="../../static/img/memorandum/dm1.jpg"></image><text>2</text>
							</view>
							<scroll-view class="opioion-scroll" scroll-y="true" @scroll="scroll">
								<view class="opioion-main" @click="say">
									<view class="main-nav">
										<image src="../../static/img/memorandum/bk2.jpg" ></image>
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
							</scroll-view>
						</view>
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
				id:'',
				handAccountData:[],
				stickerArray:[],
				backgroundImgArray:[],
				feelArray:[],
				weatherArray:[],
				
				scrollTop: 0,
				old: {
				    scrollTop: 0
				},
				workData:{
					date:currentDate,
					weather:0,
					feel:0,
					imgX:0,
					imgY:0,
					bkPath:'../../static/more/微信图片_20211126111417.jpg',
					imgPath:'../../static/img/icon.jpg',
					public:true,
					imgScale:1,
					content:"<p>ma</p><h2>喝喝酒</h2>"
				},
				opAnimation: {},
				showOp:false,
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
			getScale(s){
				return `transform:scale(${s})`
			},
			scroll: function(e) {
			            console.log(e)
			            this.old.scrollTop = e.detail.scrollTop
			        },
			say(){
				console.log(11)
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
			},
			//获取到手账数据
			getUser(res){
				this.workData.date=res.date
				this.workData.feel=res.feel
				this.workData.weather=res.weather
				this.workData.bkPath=res.bkPath
				this.workData.imgPath=res.imgPath
				this.workData.public=res.public
				this.workData.imgX=res.imgX
				this.workData.imgY=res.imgY
				this.workData.content=res.content
				this.workData.imgScale=`scale(${res.imgScale})`
				console.log(this.workData.imgScale)
				this.editorCtx.setContents({
					html:this.workData.content,
				})
			},
			showOpioion(){
				if(!this.showOp){
					this.opanimation.height(49+'vh').step()
					this.showOp=!this.showOp
				}else{
					this.opanimation.height(7+'vh').step()
					this.showOp=!this.showOp
				}
				this.opAnimation = this.opanimation.export()
			},
			onEditorReady(index) {
				let that = this;
				uni.createSelectorQuery().select('#editor'+index).context((res) => {
					this.editorCtx = res.context
					this.editorCtx.setContents({
						html:that.handAccountData[index].Text
					})
				}).exec()
			},
		},
		onLoad() {
			wx.hideTabBar()
		},
		onReady(){
			let that =this
			// uni.$on('getUser',that.getUser)
			let opanimation = uni.createAnimation({
			      duration: 1000,
			        timingFunction: 'ease',
			    })
			this.opanimation = opanimation
			uni.getStorage({
				key:'UserID',
				success: (res) => {
					this.$data.id = res.data
					uni.request({
							url: 'http://127.0.0.1:3000/handAccount/getHandAccounts?data='+ that.id
						})
						.then(data => {
							let [err1, res1] = data
							let result = res1.data.data
							
							that.handAccountData = result
							that.handAccountData.forEach((item)=>{
								item.stickerImg = JSON.parse(item.stickerImg[0])
								item.stickerImgs = JSON.parse(item.stickerImgs[0])
								item.stickerImgx = JSON.parse(item.stickerImgx[0])
								item.stickerImgy = JSON.parse(item.stickerImgy[0])
							})
							
							console.log(that.handAccountData)
					})
					uni.request({
							url: 'http://127.0.0.1:3000/creation/getCreationInfo'
						})
						.then(data => {
							let [err1, res1] = data
							let result = res1.data.data
							console.log(result)
							that.feelArray = result.feels
							that.stickerArray = result.stickers
							that.weatherArray = result.weathers
							that.backgroundImgArray = result.backgroundImgs
					})
				}
			})
		}
	}
</script>

<style lang="scss">
	$content-h:75vh;
	$content-w:90vw;
	$imgSize:4vh;
	$optionImgSize:5vh;
	editor{
		height: 71vh !important;
	}
	.uni-app--showleftwindow + .uni-tabbar-bottom {
	        display: none;
	    }
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

							text{
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
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: center;
							box-sizing: border-box;
							&>image:nth-of-type(1){
								display: inline-block;
								margin-left: -12vw;
								width: $imgSize-md;
								height: $imgSize-md;
								object-fit: cover;
							}
							&>image:nth-of-type(2){
								margin-right: 6vw;
								width: $imgSize-md;
								height: $imgSize-md;
								object-fit: cover;
							}
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
						}

						.textmain {
							width: $content-w;
							height: $content-h;
							margin: 2vh auto;
							background-color: #71D5A1;
							box-sizing: border-box;
							position: relative;
							padding: 2vh 5vw;
							#bk{
								width: $content-w;
								height: $content-h;
								position: absolute;
								left: 0;
								top: 0;
								size: 100%;
								display: block;
								
							}
								
							#content{
								width: calc(90vw - 60rpx);
								height: 70vh;
								margin: auto;
								display: block;
								font-size: $fontSize-md;
								 overflow: auto;
								 z-index: 1;	
							}
							#tz{
								display: block;
								position: absolute;
								left: 0;
								top: 0;
								width: 10vh;
								height: 10vh;
								size: 100%;
								z-index: 2;
							}
						}

						.opioion {
							// overflow: scroll;
							position: fixed;
							width: 80vw;
							margin: 0 auto;
							height: 7vh;
							background-color: #A0CFFF;
							bottom: 0vh;
							left: 10vw;
							z-index: 9;
							.opioion-scroll{
								height: 42vh;
								width: 80vw;
							}
							.opioion-nav{
								width: inherit;
								height: 7vh;
								background-color: #2979FF;
								display: flex;
								flex-direction: row;
								align-items: center;
								position: relative;
								& image:nth-of-type(1){
									position: absolute;
									left: 5vw;
									top: auto;
									width: $optionImgSize;
									height: $optionImgSize;
									display: inline-block;
									vertical-align: middle;
								}
								& text:nth-of-type(1){
									position: absolute;
									left: calc(6vh + 7vw);
									top: auto;
									line-height: $optionImgSize;
									display: inline-block;
									vertical-align: middle;
								}
								& image:nth-of-type(2){
									position: absolute;
									right: 7vw;
									top: auto;
									width: $optionImgSize;
									height: $optionImgSize;
									display: inline-block;
								}
								& text:nth-of-type(2){
									position: absolute;
									right: 2vw;
									top: auto;
									line-height: $optionImgSize;
									display: inline-block;
									vertical-align: middle;

								}
							}
							.opioion-main{
								width: 80vw;
								height: 17vh;
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
						height: 49vh;
						width: 100vw;
						background-color: #c2a7c0;
					}

					#s31 {
						height: 49vh;
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
