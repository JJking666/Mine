<template>
	<view class="plan">
		<view class="plan-item" v-for="(item,index) in planData" :key="index" @tap="changeShow(index)">
			<image id="deleteimg" src="../../static/img/memorandum/close-bold.png" @tap="deletePlan(index)"></image>
			<text id="date">{{item.title}}</text>
			<text id="date1">{{item.startTime.slice(5,10)}}-{{item.endTime.slice(5,10)}}</text>
			<view class="planHidden" :style="{height:planData[index].visibity=='3vh'?4*item.content.length + 1 + 'vh':'0vh'}">
				<label v-for="(item_1,index_1) in planData[index].content" :key="index_1" class="label"
					:style="{height:planData[index].visibity}">
					<checkbox value="cb" checked="true" color="#FFCC33" style="margin-left: 1vw;" />{{item_1}}
				</label>
			</view>
		</view>
		<button class="create" @tap="createPlan">
			<!--  -->
			<image src="../../static/more/add.png"></image>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				demoData:[1,2,3,4,5,6],
				planData:[],
				planitem: [{
					id: 1,
					title: "啦啦啦",
					content: ["1.123123142", "1.123123142", "1.123123142", "1.123123142", "1.123123142"],
					date: ["2021-03-20", "2023-05-10"],
					visibity: "0vh"
				}, {
					id: 2,
					title: "啦啦啦",
					content: ["1.123123142", "1.123123142", "1.123123142", "1.123123142", "1.123123142"],
					date: ["2021-03-20", "2023-05-10"],
					visibity: "0vh"
				}, {
					id: 3,
					title: "啦啦啦",
					content: ["1.123123142", "1.123123142", "1.123123142", "1.123123142", "1.123123142"],
					date: ["2021-03-20", "2023-05-10"],
					visibity: "0vh"
				}, {
					id: 4,
					title: "啦啦啦",
					content: ["1.123123142", "1.123123142", "1.123123142", "1.123123142", "1.123123142"],
					date: ["2021-03-20", "2023-05-10"],
					visibity: "0vh"
				}, {
					id: 5,
					title: "啦啦啦",
					content: ["1.123123142", "1.123123142", "1.123123142", "1.123123142", "1.123123142"],
					date: ["2021-03-20", "2023-05-10"],
					visibity: "0vh"
				}, {
					id: 6,
					title: "啦啦啦",
					content: ["1.123123142", "1.123123142", "1.123123142", "1.123123142", "1.123123142"],
					date: ["2021-03-20", "2023-05-10"],
					visibity: "0vh"
				}, {
					id: 7,
					title: "啦啦啦",
					content: ["1.123123142", "1.123123142", "1.123123142", "1.123123142", "1.123123142"],
					date: ["2021-03-20", "2023-05-10"],
					visibity: "0vh"
				}, {
					id: 8,
					title: "啦啦啦",
					content: ["1.123123142", "1.123123142", "1.123123142", "1.123123142", "1.123123142"],
					date: ["2021-03-20", "2023-05-10"],
					visibity: "0vh"
				}],
				maxid: 9
			}
		},
		methods: {
			changeShow(index) {
				this.planData[index].visibity = this.planData[index].visibity == "3vh" ? "0vh" : "3vh";
				this.$set(this.planData,index,{
					startTime:this.planData[index].startTime,
					endTime:this.planData[index].endTime,
					title:this.planData[index].title,
					content:this.planData[index].content,
					visibity:this.planData[index].visibity
				})
				//深层对象无法响应
			},
			createPlan() {
				let that =this
				uni.navigateTo({
					url: 'createPlan?ID'+that.id
				})
			},
			getPlan(value) {
				let plan = {}
				plan.title = value[0]
				plan.content = value[1]
				plan.date = value[2]
				console.log(value[2]) //["2021-03-20", "2023-05-10"]
				console.log(value[2][0]) //"2021-03-20"
				if (value[2][0] == value[2][1]) {
					plan.date = value[2][1];
				} else {
					plan.date = value[2][0] + "-" + value[2][1];
				}
				plan.id = this.maxid++;
				plan.visibity = '0vh'
				this.planitem.unshift(plan)
			},
			deletePlan(index) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '您确定要删除该计划吗？',
					success: function(res) {
						if (res.confirm) {
							that.planitem.splice(index, 1);
						} else if (res.cancel) {
							return
						}
					}
				});
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
		onReady() {
			let that =this
			let id
			uni.$on('planemit', this.getPlan);
			uni.getStorage({
				key:"UserID",
				success:(res)=>{
					id = res.data
					that.id=res.data
					console.log(id)
					uni.request({
						url:'http://127.0.0.1:3000/plan/queryPlans?data='+id
					})
					.then(data=>{
						let [err1,res1]=data
						that.planData=res1.data.data
						that.planData.forEach((item)=>{
							item.visibity='0vh'
							item.content = item.content.split("\n")
						})
						
					})
				}
			})
		}
	}
</script>

<style lang="scss">
	$planHeight:8vh;

	.plan {
		width: 100vw;
		height: 100vh;

		.plan-item {
			width: 90vw;
			height: fit-content;
			display: flex;
			flex-direction: column;
			background-color: #b8f1cc;
			border: 1rpx solid transparent;
			border-radius: 3vw;
			margin: 2vh auto;
			position: relative;

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
