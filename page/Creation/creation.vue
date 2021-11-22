<template>
	<view class="creation">
		<myNav statush="0">
			<image src="../../static/img/memorandum/complete.png" id="img1" @tap="createOk"></image>
		</myNav>
		<view class="creation-bk">
			<view class="creation-content">
				<image src="../../static/img/memorandum/dm6.jpg"></image>
				<view class="content-nav">
					<picker class="date" mode="date" :value="date" :start="startDate" :end="endDate"
						@change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
					<picker class="weather" @change="bindPickerChange" :value="index1" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
					<picker class="feel" @change="bindPickerChange" :value="index1" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
				<view class="content-main">
					<jin-edit :jpheight="jpheight" :index="index"></jin-edit>
					
				</view>
				<movable-area class="moveArea">
					<movable-view class="moveView" :x="x" :y="y" 
					direction="all" @change="onChange"
					inertia="true" scale="true" scale-max=5>
						<image src="../../static/img/icon.jpg" mode="" style="width: inherit;height: inherit;size: 100%;object-fit: cover;"></image>
					</movable-view>
				</movable-area>
			</view>
		</view>
		<view class="footer">
			<view class="addBk">
				<button type="">{{bkPath[bkindex]}}</button>
				<picker id="p1" @change="bkChange" :value="bkindex" :range="bkPath" >*
				</picker>
			</view>
			<view class="moveTz">
				<button type="" @tap="moveTz">移动贴纸</button>
			</view>
			<view class="addTz">
				<button type="">{{tzPath[tzindex]}}</button>
				<picker id="p1" @change="tzChange" :value="tzindex" :range="tzPath" >*
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
				creationData:{
					date:'',
					weather:'',
					feel:'',
					imgX:0,
					imgY:0,
					bkPath:'',
					imgPath:'',
					public:''
				},
				bkindex:0,
				bkPath:['快乐背景','开心背景','美丽背景','王牌背景','菜老头背景','自定义背景'],
				tzindex:0,
				tzPath:['快乐开心','开心美丽','美丽美丽','王牌美丽','美丽菜老','自定美丽'],
				index:0,
				jpheight:0,
				array: ['中国', '美国', '巴西', '日本'],
				index1: 0,
				date: currentDate,
				x: 0,
				y: 0,
				old: {
					x: 0,
					y: 0
				},
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
			},
			bkChange(e){
				this.bkindex = e.target.value
			},
			moveTz(){
				this.index=this.index==0?999:0;
			},
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
			},
			getRes(res){
				console.log(res)
			}
		},
		onReady(){
			let that = this
			uni.onKeyboardHeightChange(res => {
			  that.jpheight=res.height
			})
			uni.$on('editOk',that.getRes)
		}
	}
</script>

<style lang="scss">
	$content-h:79vh;
	$content-w:90vw;
	$imgSize:4vh;
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
	.creation {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		padding: 5vh 5vw;
		background-color: rgba(241,204,184,0.8);

		.creation-bk {
			width: $content-w;
			height: $content-h;
			border: 1rpx solid transparent;
			border-radius: 30rpx;
			margin-top: 7vh;
			.creation-content {
				width: inherit;
				height: inherit;
				background-color: rgba(255, 192, 203, 0.8);
				z-index: 99;
				border: 1rpx solid transparent;
				border-radius: 30rpx;
				position: relative;
				.moveArea{
					position: fixed;
					top: 12vh;
					height: $content-h;
					width: $content-w;
					left: 5vw;
					.moveView{
						width: 10vh;
						height: 10vh;
						z-index: 9999;
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
			bottom: 0;
			left: 0;
			z-index: 999;
			font-size: $fontSize-sm !important;
			.addBk{
				width: fit-content;
				height: 6vh;
				box-sizing: border-box;
				display: inline-block;
				& button:nth-of-type(1){
					border-top-right-radius:0;
					border-bottom-right-radius:0;
				}
				& #p1{
					width: 4vw;
					height: 6vh;
					font-size: 40rpx;
					line-height: 6vh;
					border: 1rpx solid transparent;
					border-radius: 10rpx;
					padding: 0.2vh auto;
					vertical-align: middle;
					display: inline-block;
					margin: 0;
					white-space:nowrap;
					border-top-left-radius:0;
					border-bottom-left-radius:0;
					background-color: rgba(241,204,184,0.8);
					box-sizing: border-box;
				}
			}
			.addTz{
				display: inline-block;
				width: fit-content;
				height: 6vh;
				box-sizing: border-box;
				& button:nth-of-type(1){
					border-top-right-radius:0;
					border-bottom-right-radius:0;
				}
				& #p1{
					height: 6vh;
					width: 4vw;
					font-size: 40rpx;
					line-height: 6vh;
					border: 1rpx solid transparent;
					border-radius: 10rpx;
					padding: 0.2vh auto;
					vertical-align: middle;
					display: inline-block;
					margin: 0;
					white-space:nowrap;
					border-top-left-radius:0;
					border-bottom-left-radius:0;
					background-color: rgba(241,204,184,0.8);
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
