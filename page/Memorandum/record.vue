//修改页面
<template>
	<view class="record">
		<image id="record-bk" src="../../static/img/memorandum/bk2.jpg" mode=""></image>
		<input id="record-input" placeholder="搜索记录" placeholder-style="" v-model="inputValue" @input="select" />
		<view @tap="gotoRecord"
			style="width: 98vw;height: fit-content; column-count: 2;column-gap: 1vw; margin: 1vw auto; box-sizing: border-box;">
			<view class="recordItem" v-for="(item,index) in textList" :key="index">
				<view id="text" v-html="item.textvalue"></view>
				<text>11月19号</text>
			</view>
		</view>

		<button type="default" v-show="!current" class="create" @tap="gotoWriteRecord">
			<!--  -->
			<image src="../../static/img/memorandum/min_button.png"></image>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: "",
				selecting: 0,
				t1: null,
				maxid: 10,
				textList: [{
						id: 1,
						textvalue: "vue项目实现 搜索功能",
						date: "11月19号"
					},
					{
						id: 2,
						textvalue: "在uniApp开发中遇到 的问题及解决的在uniApp开发 中遇到的问题及解决的办",
						date: "11月19号"
					},
					{
						id: 3,
						textvalue: "和v-text 相似 但是它可在uniApp开发中 遇到的问题及解决的以将HT ML片段",
						date: "11月19号"
					},
					{
						id: 4,
						textvalue: "浏览器不 会对其再进行t",
						date: "11月19号"
					},
					{
						id: 5,
						textvalue: "标签在渲染的时候 被",
						date: "11月19号"
					},
					{
						id: 6,
						textvalue: "于将数据填充 到标在uniApp开发中遇到的问题及 解决的签中",
						date: "11月19号"
					},
					{
						id: 7,
						textvalue: "动问题 （如果数据中有HTML标签会",
						date: "11月19号"
					},
					{
						id: 8,
						textvalue: "于将数据填充 到标在uniApp开发中遇到的问题及 解决的签中",
						date: "11月19号"
					},
					{
						id: 9,
						textvalue: "动问题 （如果数据中有HTML标签会",
						date: "11月19号"
					},

				]
			}
		},
		methods: {
			select() {
				if (this.t1) {
					clearInterval(this.t1)
				}
				this.t1 = setTimeout(() => {
					this.textList.forEach((item) => {
						let str = new RegExp(this.inputValue)
						item.textvalue = item.textvalue.replace(this.inputValue,
							`<span style="color: red">${this.inputValue}</span>`)
					})
				}, 500);
				// this.textList.forEach((item)=>{
				// 	let str = new RegExp(this.inputValue)
				// 	item.textvalue=item.textvalue.replace(this.inputValue,`<span style="color: red">${this.inputValue}</span>`)
				// })
			},
			created() {

			},
			addRecord(res) {
				let record = {};
				record.id = this.maxid++
				record.textvalue = res.text;
				record.date = "11月19号"
				this.textList.unshift(record)
				console.log(this.textList)
				uni.navigateBack({
					delta: 1
				})
			},
			gotoWriteRecord() {
				uni.navigateTo({
					url: 'createRecord'
				})
			}
		},
		onReady() {
			let that = this
			uni.$on('contentemit', this.addRecord)
		}
	}
</script>

<style lang="scss">
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
			width: 46vw;
			height: calc(fit-content+2vh); //
			margin: 1vw;
			padding: 5vw;
			vertical-align: top;
			border: 1rpx solid transparent;
			border-radius: 20rpx;
			background-color: #edfffb;
			display: block;
			overflow: hidden;
			box-sizing: border-box;

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
