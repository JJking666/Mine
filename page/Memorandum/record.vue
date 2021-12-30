//修改页面
<template>
	<view class="record">
		<image id="record-bk" src="../../static/img/bkImg/bk6.jpg" mode=""></image>
		<input id="record-input" placeholder="搜索记录" placeholder-style="" v-model="inputValue" @input="select" />
		<view 
			style="width: 45vw;height: fit-content; margin: 1vw 0; box-sizing: border-box;margin-left: 3vw;display: inline-block;">
			<view class="recordItem" v-for="(item,index) in recordData1"  :key="index" @tap="showRecord(1,index)"  >
				<view id="text" v-html="item.content"></view>
				<text>{{item.time.slice(0,10)}}</text>
				<image id="deleteImg" @tap=deleteRecord(1,index) src="../../static/img/memorandum/close-bold.png" mode=""></image>
			</view>
		</view>
		<view
			style="width: 45vw;height: fit-content; margin: 1vw 0; box-sizing: border-box;margin-left: 2vw;
			display: inline-block;vertical-align: top;">
			<view class="recordItem" v-for="(item,index) in recordData2"  :key="index" @tap="showRecord(2,index)"  >
				<view id="text" v-html="item.content"></view>
				<text>{{item.time.slice(0,10)}}</text>
				<image id="deleteImg" @tap=deleteRecord(2,index) src="../../static/img/memorandum/close-bold.png" mode=""></image>
			</view>
		</view>
		<button  class="create" @tap="gotoWriteRecord">
			<!--  -->
			<image src="../../static/img/more/add.png"></image>
		</button>
		<view id="BigRecord" :animation="recordAnimation" @tap="hideRecord()">
			{{bigrecord}}
		</view>
	</view>
</template>

<script>
	export default {
		computed:{
			recordData1(){
				return this.recordData.filter((item,index)=>{
					return index%2==0
				})
			},
			recordData2(){
				return this.recordData.filter((item,index)=>{
					return index%2!=0
				})
			}
		},	
		data() {
			return {
				recordData:[],				
				bigrecord:"",
				recordAnimation:'',
				inputValue: "",
				selecting: 0,
				t1: null,
				maxid: 10,
				show:0,
				deleteID:'',
				firstRecord:[],
			}
		},			 
		methods: {   
			deleteRecord(num,index) {
				this.deleteID=num==1?this.recordData[index*2]._id:this.recordData[index*2+1]._id
				console.log(this.deleteID)
				uni.showModal({
					title: '提示',
					content: '您确定要删除该计划吗？',
					success: (res)=>{
						if (res.confirm) {
							let that =this
							uni.request({
								url:'http://120.76.138.164:3000/record/deleteRecord?data='+ that.deleteID
							})
							.then(data1=>{
								let [err1,res1]=data1
								if(num==1){
									that.recordData.splice(index*2, 1);
								}else{
									that.recordData.splice(index*2+1, 1);
								}
							})
							that.firstRecord=JSON.parse(JSON.stringify(that.recordData)) 
							this.hideRecord()
						} else if (res.cancel) {
							this.hideRecord()
							return
						}
					}
				})
			},
			hideRecord(){
				this.animation1.scale(0).step({ duration: 700 })
				this.recordAnimation=this.animation1.export()
				setTimeout(() => {
					this.recordAnimation=null
				}, 100);
				this.show=0;
			},
			showRecord(num,index){
				if(this.show==0){
					if(num==1){
						this.bigrecord=this.recordData1[index].content;
					}else{
						this.bigrecord=this.recordData2[index].content;
					}
					this.animation1.scale(1.3).step({ duration: 700 })
					this.show=1
				}else{
					this.animation1.scale(0).step({ duration: 400 })
					if(num==1){
						this.bigrecord=this.recordData1[index].content;
					}else{
						this.bigrecord=this.recordData2[index].content;
					}
					this.animation1.scale(1.3).step({ duration: 500 })
				}
				this.recordAnimation=this.animation1.export()
				setTimeout(() => {
					this.recordAnimation=null
				}, 100);
				
			},
			select() {
				if(this.inputValue.length==0){
					this.recordData=JSON.parse(JSON.stringify(this.firstRecord))
					return
				}
				console.log('s')
				if (this.t1) {
					clearInterval(this.t1)
				}
				this.t1 = setTimeout(() => {
					console.log('t')
					let r1=[]
					let r2=[]
					this.recordData=JSON.parse(JSON.stringify(this.firstRecord))
					this.recordData1.forEach((item,index) => {
						let str = new RegExp(this.inputValue)
						if(item.content.match(str)){
							r1.push(index)
							item.content = item.content.replace(this.inputValue,
							`<span style="color: red">${this.inputValue}</span>`)
						}	
					})
					this.recordData2.forEach((item,index) => {
						let str = new RegExp(this.inputValue)
						if(item.content.match(str)){
							r2.push(index)
							item.content = item.content.replace(this.inputValue,
							`<span style="color: red">${this.inputValue}</span>`)
						}	
					})
					r1.forEach((item)=>{
						let item1 = this.recordData1[item]
						this.recordData1.splice(item,1);
						this.recordData1.unshift(item1)
					})
					r2.forEach((item)=>{
						let item2 = this.recordData2[item]
						this.recordData2.splice(item,1);
						this.recordData2.unshift(item2)
					})
				}, 500);
				// this.textList.forEach((item)=>{
				// 	let str = new RegExp(this.inputValue)
				// 	item.textvalue=item.textvalue.replace(this.inputValue,`<span style="color: red">${this.inputValue}</span>`)
				// })
			},
			
			gotoWriteRecord() {
				uni.redirectTo({
					url: 'createRecord'
				})
			}
		},
		onReady() {
			let that = this
			let animation1 = uni.createAnimation({
			    duration: 1000,
			    timingFunction: 'ease',
			})
			this.animation1 = animation1
		},
		onLoad() {
			let that =this
			let id
			uni.getStorage({
				key:"UserID",
				success:(res)=>{
					id = res.data
					console.log(id)
					uni.request({
						url:'http://120.76.138.164:3000/record/queryRecords?data='+id
					})
					.then(data=>{
						let [err1,res1]=data
						that.recordData=res1.data.data
						that.firstRecord=JSON.parse(JSON.stringify(that.recordData)) 
						that.$forceUpdate()
					})
				}
			})
		},
		onShow() {
			let that =this
			let id
			uni.getStorage({
				key:"UserID",
				success:(res)=>{
					id = res.data
					console.log(id)
					uni.request({
						url:'http://120.76.138.164:3000/record/queryRecords?data='+id
					})
					.then(data=>{
						let [err1,res1]=data
						that.recordData=res1.data.data
						that.firstRecord=JSON.parse(JSON.stringify(that.recordData)) 
						that.$forceUpdate()
					})
				}
			})
		}
	}
</script>

<style lang="scss">
	#BigRecord{
		position: fixed;
		top: 20vh;
		left: 20vw;
		height: 50vh;
		overflow: scroll;
		width: 60vw;
		transform: scale(0);
		background-color: #3CB371;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 30rpx #323233;
		padding: 2vh 5vw;
		box-sizing: border-box;
		font-size: $fontSize-sm;
		font-weight: 500;
		color:aliceblue;
	}
	.record {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		overflow: auto;

		#record-input {
			margin: 2vh auto;
			width: 70vw;
			height: 6vh;
			border: 1rpx solid transparent;
			border-radius: 30rpx;
			font-size: $fontSize-lg;
			background-color: #f6fff9;
			line-height: 6vh;
			padding: 0 5vw;
		}

		#record-bk {
			position: fixed;
			top: 0;
			left: -30vw;
			width: 160vw;
			height: inherit;
			size: 100%;
			z-index: -1;
		}

		& .recordItem {
			width: 45vw;
			height: calc(fit-content+2vh); //
			margin: 1vw;
			padding: 5vw;
			vertical-align: top;
			border: 1rpx solid transparent;
			border-radius: 20rpx;
			background-color: #b8f1cc;
			display: block;
			overflow: hidden;
			box-sizing: border-box;
			position: relative;
			#deleteImg{
				position: absolute;
				right:1vw ;
				top: 1vh;
				display: inline-block;
				width: 1.5vh;
				height: 1.5vh;
				size: 100%;
			}
			
			#text {
				width: 80%;
				height: fit-content;
				display: -webkit-box;
				font-size: $fontSize-md;
				overflow: hidden;
				-webkit-line-clamp: 5;
				-webkit-box-orient: vertical;
				line-height: 150%;
			}

			text:nth-of-type(1) {
				display: inline-block;
				margin-top: 2vh;
				width: 80%;
				height: 2vh;
				font-size: $fontSize-sm;
				color: #606266;
				line-height: 150%;
			}
		}

	}
</style>
