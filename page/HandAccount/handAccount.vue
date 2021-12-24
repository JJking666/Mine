<template>
	<view class="handAccount">
		<swiper class="swiper-hor" easing-function="easeOutCubic" circular :interval="interval" 
			:duration="duration">
			<swiper-item id="s1" v-for="(item0,index0) in handAccountData" :key="parseInt(index0+1000)">
				<swiper class="swiper-ver" easing-function="easeOutCubic" circular vertical=true 
					:interval="interval" :duration="duration">
					<swiper-item id="s11" v-for="(item,index) in item0" :key="index">
						<view class="swiper-ver-nav" @tap="showOpioion" >
							<image :src="FriendArray[index0].headImg" mode=""></image>
							<text>{{FriendArray[index0].name}}</text>
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
							<image id="bk" :src="backgroundImgArray[item.bkImgNumber].bkImgPath"></image>
							<scroll-view :scroll-top="scrollTop" scroll-y="true" style="height: 75vh;box-sizing: border-box;">
						    	<editor :id="'editor'+index0+index" read-only="true" @ready="onEditorReady(index0,index)"></editor>
						    </scroll-view>
							<image id="tz" :src="item1" v-for="(item1,index1) in item.stickerImg" :key="parseInt(index1+100)"
							:style="{left:item.stickerImgx[index1]+'px',top:item.stickerImgy[index1]+'px',transform:getScale(item.stickerImgs[index1])}"></image>
						</view>
		
						<view class="opioion" :animation = "opAnimation">
							<view class="opioion-nav" @tap="showOpioion" @blur="showOpioion">
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
				handAccountData:[[{"_id":"61c5c5f2f2b5251ee583f22a","UserID":"61a57f00e4a7438b252b1635","bkImgNumber":4,"Text":"<p>你好，帅哥马崇濠</p><p>你是我的阳光</p>","Date":"2021-12-24T00:00:00.000Z","Weather":0,"Feel":0,"Public":true,"stickerImg":["../../static/img/tzIcon/ma.png","../../static/img/tzIcon/laohu.png","../../static/img/tzIcon/mogu.png","../../static/img/tzIcon/pangxie.png"],"stickerImgx":[0,244.7,11.1,216.7],"stickerImgy":[469,25.9,115.9,120.9],"stickerImgs":[1,1,1,1],"__v":0},{"_id":"61c5c8aadfba82c4d695a2d3","UserID":"61a57f00e4a7438b252b1635","bkImgNumber":6,"Text":"<p>阳光明媚呀</p>","Date":"2021-12-24T00:00:00.000Z","Weather":2,"Feel":1,"Public":true,"stickerImg":["../../static/img/tzIcon/ma.png","../../static/img/tzIcon/mogu.png","../../static/img/tzIcon/pangxie.png","../../static/img/tzIcon/xianrenzhang.png"],"stickerImgx":[27.8,265.2,127.6,9.8],"stickerImgy":[419,116.9,213,275.8],"stickerImgs":[1,1,1,1],"__v":0}],[{"_id":"61c424ebbad38c4f0726cbd4","UserID":"61a488a32be844636ac72344","bkImgNumber":2,"Text":"<p>今天天气真不错</p>","Date":"2021-12-23T00:00:00.000Z","Weather":2,"Feel":1,"Public":true,"stickerImg":["../../static/img/tzIcon/ma.png","../../static/img/tzIcon/laohu.png","../../static/img/tzIcon/mogu.png"],"stickerImgx":[0,113.6,237.6],"stickerImgy":[470.6,470.6,468.1],"stickerImgs":[1,1,1],"__v":0},{"_id":"61c425a2bad38c4f0726cbde","UserID":"61a488a32be844636ac72344","bkImgNumber":5,"Text":"<p>蔡艺说她想挨打</p>","Date":"2021-12-23T00:00:00.000Z","Weather":0,"Feel":1,"Public":true,"stickerImg":["../../static/img/tzIcon/laohu.png","../../static/img/tzIcon/mogu.png","../../static/img/tzIcon/pangxie.png"],"stickerImgx":[251.9,256.4,7.2],"stickerImgy":[117.4,21.7,237.7],"stickerImgs":[1,1,1],"__v":0},{"_id":"61c42657bad38c4f0726cbe4","UserID":"61a488a32be844636ac72344","bkImgNumber":5,"Text":"<p>蔡老头出来挨打！</p>","Date":"2021-12-23T00:00:00.000Z","Weather":0,"Feel":1,"Public":true,"stickerImg":["../../static/img/tzIcon/laohu.png","../../static/img/tzIcon/mogu.png","../../static/img/tzIcon/pangxie.png"],"stickerImgx":[251.9,256.4,7.2],"stickerImgy":[117.4,21.7,237.7],"stickerImgs":[1,1,1],"__v":0},{"_id":"61c42657bad38c4f0726cbe6","UserID":"61a488a32be844636ac72344","bkImgNumber":6,"Text":"<p>蔡艺的狗头，我收下了！</p>","Date":"2021-12-23T00:00:00.000Z","Weather":0,"Feel":4,"Public":true,"stickerImg":["../../static/img/tzIcon/hua3.png","../../static/img/tzIcon/zhalan.png","../../static/img/tzIcon/zhalan.png","../../static/img/tzIcon/zhalan.png","../../static/img/tzIcon/zhalan.png","../../static/img/tzIcon/pangxie.png"],"stickerImgx":[1.6,0,86.6,170.8,259.8,218.5],"stickerImgy":[256.2,462.7,461.6,461.1,460.6,83.6],"stickerImgs":[1,1,1,1,1,1],"__v":0}]],//手账数据
				stickerArray:[{"_id":"61a788c57533c4e420813108","stickerNumber":1,"stickerName":"海豚","stickerPath":"../../static/img/tzIcon/haitun.png","__v":0},{"_id":"61a78c414f9717e4a8eeaf7f","stickerNumber":2,"stickerName":"花儿","stickerPath":"../../static/img/tzIcon/hua3.png","__v":0},{"_id":"61a78c414f9717e4a8eeaf81","stickerNumber":4,"stickerName":"赤兔","stickerPath":"../../static/img/tzIcon/ma.png","__v":0},{"_id":"61a78c414f9717e4a8eeaf80","stickerNumber":3,"stickerName":"小脑虎","stickerPath":"../../static/img/tzIcon/laohu.png","__v":0},{"_id":"61a78c414f9717e4a8eeaf82","stickerNumber":5,"stickerName":"大蘑菇","stickerPath":"../../static/img/tzIcon/mogu.png","__v":0},{"_id":"61a78c414f9717e4a8eeaf83","stickerNumber":6,"stickerName":"牛宝","stickerPath":"../../static/img/tzIcon/niu.png","__v":0},{"_id":"61a78c414f9717e4a8eeaf84","stickerNumber":7,"stickerName":"大螃蟹","stickerPath":"../../static/img/tzIcon/pangxie.png","__v":0},{"_id":"61a78c414f9717e4a8eeaf85","stickerNumber":8,"stickerName":"仙人掌","stickerPath":"../../static/img/tzIcon/xianrenzhang.png","__v":0},{"_id":"61a78c414f9717e4a8eeaf86","stickerNumber":9,"stickerName":"栅栏","stickerPath":"../../static/img/tzIcon/zhalan.png","__v":0},{"_id":"61a78c414f9717e4a8eeaf87","stickerNumber":10,"stickerName":"猪宝宝","stickerPath":"../../static/img/tzIcon/zhu.png","__v":0}],//贴纸总数据
				backgroundImgArray:[{"_id":"61a77a5309de386fef91088b","bkImgNumber":1,"bkImgName":"粉色夏日","bkImgPath":"../../static/img/bkImg/bk1.jpg","__v":0},{"_id":"61a77bf66d1c1d1e7077f12d","bkImgNumber":2,"bkImgName":"碧水中月","bkImgPath":"../../static/img/bkImg/bk2.jpg"},{"_id":"61a77bf66d1c1d1e7077f12e","bkImgNumber":3,"bkImgName":"闲逸吉他","bkImgPath":"../../static/img/bkImg/bk3.jpg"},{"_id":"61a77bf66d1c1d1e7077f12f","bkImgNumber":4,"bkImgName":"落日阳台","bkImgPath":"../../static/img/bkImg/bk4.jpg"},{"_id":"61a77bf66d1c1d1e7077f130","bkImgNumber":5,"bkImgName":"草莓与花","bkImgPath":"../../static/img/bkImg/bk5.jpg"},{"_id":"61a77bf66d1c1d1e7077f131","bkImgNumber":6,"bkImgName":"熊熊开门","bkImgPath":"../../static/img/bkImg/bk6.jpg"},{"_id":"61a77bf66d1c1d1e7077f132","bkImgNumber":7,"bkImgName":"动物狂欢","bkImgPath":"../../static/img/bkImg/bk7.jpg"}],//背景总数据
				feelArray:[{"_id":"61c2e347bc1e29458db599c0","feelNumber":0,"feelName":"生气","feelPath":"../../static/img/feel/angry.png"},{"_id":"61c2e347bc1e29458db599c1","feelNumber":1,"feelName":"快乐","feelPath":"../../static/img/feel/cool.png"},{"_id":"61c2e347bc1e29458db599c2","feelNumber":2,"feelName":"哭泣","feelPath":"../../static/img/feel/cry.png"},{"_id":"61c2e347bc1e29458db599c3","feelNumber":3,"feelName":"郁闷","feelPath":"../../static/img/feel/injury.png"},{"_id":"61c2e347bc1e29458db599c4","feelNumber":4,"feelName":"甜蜜","feelPath":"../../static/img/feel/kiss.png"},{"_id":"61c2e347bc1e29458db599c5","feelNumber":5,"feelName":"难过","feelPath":"../../static/img/feel/sad.png"},{"_id":"61c2e347bc1e29458db599c6","feelNumber":6,"feelName":"睡觉","feelPath":"../../static/img/feel/sleeping.png"}],//心情总数据
				weatherArray:[{"_id":"61c2e71abc1e29458db599c7","weatherNumber":0,"weatherName":"晴日","weatherPath":"../../static/img/weather/qingtian.png"},{"_id":"61c2e71abc1e29458db599c8","weatherNumber":1,"weatherName":"多云","weatherPath":"../../static/img/weather/shaoyun.png"},{"_id":"61c2e71abc1e29458db599c9","weatherNumber":2,"weatherName":"小雨","weatherPath":"../../static/img/weather/baoyu.png"},{"_id":"61c2e71abc1e29458db599ca","weatherNumber":3,"weatherName":"雷雨","weatherPath":"../../static/img/weather/leizhenyu.png"},{"_id":"61c2e71abc1e29458db599cb","weatherNumber":4,"weatherName":"小雪","weatherPath":"../../static/img/weather/daxue.png"},{"_id":"61c2e71abc1e29458db599cc","weatherNumber":5,"weatherName":"雾","weatherPath":"../../static/img/weather/wu.png"},{"_id":"61c2e71abc1e29458db599cd","weatherNumber":6,"weatherName":"雷阵雨","weatherPath":"../../static/img/weather/tedazhenyu.png"}],//天气总数据
				FriendArray:[{"id":"61a57f00e4a7438b252b1635","headImg":"../../static/img/icon.jpg","name":"大白菜","sex":"woman"},{"status":1,"id":"61a488a32be844636ac72344","headImg":"../../static/img/icon.jpg","name":"马崇濠","sex":"man"}],//关注列表数据
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
					bkPath:'../../static/img/more/微信图片_20211126111417.jpg',
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
			showOpioion(){
				
				// console.log(JSON.stringify(this.handAccountData))
				// console.log(JSON.stringify(this.stickerArray))
				// console.log(JSON.stringify(this.backgroundImgArray))
				// console.log(JSON.stringify(this.feelArray))
				// console.log(JSON.stringify(this.weatherArray))
				// console.log(JSON.stringify(this.FriendArray))
				if(!this.showOp){
					this.opanimation.height(49+'vh').step()
					this.showOp=!this.showOp
				}else{
					uni.switchTab({
						url: '../Memorandum/memorandum'
					})
					this.opanimation.height(7+'vh').step()
					this.showOp=!this.showOp
				}
				this.opAnimation = this.opanimation.export()
			},
			onEditorReady(index0,index) {
				let that = this;
				uni.createSelectorQuery().select('#editor'+index0+index).context((res) => {
					this.editorCtx = res.context
					this.editorCtx.setContents({
						html:that.handAccountData[index0][index].Text
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
					that.$data.id = res.data
					let me={
						_id:this.$data.id
					}
					//添加自身
					uni.request({
							url: 'http://127.0.0.1:3000/user/queryUserById',
							data:me
						})
						.then(data => {
							that.handAccountData=[]//手账数据
							that.stickerArray=[]//贴纸总数据
							that.backgroundImgArray=[]//背景总数据
							that.feelArray=[]//心情总数据
							that.weatherArray=[]//天气总数据
							that.FriendArray=[]//关注列表数据
							let [err1, res1] = data
							console.log(2,err1,res1)
							let friend = {}
							friend.id = res1.data.data[0]._id
							friend.headImg = res1.data.data[0].HeadImg
							friend.name = res1.data.data[0].Name
							friend.sex = res1.data.data[0].Sex
							that.FriendArray.push(friend)
						})
					uni.request({
							url: 'http://127.0.0.1:3000/handAccount/getHandAccounts?data='+ this.$data.id
						})
						.then(data => {
							let [err1, res1] = data
							let result = res1.data.data
							let handAccount = result
							handAccount.forEach((item)=>{
								item.stickerImg = JSON.parse(item.stickerImg[0])
								item.stickerImgs = JSON.parse(item.stickerImgs[0])
								item.stickerImgx = JSON.parse(item.stickerImgx[0])
								item.stickerImgy = JSON.parse(item.stickerImgy[0])
							})
							handAccount.filter((item)=>{
								return item.Public == true
							})
							that.handAccountData.push(handAccount)
					})
					uni.request({
							url: 'http://127.0.0.1:3000/relationship/queryRelationship?data=' +
								'{"UserID":"' + res.data + '","status":[1,2]}'
						})
						.then(data => {
							let [err, res] = data
							// console.log(1,err,res)
							console.log(res.data.data)
							res.data.data.forEach((item) => {
								let friend = {}
								let handAccount=[]
								friend.status = item.status
								let data={
									_id:item.PeopleID
								}
								//添加朋友
								uni.request({
										url: 'http://127.0.0.1:3000/user/queryUserById',
										data:data
									})
									.then(data => {
										let [err1, res1] = data
										console.log(2,err1,res1)
										friend.id = res1.data.data[0]._id
										friend.headImg = res1.data.data[0].HeadImg
										friend.name = res1.data.data[0].Name
										friend.sex = res1.data.data[0].Sex
										that.FriendArray.push(friend)
									})
								uni.request({
										url: 'http://127.0.0.1:3000/handAccount/getHandAccounts?data='+ item.PeopleID
									})
									.then(data => {
										let [err1, res1] = data
										let result = res1.data.data
										handAccount = result
										handAccount.forEach((item)=>{
											item.stickerImg = JSON.parse(item.stickerImg[0])
											item.stickerImgs = JSON.parse(item.stickerImgs[0])
											item.stickerImgx = JSON.parse(item.stickerImgx[0])
											item.stickerImgy = JSON.parse(item.stickerImgy[0])
										})
										handAccount.filter((item)=>{
											return item.Public == true
										})
										that.handAccountData.push(handAccount)
								})
							})
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
						background-color: rgba(251,232,232,0.9);
						height: 100vh;
						width: 100vw;

						.swiper-ver-nav {
							width: 100vw;
							height: 8vh;
							background-image: linear-gradient(rgba(255,89,89,0.75), rgba(119,133,236,0.9));
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
							& #bk{
								width: $content-w;
								height: $content-h;
								position: absolute;
								left: 0;
								top: 0;
								size: 100%;
								display: block;
								
							}
								
							& #content{
								width: calc(90vw - 60rpx);
								height: 70vh;
								margin: auto;
								display: block;
								font-size: $fontSize-md;
								 overflow: auto;
								 z-index: 1;	
							}
							& #tz{
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

[{bkImgName: "粉色夏日"
bkImgNumber: 1
bkImgPath: "../../static/img/bkImg/bk1.jpg"},{bkImgName: "碧水中月"
bkImgNumber: 2
bkImgPath: "../../static/img/bkImg/bk2.jpg"},{bkImgName: "闲逸吉他"
bkImgNumber: 3
bkImgPath: "../../static/img/bkImg/bk3.jpg"},{bkImgName: "落日阳台"
bkImgNumber: 4
bkImgPath: "../../static/img/bkImg/bk4.jpg"},{bkImgName: "草莓与花"
bkImgNumber: 5
bkImgPath: "../../static/img/bkImg/bk5.jpg"},{bkImgName: "熊熊开门"
bkImgNumber: 6
bkImgPath: "../../static/img/bkImg/bk6.jpg"},{bkImgName: "动物狂欢"
bkImgNumber: 7
bkImgPath: "../../static/img/bkImg/bk7.jpg"}]