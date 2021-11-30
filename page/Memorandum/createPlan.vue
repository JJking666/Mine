<template>
	<view class="createPlan">
		<picker class="date" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
			<view class="uni-input">{{date}}</view>
		</picker>
		<view class="createPlan-content">
			<textarea v-model="title" id="title" placeholder="标题"
				placeholder-style="font-size:46rpx;line-height: 150%;"></textarea>
			<uni-datetime-picker v-model="datetimerange" type="daterange" :start="datetimerange[0]"
				:end="datetimerange[1]" rangeSeparator="至" />
			<textarea placeholder="请输入" placeholder-style="margin-left:5rpx" v-model="textData"
				@linechange="lineChange"></textarea>
		</view>
		<button type="primary" class="gobackPlan radius-button" @tap="gobackPlan">提交</button>
	</view>


</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
				datetimerange: ["2021-03-20", "2023-05-10"],
				textData: "",
				title: "",
				lineCount: 1
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
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			lineChange(e) {
				if (e.detail["lineCount"] == 1) {
					this.textData = (e.detail["lineCount"]) + '.' + this.textData
				} else {
					this.textData = this.textData + (e.detail["lineCount"]) + '.';
				}

			},
			gobackPlan() {
				if (this.textData.length <= 2) return
				this.textData = this.textData.split("\n");
				uni.$emit('planemit', [this.title, this.textData, this.datetimerange])
				uni.navigateBack({
					delta: 1
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
		}
	}
</script>

<style lang="scss">
	.createPlan {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		overflow: auto;

		.gobackPlan {
			width: 50vw;
			height: 8vh;
			margin: 0 auto;
			margin-top: 4vh;
			font-size: $fontSize-lg;
			line-height: 8vh;
		}

		#title {
			width: 100vw;
			height: 8vh;
			text-align: center;
			font-size: 46rpx;
			font-weight: 600;
		}

		.createPlan-content {
			margin: 0 auto;
			margin-top: 2vh;
			width: 90vw;
			height: fit-content;
			background-color: #DBF1E1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			textarea {
				padding: 2vh 5vw;
				width: 100%;
				font-size: $fontSize-md;
				height: 65vh;
				white-space: wrap;
				line-height: 210%;
				box-sizing: border-box;
				text-decoration: underline;
			}
		}
	}
</style>
