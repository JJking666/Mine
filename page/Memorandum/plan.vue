<template>
	<view class="plan">
		<view class="plan-item1" v-for="(item,index) in planData1" :key="index" @tap="changeShow(1,index)"
			:style="{height:planData1[index].visibity=='3vh'?4*item.content.length + 13 + 'vh':'12vh'}">
			<image id="deleteimg" src="../../static/img/memorandum/close-bold.png" @tap.stop="deletePlan(1,index)"></image>
			<text id="date">{{item.title}}</text>
			<text id="date1">{{item.startTime.slice(5,10)}}-{{item.endTime.slice(5,10)}}</text>
			<view class="planHidden"
				:style="{height:planData1[index].visibity=='3vh'?4*item.content.length + 1 + 'vh':'0vh'}">
				<label v-for="(item_1,index_1) in planData1[index].content" :key="index_1" class="label"
					:style="{height:planData1[index].visibity,textDecoration:item.finish[index_1]=='1'?'line-through':'',
					color:item.finish[index_1]=='1'?'grey':'black'}">
					<checkbox value="cb" :checked="item.finish[index_1]=='1'?true:false" color="#999bb9"
						 @tap.stop="changeFinish(1,index,index_1)" />{{item_1}}
				</label>
			</view>
		</view>
		<view class="plan-item2" v-for="(item,index) in planData2" :key="index" @tap="changeShow(2,index)"
			:style="{height:planData2[index].visibity=='3vh'?4*item.content.length + 13 + 'vh':'12vh'}">
			<image id="deleteimg" src="../../static/img/memorandum/close-bold.png" @tap.stop="deletePlan(2,index)"></image>
			<text id="date" style="color: grey;text-decoration: line-through;">{{item.title}}</text>
			<text id="date1" style="color: grey;text-decoration: line-through;">{{item.startTime.slice(5,10)}}-{{item.endTime.slice(5,10)}}</text>
			<view class="planHidden"
				:style="{height:planData2[index].visibity=='3vh'?4*item.content.length + 1 + 'vh':'0vh'}">
				<label v-for="(item_1,index_1) in planData2[index].content" :key="index_1" class="label"
					:style="{height:planData2[index].visibity,textDecoration:finishStyle.text,color:finishStyle.color}">
					<checkbox value="cb" :checked="item.finish[index_1]=='1'?true:false" color="#999bb9"
						 @tap.stop="changeFinish(2,index,index_1)" />{{item_1}}
				</label>
			</view>
			
		</view>
		<button class="create" @tap="createPlan">
			<!--  -->
			<image src="../../static/img/more/add.png"></image>
		</button>
		<view class="finish" :animation="finAnimation">
			真厉害!又完成一项计划啦~
		</view>
	</view>
</template>
//(n+1)+3*n+12=3n+n+13
<script>
	export default {
		data() {
			return {
				id: '',
				finishStyle:{
					text:"line-through",
					color:"grey"
				},
				demoData: [1, 2, 3, 4, 5, 6],
				planData: [],
				planData1: [],
				planData2: [],
				maxid: 9,
				deleteID: '',
				changeF: 0,
				changing: '',
				finAnimation:'',
				dataID:''
			}
		},
		methods: {
			changeAnimation(index) {
				
			},
			changeFinish(status, index, index_1) {
				if (this.changeF) clearInterval(this.changeF)
				let data1
				//修改已完成计划的单项
				if (status == 1) {
					let n = this.planData1[index]['finish'][index_1] == '0' ? '1' : '0'
					this.$set(this.planData1[index]['finish'], index_1, n)
					let num = this.planData1[index]['finish'].filter((item) => {
						return item == 0
					})
					console.log(num)
					
					
					let finishA=this.planData1[index]['finish']
					let dataID=this.planData1[index]._id
					if (num.length == 0) {
						this.planData1[index]['status'] = 1
						let i 
						this.planData.forEach((item,index1)=>{
							if(item._id == this.planData1[index]._id){
								i=index1
								return 
							}
						})
						this.planData[i]['status'] = 1
						let animationF = uni.createAnimation({
						        timingFunction: 'ease',
						    })
						this.animationF = animationF
						this.animationF.scale(1.3).opacity(1).step({duration: 700})
						this.animationF.scale(0).opacity(0).step({duration: 3800})
						this.finAnimation=this.animationF.export()
						setTimeout(()=>{
							this.finAnimation=null
						},4500)
						this.planData1=this.planData.filter((item)=>{
							return item.status=='0'
						})
						this.planData2=this.planData.filter((item)=>{
							return item.status=='1'
						})
						//this.changeShow(1, index)
					}
					//修改选项
					this.changeF = setTimeout(() => {
						if (this.changeF == 0) return 
						console.log(this.dataID)
						let data = {
							UserID: this.id,
							_id: dataID,
							finish: finishA
						}
						data1 = {
							_id: this.planData1[index]._id,
							num:num.length
						}
						uni.request({
							url: 'http://120.76.138.164:3000/plan/changePlan',
							data: data1
						})
						uni.request({
								url: 'http://120.76.138.164:3000/plan/changeFinish',
								data: data
							})
							.then(data => {
								let [err, res] = data;
								console.log(res.data);
							})
					}, 1000)
				} else {
					let n = this.planData2[index]['finish'][index_1] == '0' ? '1' : '0'
					this.$set(this.planData2[index]['finish'], index_1, n)
					let num = this.planData2[index]['finish'].filter((item) => {
						return item == 0
					})
					let dataID=this.planData2[index]._id
					let finishA=this.planData1[index]['finish']
					//若选项全为1则将这项计划改为已完成
					if (num.length == 0) {
						
						this.planData2[index]['status'] = '1'
						this.planData1=this.planData.filter((item)=>{
							return item.status=='0'
						})
						this.planData2=this.planData.filter((item)=>{
							return item.status=='1'
						})
					}
					//修改选项
					this.changeF = setTimeout(() => {
						if (this.changeF == 0) return
						let data = {
							UserID: this.id,
							_id: dataID,
							finish: this.planData2[index]['finish']
						}
						data1 = {
							_id: this.planData1[index]._id,
							num:num.length
						}
						uni.request({
							url: 'http://120.76.138.164:3000/plan/changePlan',
							data: data1
						})
						uni.request({
								url: 'http://120.76.138.164:3000/plan/changeFinish',
								data: data
							})
							.then(data => {
								let [err, res] = data;
								console.log(res.data);
							})
					}, 1000)
				}

			},
			changeShow(status, index) {
				if (status == 1) {
					this.planData1[index].visibity = this.planData1[index].visibity == "3vh" ? "0vh" : "3vh";
					this.$set(this.planData1, index, {
						startTime: this.planData1[index].startTime,
						endTime: this.planData1[index].endTime,
						title: this.planData1[index].title,
						content: this.planData1[index].content,
						visibity: this.planData1[index].visibity,
						finish: this.planData1[index].finish,
						_id: this.planData1[index]._id,
						UserID: this.planData1[index].UserID,
						status: this.planData1[index].status
					})
				} else {
					this.planData2[index].visibity = this.planData2[index].visibity == "3vh" ? "0vh" : "3vh";
					this.$set(this.planData2, index, {
						startTime: this.planData2[index].startTime,
						endTime: this.planData2[index].endTime,
						title: this.planData2[index].title,
						content: this.planData2[index].content,
						visibity: this.planData2[index].visibity,
						finish: this.planData2[index].finish,
						_id: this.planData2[index]._id,
						UserID: this.planData2[index].UserID,
						status: this.planData2[index].status
					})
				}

				// this.planData1=this.planData.filter((item)=>{
				// 	return item.status=='0'
				// })
				// this.planData2=this.planData.filter((item)=>{
				// 	return item.status=='1'
				// })
				//深层对象无法响应
			},
			createPlan() {
				let that = this
				uni.navigateTo({
					url: 'createPlan?id=' + that.id
				})
			},
			deletePlan(status, index) {
				if (status == 1) {
					this.deleteID = this.planData1[index]._id
				} else {
					this.deleteID = this.planData2[index]._id
				}

				uni.showModal({
					title: '提示',
					content: '您确定要删除该计划吗？',
					success: (res) => {
						console.log(this.$data)
						if (res.confirm) {

							let that = this
							uni.request({
									url: 'http://120.76.138.164:3000/plan/deletePlan?data=' + that.deleteID
								})
								.then(data1 => {
									let [err1, res1] = data1
									console.log(res1)
									that.planData.splice(index, 1);
									this.planData1 = this.planData.filter((item) => {
										return item.status == '0'
									})
									this.planData2 = this.planData.filter((item) => {
										return item.status == '1'
									})
								})

						} else if (res.cancel) {
							return
						}
					}
				})
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
		onShow() {
			let that = this
			let id

			uni.getStorage({
				key: "UserID",
				success: (res) => {
					id = res.data
					that.id = res.data
					uni.request({
							url: 'http://120.76.138.164:3000/plan/queryPlans?data=' + id
						})
						.then(data => {
							let [err1, res1] = data
							that.planData = res1.data.data
							that.planData.forEach((item) => {
								item.visibity = '0vh'
								item.content = item.content.split("\n")
							})
							this.planData1 = this.planData.filter((item) => {
								return item.status == '0'
							})
							this.planData2 = this.planData.filter((item) => {
								return item.status == '1'
								})
					})
				}
			})
		}
	}
</script>

<style lang="scss">
	$planHeight:8vh;
	.finish{
		width: 100vw;
		    height: 10vh;
		    position: absolute;
		    left: 0;
		    top: 25vh;
		    line-height: 10vh;
		    color: white;
			opacity: 0.5;
			transform: scale(0);
		    text-align: center;
		    background-image: linear-gradient(to right,rgba(230, 230, 230, 0.2), #37f6ff, rgba(230, 230, 230, 0.2));
			transition: all 1s;
	}
	checkbox{
		margin-left: 1vw;
	}
	.plan {
		width: 100vw;
		height: 100vh;

		.plan-item1 {
			width: 90vw;
			height: fit-content;
			display: flex;
			flex-direction: column;
			background-color: #b8f1cc;
			border: 1rpx solid transparent;
			border-radius: 3vw;
			margin: 2vh auto;
			position: relative;
			transition: all 1s;

			#deleteimg {
				width: 2vh;
				height: 2vh;
				size: 100%;
				position: absolute;
				top: 1vh;
				right: 3vw;
			}

			.planHidden {
				transition: all 0.5s ease;
				overflow: hidden;
			}

			#date {
				margin: 0 auto;
				display: inline-block;
				width: 90%;
				height: 8vh;
				font-size: 42rpx;
				font-weight: 600;
				text-align: center;
				line-height: 8vh;
				border-bottom: 1rpx double #3d3e41;
			}

			#date1 {
				margin: 0 auto;
				display: inline-block;
				width: 90%;
				height: 4vh;
				font-size: $fontSize-md;
				color: #828282;
				text-align: center;
				line-height: 4vh;
				border-bottom: 1rpx double #606266;
			}

			.label {
				margin-left: 5vw;
				width: inherit;
				height: 4vh;
				display: block;
				overflow: hidden;
				transition: all 0.5s ease;
				margin: 1vh 0;
				margin-left: 3vw;

				&:nth-child(1) {
					margin-top: 1vh;
				}

				&:last-child {
					margin-bottom: 1vh;
				}
			}
		}
		.plan-item2 {
			width: 90vw;
			height: fit-content;
			display: flex;
			flex-direction: column;
			background-color: #b8f1cc;
			border: 1rpx solid transparent;
			border-radius: 3vw;
			margin: 2vh auto;
			position: relative;
			transition: all 1s;
		
			#deleteimg {
				width: 2vh;
				height: 2vh;
				size: 100%;
				position: absolute;
				top: 1vh;
				right: 3vw;
			}
		
			.planHidden {
				transition: all 0.5s ease;
			}
		
			#date {
				margin: 0 auto;
				display: inline-block;
				width: 90%;
				height: 8vh;
				font-size: 42rpx;
				font-weight: 600;
				text-align: center;
				line-height: 8vh;
				border-bottom: 1rpx double #3d3e41;
			}
		
			#date1 {
				margin: 0 auto;
				display: inline-block;
				width: 90%;
				height: 4vh;
				font-size: $fontSize-md;
				color: #828282;
				text-align: center;
				line-height: 4vh;
				border-bottom: 1rpx double #606266;
			}
		
			.label {
				margin-left: 5vw;
				width: inherit;
				height: 4vh;
				display: block;
				overflow: hidden;
				transition: all 0.5s ease;
				margin: 1vh 0;
				margin-left: 3vw;
		
				&:nth-child(1) {
					margin-top: 1vh;
				}
		
				&:last-child {
					margin-bottom: 1vh;
				}
			}
		}
		.createPlan {}
	}
</style>
