<template>
	<view class="funs">
		<image id="record-bk" src="../../static/more/微信图片_20211126111415.jpg" mode=""></image>
		<input id="record-input" placeholder="输入手机号或昵称" placeholder-style="" v-model="inputValue" @input="select" />
		<view class="selectPeople">
			<view class="select-item" v-for="(item,index) in selectFun" :key="index">
				<image :src="item.headImg">
					<view v-html="item.name" style="display: inline-block;"></view>
					<image
						:src="item.sex=='man'?'../../static/more/faxian-36.png':'../../static/more/微信图片_20211126111415.jpg'"
						mode=""></image>
					<button @tap="addFriend(item._id)">关注</button>
			</view>
		</view>
		<view class="content">
			<view class="fun-item" v-for="(item,index) in funs" :key="index">
				<image :src="item.headImg">
					<text>{{item.name}}</text>
					<image
						:src="item.sex=='man'?'../../static/more/faxian-36.png':'../../static/more/微信图片_20211126111415.jpg'"
						mode=""></image>
					<button @tap="cancelFun(item.id)">已关注</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: '',
				inputing: '',
				funs: [],
				selectFun: []
			}
		},
		methods: {
			select() {
				let that = this
				if (this.inputValue.length < 1) {
					this.selectPeople = []
					return
				}
				if (this.inputing) {
					clearInterval(this.inputing)
				}
				this.inputing = setTimeout(() => {
					let r = new RegExp(that.inputValue)
					console.log(r)
					that.selectFun = []
					that.funs.forEach((item) => {
						

						if (item.name.match(r)) {
							console.log('m')
							let fun = JSON.parse(JSON.stringify(item))
							fun.name = fun.name.replace(that.inputValue,
								`<span style="color: grey">${this.inputValue}</span>`)
							that.selectFun.push(fun);
						}
					})
					console.log(that.selectFun)
				}, 500)
			}
		},
		onLoad(option) {
			let that = this
			uni.request({
					url: 'http://127.0.0.1:3000/relationship/queryRelationship?data=' +
						'{"UserID":"' + option.ID + '","status":[0,2]}'
				})
				.then(data => {
					let [err, res] = data
					// console.log(1,err,res)
					res.data.data.forEach((item) => {
						let fun = {}
						fun.status = item.status
						uni.request({
								url: 'http://127.0.0.1:3000/user/queryUserById?data=' + item
									.PeopleID
							})
							.then(data => {
								let [err1, res1] = data
								// console.log(2,err1,res1)
								fun.id = res1.data.data[0]._id
								fun.headImg = res1.data.data[0].HeadImg
								fun.name = res1.data.data[0].Name
								fun.sex = res1.data.data[0].Sex
								that.funs.push(fun)
							})
					})
				})

		}
	}
</script>

<style lang="scss">
	.funs {
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

		.selectPeople {
			position: absolute;
			top: 8vh;
			width: 80vw;
			height: fit-content;
			background-color: blue;
			left: 10vw;
			z-index: 9;
			max-height: 50vh;
			overflow: auto;

			.select-item {
				width: inherit;
				height: 7vh;
				padding: 1vh 3vw;
				box-sizing: border-box;
				background-image: linear-gradient(to right, rgba(238, 238, 238, 0.6) 10%, rgba(1, 1, 1, 0.2) 100%);
				border-bottom: 1rpx solid #999992;

				image:nth-of-type(1) {
					width: 5vh;
					height: 5vh;
					display: inline-block;
					size: 100%;
					vertical-align: middle;
				}

				view {
					font-size: $fontSize-sm;
					display: inline-block;
					width: fit-content;
					font-weight: 500;
					margin-left: 3vw;
					vertical-align: middle;
					line-height: 5vh;
				}

				image:nth-of-type(2) {
					width: 2vh;
					height: 2vh;
					display: inline-block;
					size: 100%;
					vertical-align: middle;
					margin-left: 1vw;
				}

				button {
					width: 14vw;
					height: 3vh;
					float: right;
					line-height: 3vh;
					font-size: 25rpx;
					padding: 0 2vw;
					margin-top: 1vh;

				}

			}
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

		.content {
			width: 100vw;
			height: 90vh;
			margin: auto;
			overflow: auto;

			.fun-item {
				width: inherit;
				height: 9vh;
				padding: 1.5vh 10vw;
				box-sizing: border-box;
				background-image: linear-gradient(to right, rgba(238, 238, 238, 0.6) 10%, rgba(1, 1, 1, 0.2) 100%);
				border-bottom: 1rpx solid #999992;

				image:nth-of-type(1) {
					width: 6vh;
					height: 6vh;
					display: inline-block;
					size: 100%;
					vertical-align: middle;
				}

				text {
					font-size: $fontSize-md;
					display: inline-block;
					width: fit-content;
					height: 6vh;
					font-weight: 500;
					margin-left: 3vw;
					vertical-align: middle;
					line-height: 6vh;
				}

				image:nth-of-type(2) {
					width: 3vh;
					height: 3vh;
					display: inline-block;
					size: 100%;
					vertical-align: middle;
				}

				button {
					width: 14vw;
					height: 3vh;
					float: right;
					line-height: 3vh;
					font-size: 25rpx;
					padding: 0 2vw;
				}
			}
		}
	}
</style>
