//修改页面
<template>
	<view class="work">
		<u-subsection :list="list" mode="subsection"
					:current="current1" fontSize="16px" 
					activeColor="#a0d1b1"
					@change="changeCurrent1">
		</u-subsection>
		<swiper class="swiper work-swiper" :current="current2" @change="changeCurrent">
			<swiper-item>
				<!-- 待办 -->
				<view class="swiper-item work-itemA">			
					<!-- <view style="margin-top: 10vh;background-color: red;height: 1px;"></view> -->
					<uni-card :title="item.title" 
						:extra="item.date" 
						v-for="(item,index) in noteData1" 
						:key="item.id"
						@tap="workOption(1,index)"><!-- workOption(index) -->
					    {{item.content}}
						<view v-if="item.option"  class="options">
							<button class="" @tap="deleteWork(1,index)">
								<image src="../../static/img/memorandum/templateHL.png" ></image>
							</button>
							<button class="" @tap="addFinishWork(1,index)">
								<image src="../../static/uview/common/logo.png" ></image>
							</button>
						</view>
					</uni-card>
				</view>
			</swiper-item>
			<swiper-item>
				<!-- 已完成 -->
				<view class="swiper-item work-itemA">
					<uni-card :title="item.title"
						:extra="item.date" 
						v-for="(item,index) in noteData2" 
						:key="item.id"
						@longpress="workOption(2,index)"><!-- workOption(index) -->
					    {{item.content}}
						<view v-if="item.option"  class="options">
							<button class="" @tap="deleteWork(2,index)">
								<image src="../../static/uview/common/logo.png" ></image>
							</button>
						</view>
					</uni-card>
				</view>	
			</swiper-item>
		</swiper>
		<button type="default" v-show="!current" class="radius-button create" @tap="gotoWriteWork"><!--  -->
			<image src="../../static/more/add.png"></image>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				firstCard:'2vh',
				noteData1:[
					{
						id:1,
						title:"吃饭",
						content:"今天吃了大米饭",
						date:"11/16",
						option:true
					},
					{
						id:2,
						title:"看电影",
						content:"今天看了国产007今天看了国产007今天看了国产007今天看了国产007",
						date:"11/15",
						option:false
					},
					{
						id:3,
						title:"上课",
						content:"今天的课我一直睡觉觉",
						date:"11/15",
						option:false
					},
					{
						id:4,
						title:"睡觉",
						content:"今天睡觉觉",
						date:"11/14",
						option:false
					},
					{
						id:5,
						title:"打豆豆",
						content:"今天打了大白菜",
						date:"11/14",
						option:false
					}
				],noteData2:[
					{
						id:1,
						title:"吃饭",
						content:"今天吃了大米饭",
						date:"11/16",
						option:true
					},
					{
						id:2,
						title:"看电影",
						content:"今天看了国产007今天看了国产007今天看了国产007今天看了国产007",
						date:"11/15",
						option:false
					},
					{
						id:3,
						title:"上课",
						content:"今天的课我一直睡觉觉哈哈哈",
						date:"11/15",
						option:false
					},
					{
						id:4,
						title:"睡觉",
						content:"今天和",
						date:"11/14",
						option:false
					},
					{
						id:5,
						title:"打豆豆",
						content:"今天仔大白菜",
						date:"11/14",
						option:false
					}
				],
				maxid:6,
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				list: ['待办', '已完成'],
				current1: 1,
				current2: 0,
			}
		},
		methods: {
			changeCurrent(index) {
				console.log(typeof index,index)
				this.current2 = index.detail.current;
				this.current1=this.current2==0?1:0;
			},
			changeCurrent1(index) {
				console.log(typeof index,index)
				this.current1 = index==0?1:0;
			},
			gotoWriteWork(){
				console.log("tap")
				uni.navigateTo({
				  url: './writeWork',
				})
			},
			addWork(data){
				if(!data.title&&!data.value)return;
				if(!data.title)data.title="无"
				if(!data.value)data.value="无"
				let work={id:this.maxid,title:data.title,content:data.value,date:"11/17",option:false}
				this.noteData1.unshift(work);
			},
			workOption(num,index){
				if(num==1){this.noteData1[index].option=!this.noteData1[index].option;}
				else{this.noteData2[index].option=!this.noteData2[index].option;}
			},
			deleteWork(num,index){
				if(num==1){this.noteData1.splice(index,1);}
				else{this.noteData2.splice(index,1);}
			},
			addFinishWork(index){
				let work = this.noteData1[index]
				this.noteData2.unshift(work)
				this.noteData1.splice(index,1);
			}
		},
		onReady() {
			uni.$on('addWork',this.addWork)
		}
	}
</script>

<style lang="scss">
	.work {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		
		.work-swiper {
			height: 90vh;
			.work-itemA {
				width: 100vw;
				height: 100%;
				background-color: #ffffff;
				margin-top: -2vh;
				padding:3vh 0;
				.options{
					margin-top: 1vh;
					width: inherit;
					height: 6vh;
					display: flex;
					flex-direction: row;
					justify-content:space-evenly;
					align-items: center;
					& button{
						padding: 0px;
						width: 10vh;
						height: 5vh;
						border: 1rpx solid transparent;
						border-radius: 3rpx;
						margin:0;
						display: inline-block;
						image{
							width: 5vh;
							height: 5vh;
							size: 100%;
						}
					}
				}
			}

			.work-itemB {
				width: 100vw;
				height: 100%;
				background-color: #DBF1E1;
			}
		}
		.create{
			position: fixed;
			right: 4vw;
			bottom:20vh;
			width: 15vw;
			height: 15vw;
			background-color: #91bea1;
			padding: 2vw 2vw;
			    box-sizing: border-box;
				border: 1rpx solid #A5A5A5;
			image{
				width: 11vw;
				height: 11vw;
				size: 100%;
			}
		}
	}
</style>
