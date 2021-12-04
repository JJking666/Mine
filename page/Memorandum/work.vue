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
						v-for="(item,index) in workData1" 
						:key="item.id"
						@tap="workOption(1,index)"><!-- workOption(index) -->
					    {{item.content}}
						<view v-if="option1[index]"  class="options">
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
						v-for="(item,index) in workData2" 
						:key="item.id"
						@tap="workOption(2,index)"><!-- workOption(index) -->
					    {{item.content}}
						<view v-if="option2[index]"  class="options">
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
				workData1:[],
				workData2:[],
				option1:[],
				option2:[],
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
				console.log(2)
				let optionA=!this.option1[index]
				let optionB=!this.option2[index]
				if(num==1){this.option1.splice(index,1,optionA)}
				else{this.option2.splice(index,1,optionB)}
			},
			deleteWork(num,index){
				if(num==1){this.workData1.splice(index,1);}
				else{this.workData2.splice(index,1);}
			},
			addFinishWork(index){
				let work = this.workData1[index]
				this.workData2.unshift(work)
				this.workData1.splice(index,1);
			}
		},
		onShow() {
			uni.$on('addWork',this.addWork)
			let that =this
			uni.getStorage({
				key:"UserID",
				success(res) {
					let id =res.data
					uni.request({
						url:'http://127.0.0.1:3000/work/getWorks?data='+id
					})
					.then(data1=>{
						let [err1,res1]=data1
						that.option1=[]
						that.workData1=[]
						that.option2=[]
						that.workData2=[]
						res1.data.data.forEach((item,index)=>{
							if(item.status==0){
								let work = item;
								that.option1.push(false)
								that.workData1.push(work)
							}else{
								let work = item;
								that.option2.push(false)
								that.workData2.push(work)
							}
						})
					})
				}
			})
		}
	}
</script>

<style lang="scss">
	.work {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		
		.work-swiper {
			height:100vh;
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
