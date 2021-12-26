
<template>
	<view class="creation">
		<image id="submit" src="../../static/img/more/rili.png" mode="" @tap="getRes"></image>
		<view class="creation-bk">
			<view class="creation-content">
				<image :src="backgroundImgArray[bkindex].bkImgPath"></image>
				<view class="content-nav">
					<picker class="date" mode="date" :value="date" :start="startDate" :end="endDate"
					 @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
					<picker class="weather" @change="wtChange" :value="wtindex" :range="weatherarray" style="width: 5vh;">
						<view class="uni-input" id="viewImg1" style="position: relative;">
							<image class="wtImg" :src="weatherArray[wtindex].weatherPath||'../../static/img/weather/qingtian.png'" mode=""></image>
						</view>
					</picker>
					<picker class="feel" @change="feelChange" :value="feelindex" :range="feelarray" style="margin-left:2vw;width: 5vh;">
						<view class="uni-input" id="viewImg2" style="position: relative;">
							<image class="feelImg" :src="feelArray[feelindex].feelPath||'../../static/img/feel/angry.png'" mode=""></image>
						</view>
					</picker>
				</view>
				<jin-edit :jpheight="jpheight" :index="jinzindex" :creationData="creationData"></jin-edit>
				<view class="jin" style="margin-top: -120rpx;"></view>
				<movable-area class="moveArea">
					<movable-view class="moveView" 
					:x="creationData.stickerImgx[index]" :y="creationData.stickerImgy[index]" 
					v-for="(item,index) in stickArray" :key="index"
					direction="all" @change="onChange1($event,index)" @scale="onChange2($event,index)"
					inertia="true" scale="true" scale-max=2>
						<image :src="creationData.stickerImg[index]" mode="" 
						style="width: inherit;height: inherit;size: 100%;object-fit: cover;"></image>
					</movable-view>
				</movable-area>
			</view>
		</view>
		<view class="footer">
			<view class="addBk">
				<picker id="p1" @change="bkChange" :value="bkindex" :range="bkPath" >
					<button type="">{{bkPath[bkindex]}}</button>
				</picker>
			</view>
			<view class="moveTz">
				<button type="" @tap="moveTz">移动贴纸</button>
			</view>
			<view class="addTz">
				<picker id="p1" @change="tzChange" :value="tzindex" :range="tzPath" >
					<button type="">{{tzPath[tzindex]}}</button>
				</picker>
			</view>
		</view>
		
	</view>
</template>

<script>
	import myNav from '../../components/myNav.vue'
	export default {
		components: {
			myNav
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				id:'',
				test:'',
				creationData:{
					UserID:'',
					bkImgNumber:0,
					Text:'',
					Date:'',
					Weather:0,
					Feel:0,
					Public:'',
					stickerImg:[],
					stickerImgx:[],
					stickerImgy:[],
					stickerImgs:[],
				},
				stickArray:[],
				stickerArray:[],
				backgroundImgArray:[],
				feelArray:[],
				weatherArray:[],
				bkindex:0,
				bkPath:['粉色夏日','碧水中月','闲逸吉他','落日阳台','草莓与花','熊熊开门','动物狂欢'],
				tzindex:0,
				tzPath:['小海豚','花儿朵','赤兔儿','小脑虎','大蘑菇','小牛宝','大螃蟹','仙人掌','栅栏儿','猪宝宝'],
				jinzindex:0,
				wtindex:0,
				weatherarray: ['晴日', '多云', '小雨', '雷雨','小雪','雾','雷阵雨'],
				feelindex:0,
				feelarray: ['生气', '快乐', '哭泣', '郁闷','甜蜜','难过','睡觉'],
				index1:0,
				jpheight:0,
				date: currentDate,
				x: 0,
				y: 0,
				tzscale:1,
				oldX:[],
				oldY:[],
				oldScale:[]
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
			tzChange(e){
				this.tzindex = e.target.value
				//console.log(e.target.value)//index
				this.stickArray.push(e.target.value)
				this.creationData.stickerImg.push(this.stickerArray[e.target.value].stickerPath)
				//console.log('tz',this.stickArray[e.target.value].stickerPath)
				this.creationData.stickerImgx.push(0) 
				this.creationData.stickerImgy.push(0)
				this.creationData.stickerImgs.push(1)
				console.log('tz',this.creationData.stickerImgy.length)
			},
			bkChange(e){
				this.bkindex = e.target.value
				this.creationData.bkImgNumber = e.target.value
			},
			moveTz(){
				this.jinzindex=this.jinzindex==0?999:0;
			},
			onChange1(e,index){
				this.oldX[index] = e.detail.x
				this.oldY[index] = e.detail.y
				this.creationData.stickerImgx[index] = e.detail.x
				this.creationData.stickerImgy[index] = e.detail.y
			},
			onChange2(e,index){
				this.oldX[index] = e.detail.x
				this.oldY[index] = e.detail.y
				this.oldScale[index] = e.detail.scale
				this.creationData.stickerImgx[index] = e.detail.x
				this.creationData.stickerImgy[index] = e.detail.y
				this.creationData.stickerImgs[index] = e.detail.scale
			},
			wtChange(e){
				this.wtindex = e.target.value
				this.creationData.Weather = e.target.value
			},
			feelChange(e){
				this.feelindex = e.target.value
				this.creationData.Feel =e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
				let data1 = this.getDate()
				this.creationData.Date = data1
				if(this.date == data1){
					uni.showToast({
						title:'今天才'+data1+'耶~',
						duration:2000
					})
				}
				console.log(this.date,this.creationData.Date)
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
		
				if (type === 'start') {
					year = year - 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			getRes(res){
				let that = this
				if(res.type!="tap"&&res.type!="click"){
					console.log('nei',res)
					this.creationData.Text = res.html
					this.creationData.Public = res.isPublic
					console.log(this.creationData)
					uni.showLoading({
						title:'发布中'
					})
					uni.request({
							url: 'http://120.76.138.164:3000/handAccount/addHandAccount',
							data:that.creationData
						})
						.then(data => {
							let [err1, res1] = data
							let result = res1.data.data
							console.log(result)
							uni.switchTab({
								url:'../HandAccount/handAccount'
							})
							uni.hideLoading()
					})
					// setTimeout(()=>{uni.$emit('getUser',this.creationData)},500)
					// // console.log(1,this.creationData)
					// console.log(2,res)
					
					
				}else{
					//获取富文本中内容
					console.log('wai',res)
					uni.$emit('getres','a');
				}
				
			}
		},
		onReady(option){
			let that = this
			uni.onKeyboardHeightChange(res => {
				that.jpheight=res.height
		    })	
			uni.$on('editOk',that.getRes)
			uni.getStorage({
				key: "UserID",
				success: (res) => {
					this.$data.id = res.data
					that.creationData.UserID = res.data
					that.test = res.data
					console.log('r',that.test)
					uni.request({
							url: 'http://120.76.138.164:3000/creation/getCreationInfo?data='+ res.data
						})
						.then(data => {
							let [err1, res1] = data
							let result = res1.data.data
							console.log(result)
							that.feelArray = result.feels
							that.stickerArray = result.stickers
							that.weatherArray = result.weathers
							that.backgroundImgArray = result.backgroundImgs
							that.creationData.Date = that.date
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
	#viewImg1,#viewImg2{
		width: 5vh;
	}
	.wtImg,.feelImg{
		position: absolute;
		left: 0;
		top: 0;
		width: 3vh;
		height: 3vh;
		object-fit:cover;
	}
	button{
		height: 6vh;
		font-size: $fontSize-sm !important;
		border: 1rpx solid transparent;
		border-radius: 10rpx;
		padding: 0.2vh 3vw;
		vertical-align: middle;
		display: inline-block;
		margin: 0;
		white-space:nowrap;
		background-color: rgb(241,204,184)
	}
	#img1{
		position: absolute;
		width: $imgSize;
		height: $imgSize;
		right: 3vw;
		top: 0;
	}
	#submit{
		width: 5vh;
		height: 5vh;
		display: block;
		position: absolute;
		right: 5vw;
		top: 1vh;
		size: 100%;
	}
	.creation {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		padding: 5vh 5vw;
		background-color: #b8f1cc;
		.creation-bk {
			width: $content-w;
			height: $content-h;
			border: 1rpx solid transparent;
			border-radius: 30rpx;
			margin-top: 7vh;
			.creation-content {
				width: inherit;
				height: inherit;
				background-color: rgba(255, 192, 203, 0.2);
				z-index: 99;
				border: 1rpx solid transparent;
				border-radius: 30rpx;
				position: relative;
				.jin{
					height: 20vh;
					width: calc(100%-60rpx);
					background-color: rgba( 240,230,140,0.2);
					z-index: 999;
					margin: 0 30rpx;
				}
				.moveArea{
					position: fixed;
					top: 12vh;
					height: inherit;
					width: inherit;
					left: 5vw;
					border: 1rpx solid transparent;
					.moveView{
						width: 10vh;
						height: 10vh;
						z-index: 99;
						size: 100%;
						box-sizing: border-box;
					}
				}
				image {
					width: inherit;
					height: inherit;
					size: 100%;
					object-fit: cover;
					position: absolute;
					top: 0;
					left: 0;
					z-index: -1;
				}

				.content-nav {
					width: $content-w;
					height: 6vh;
					padding: 0.5vh 5vw;
					box-sizing: border-box;
					border: 1rpx solid transparent;
					border-radius: 30rpx;
					position: fixed;
					top: 5vh;
					left: 5vw;
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
		.footer{
			width: 100vw;
			height: 8vh;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			padding: auto 10vw;
			position: fixed;
			bottom: 2vh;
			left: 0;
			z-index: 999;
			font-size: $fontSize-sm !important;
			.addBk{
				display: inline-block;
				width: fit-content;
				height: fit-content;
				box-sizing: border-box;
				& #p1{
					font-size: 40rpx;
					line-height: 6vh;
					padding: 0.2vh auto;
					vertical-align: middle;
					display: inline-block;
					margin: 0;
					box-sizing: border-box;
				}
			}
			.addTz{
				display: inline-block;
				width: fit-content;
				height: fit-content;
				box-sizing: border-box;
				& #p1{
					font-size: 40rpx;
					line-height: 6vh;
					padding: 0.2vh auto;
					vertical-align: middle;
					display: inline-block;
					margin: 0;
					box-sizing: border-box;
				}
			}
			.moveTz{
				display: inline-block;
				width: fit-content;
				height: fit-content;
				box-sizing: border-box;
			}
		}
	}
</style>
