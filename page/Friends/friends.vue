<template>
	<view class="friends">
		<image id="record-bk" src="../../static/more/微信图片_20211126111415.jpg" mode=""></image>
		<input id="record-input" placeholder="输入手机号或昵称" placeholder-style="" v-model="inputValue"
			@input="select" />
		<view class="selectPeople">
			<view class="select-item" v-for="(item,index) in selectPeople" :key="index" >
				<image :src="item.HeadImg">
				<view v-html="item.Name" style="display: inline-block;"></view>
				<image
					:src="item.sex=='man'?'../../static/more/faxian-36.png':'../../static/more/微信图片_20211126111415.jpg'"
					mode=""></image>
				<button @tap="addFriend(item._id)">关注</button>
			</view>
		</view>
		<view class="content">
			<view class="friend-item" v-for="(item,index) in friends" :key="index">
				<image :src="item.headImg">
					<text>{{item.name}}</text>
					<image
						:src="item.sex=='man'?'../../static/more/faxian-36.png':'../../static/more/微信图片_20211126111415.jpg'"
						mode=""></image>
					<button @tap="cancelFriend(item.id,item.status)">已关注</button>
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
				ID: '',
				friends: [],
				deleteFriendID1: [],
				deleteFriendID2: [],
				selectPeople: []
			}
		},
		methods: {
			select() {
				let that = this
			
				if (this.inputValue.length < 1) {
					this.selectPeople=[]
					return
				}
	
				if (this.inputing) {
					clearInterval(this.inputing)
				}
				this.inputing = setTimeout(() => {
			
					let r = {
						data: that.inputValue
					}
					let d = this.$qs.parse(r)
					uni.request({
							url: 'http://127.0.0.1:3000/user/queryUser1',
							data: d
						})
						.then(data => {
							let [err, res] = data
			
							that.selectPeople = data[1].data.data
							that.selectPeople.forEach((item)=>{
								item.Name=item.Name.replace(that.inputValue,
							`<span style="color: grey">${this.inputValue}</span>`)
							})
						})
				}, 500)
			},
			addFriend(id){
				let that =this
				let data = {
					UserID:this.ID,
					PeopleID:id
				}
				data=this.$qs.parse(data)
				uni.request({
					url:'http://127.0.0.1:3000/relationship/addRelationship',
					data:data
				})
				.then((data)=>{
					let [err,res]=data
					console.log(res,res.data.data.PeopleID)
					if(res.data.data.status==1){
						uni.request({
							url:'http://127.0.0.1:3000/user/queryUserById?data='+res.data.data.PeopleID
						})
						.then(data=>{
							let [err,res1]=data
							console.log('f',res1)
							let friend={}
							friend.status=1
							friend.id = res1.data.data[0]._id
							friend.headImg = res1.data.data[0].HeadImg
							friend.name = res1.data.data[0].Name
							friend.sex = res1.data.data[0].Sex
							console.log(friend)
							that.friends.push(friend)
						})
					}
					if(res.data.data.status==2){
						that.friends.forEach((item)=>{
							if(item.id==res.data.data.PeopleID){
								that.$set(item,'status',2);
							}
						})
					}
				})
			},
			cancelFriend(id, status) {
				console.log(id, status)
				this.friends.forEach((item, index) => {
					if (item.id == id) {
						this.friends.splice(index, 1)
						return
					}
				})
				let r = {
					UserID: this.ID,
					PeopleID: id,
					status: status
				}
				if (r.status == 1) {
					this.deleteFriendID1.push(r)
				} else {
					this.deleteFriendID2.push(r)
				}
			}
		},
		onUnload() {
			let that = this
			let r = {
				UserID: this.ID,
				deleteFriendID1: this.deleteFriendID1,
				deleteFriendID2: this.deleteFriendID2
			}
			console.log(r)
			let data1 = this.$qs.parse(r)
			uni.request({
					url: 'http://127.0.0.1:3000/relationship/deleteRelationship',
					data: data1
				})
				.then((data) => {
					console.log('ok1')
				})
		},
		onLoad(option) {
			let that = this
			uni.request({
					url: 'http://127.0.0.1:3000/relationship/queryRelationship?data=' +
						'{"UserID":"' + option.ID + '","status":[1,2]}'
				})
				.then(data => {
					let [err, res] = data
					this.ID = option.ID
					// console.log(1,err,res)
					res.data.data.forEach((item) => {
						let friend = {}
						friend.status = item.status
						uni.request({
								url: 'http://127.0.0.1:3000/user/queryUserById?data=' + item.PeopleID
							})
							.then(data => {
								let [err1, res1] = data
								// console.log(2,err1,res1)
								friend.id = res1.data.data[0]._id
								friend.headImg = res1.data.data[0].HeadImg
								friend.name = res1.data.data[0].Name
								friend.sex = res1.data.data[0].Sex
								that.friends.push(friend)
							})
					})
				})
		},
	}
</script>

<style lang="scss">
	.friends {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		overflow: auto;
		
		#record-input {
			margin: 2vh auto;
			width: 70vw;
			height: 6vh;
			border-radius: 30rpx;
			font-size: $fontSize-lg;
			background-color: #f6fff9;
			line-height: 6vh;
			padding: 0 5vw;
			margin-bottom: 0;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
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
			margin-top: 2vh;
			.friend-item {
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

				text{
					font-size: $fontSize-md;
					display: inline-block !important;
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
					margin-left: 1vw;
					vertical-align: middle;
				}

				button {
					width: 14vw;
					height: 3vh;
					float: right;
					line-height: 3vh;
					font-size: 25rpx;
					padding: 0 2vw;
					margin-top: 1.5vh;
				}
			}
		}
	}
</style>
