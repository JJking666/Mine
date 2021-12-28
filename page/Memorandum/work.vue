//修改页面
<template>
	<view class="work">
		<u-subsection :list="list" mode="subsection"
					:current="current1" fontSize="16px" 
					activeColor="#a0d1b1"
					@change="changeCurrent1">
		</u-subsection>
		<swiper class="swiper work-swiper" :current="current2" @change="changeCurrent" 
		:style="{height:current2==0?swiperH1+'px':swiperH2+'px'}">
			<swiper-item >
				<!-- 待办 -->
				<view class="swiper-item work-itemA">			
					<!-- <view style="margin-top: 10vh;background-color: red;height: 1px;"></view> -->
					<uni-card :title="item.title"  :class="'content-wrap1' + index"
						:extra="item.date" 
						v-for="(item,index) in workData1" 
						:key="item.id"
						@tap="workOption(1,index)"><!-- workOption(index) -->
					    {{item.content}}
						<view class="options" :style="{height:option1[index]==true?'5vh':'0vh'}">
							<button class="" @tap="deleteWork(1,index)">
								<image src="../../static/img/memorandum/templateHL.png" ></image>
							</button>
							<button class="" @tap="addFinishWork(index)">
								<image src="../../static/uview/common/logo.png" ></image>
							</button>
						</view>
					</uni-card>
				</view>
			</swiper-item>
			<swiper-item>
				<!-- 已完成 -->
				<view class="swiper-item work-itemA">
					<uni-card :title="item.title" :class="'content-wrap2' + index"
						:extra="item.date" 
						v-for="(item,index) in workData2" 
						:key="item.id"
						@tap="workOption(2,index)"><!-- workOption(index) -->
					    {{item.content}}
						<view :style="{height:option2[index]==true?'5vh':'0vh'}"  class="options">
							<button class="" @tap="deleteWork(2,index)">
								<image src="../../static/uview/common/logo.png" ></image>
							</button>
						</view>
					</uni-card>
				</view>	
			</swiper-item>
		</swiper>
		<button type="default" v-show="!current" class="radius-button create" @tap="gotoWriteWork"><!--  -->
			<image src="../../static/img/more/add.png"></image>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperH1:0,
				swiperH2:0,
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
				let l1 = 0
				let l2 = 0
				this.option1.forEach((item)=>{
					if(item==true)l1++
				})
				this.option1.forEach((item)=>{
					if(item==true)l2++
				})
				this.swiperH1+=30*l1
				this.swiperH2+=30*l2
			},
			deleteWork(num,index){
				uni.showModal({
					title: '提示',
					content: '您确定要删除该事务吗？',
					success: (res) => {
						console.log(this.$data)
						if (res.confirm) {
							let d1={
								_id:num==1?this.$data.workData1[index]._id:this.$data.workData2[index]._id
							}
							uni.request({
									url: 'http://120.76.138.164:3000/work/deleteWork',
									data:d1
								})
								.then(data1 => {
									let [err1, res1] = data1
									console.log(res1)
									this.$data.option1=[]
									this.$data.workData1=[]
									this.$data.option2=[]
									this.$data.workData2=[]
									res1.data.data.forEach((item,index)=>{
										if(item.status==0){
											let work = item;
											this.$data.option1.push(false)
											this.$data.workData1.push(work)
										}else{
											let work = item;
											this.$data.option2.push(false)
											this.$data.workData2.push(work)
										}
									})
								})
						} else if (res.cancel) {
							return
						}
					}
				})
			},
			addFinishWork(index){
				let that =this
				console.log(index,this.workData1[index])
				let work = this.workData1[index]._id
				
				let d1 = {
					_id:work
				}
				uni.request({
					url:'http://120.76.138.164:3000/work/addFinishWork',
					data:d1
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
					that.swiperH2=0
					that.swiperH1=0
					that.workData1.forEach((item,index)=>{
						element = ".content-wrap1"+index
					    query = uni.createSelectorQuery().in(this);
					    query.select(element).boundingClientRect();
					    query.exec((res) => {
					        if (res && res[0]) {
								that.swiperH1 += res[0].height;
					        }
					    });
					})
					that.workData2.forEach((item,index)=>{
						element = "#content-wrap2"+index
					    query = uni.createSelectorQuery().in(this);
					    query.select(element).boundingClientRect();
					    query.exec((res) => {
					        if (res && res[0]) {
								that.swiperH2 += res[0].height;
					        }
					    });
					})
					if(that.swiperH2<800)that.swiperH2=800
					if(that.swiperH1<800)that.swiperH1=800
				})
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
						url:'http://120.76.138.164:3000/work/getWorks?data='+id
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
						console.log(2)
					})
				}
			})
		},
		mounted() {
			let element,query
			setTimeout(()=>{
				console.log('mmou',this.workData1)
				this.workData1.forEach((item,index)=>{
					element = "#content-wrap1"+index
				    query = uni.createSelectorQuery().in(this);
				    query.select(element).boundingClientRect();
				    query.exec((res) => {
				        if (res && res[0]) {
							this.swiperH1 += res[0].height;
				        }
				    });
				})
				this.workData2.forEach((item,index)=>{
					element = "#content-wrap2"+index
				    query = uni.createSelectorQuery().in(this);
				    query.select(element).boundingClientRect();
				    query.exec((res) => {
				        if (res && res[0]) {
							this.swiperH2 += res[0].height;
				        }
				    });
				})
			},200)
			setTimeout(()=>{
				if(this.swiperH2<800)this.swiperH2=800
				if(this.swiperH1<800)this.swiperH1=800
			},400)
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
					height: 5vh;
					display: flex;
					flex-direction: row;
					justify-content:space-evenly;
					align-items: center;
					transition: all 0.6s;
					overflow: hidden;
					& button{
						padding: 0px;
						width: 10vh;
						height: 5vh;
						border: 0rpx solid transparent;
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
