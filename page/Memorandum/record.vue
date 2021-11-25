//修改页面
<template>
	<view class="record">
		<image id="record-bk" src="../../static/img/memorandum/bk2.jpg" mode=""></image>
		<input id="record-input" placeholder="搜索记录" placeholder-style="" v-model="inputValue" @input="select" />
		<view 
			style="width: 98vw;height: fit-content; column-count: 2;column-gap: 1vw; margin: 1vw auto; box-sizing: border-box;">
			<view class="recordItem" v-for="(item,index) in textList" :key="index" @tap="showRecord(index)" >
				<view id="text" v-html="item.textvalue"></view>
				<text>11月19号</text>
			</view>
		</view>

		<button type="default" v-show="!current" class="create" @tap="gotoWriteRecord">
			<!--  -->
			<image src="../../static/img/memorandum/min_button.png"></image>
		</button>
		<view id="BigRecord" :animation="recordAnimation">
			{{bigrecord}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bigrecord:"",
				recordAnimation:'',
				inputValue: "",
				selecting: 0,
				t1: null,
				maxid: 10,
				show:0,
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
			showRecord(index){
				if(this.show==0){
					this.bigrecord=this.textList[index].textvalue;
					this.animation1.scale(1.3).step({ duration: 700 })
					this.show=1
					console.log(1)
				}else{
					this.animation1.scale(0).step({ duration: 400 })
				
					this.bigrecord=this.textList[index].textvalue;
					console.log(2)	
					this.animation1.scale(1.3).step({ duration: 500 })
				}
				this.recordAnimation=this.animation1.export()
				setTimeout(() => {
					this.recordAnimation=null
				}, 100);
				
			},
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
			let animation1 = uni.createAnimation({
			    duration: 1000,
			    timingFunction: 'ease',
			})
			this.animation1 = animation1
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
		background-color: #dee8cc;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 30rpx #323233;
		padding: 2vh 5vw;
		box-sizing: border-box;
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
