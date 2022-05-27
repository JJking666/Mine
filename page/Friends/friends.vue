<template>
	<view class="friends linear_back">
		<!-- <image id="record-bk" src="../../static/img/bkImg/bk6.jpg" mode=""></image> -->
		<input id="record-input" placeholder="输入手机号或昵称" placeholder-style="" v-model="inputValue"
			@input="select" />
		<view class="selectPeople">
			<view class="select-item" v-for="(item,index) in selectPeople" :key="index" @tap="gotoLookSomeone(item._id)">
				<image :src="item.HeadImg">
				<view v-html="item.Name" style="display: inline-block;"></view>
				<image :src="item.sex!='man'?'../../static/img/common/nan.png':'../../static/img/common/nv.png'"
					mode=""></image>
			</view>
		</view>
		<view class="content">
			<view class="friend-item" v-for="(item,index) in friends" :key="index" @tap="gotoLookFriend(item.id,item.status)"> 
				<image :src="item.headImg">
					<text>{{item.name}}</text>
					<image
						:src="item.sex!='man'?'../../static/img/common/nan.png':'../../static/img/common/nv.png'"
						mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import qs from 'qs' 
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
			gotoLookFriend(id,status){
				uni.navigateTo({
					url:'./lookFriend?id='+id+'&status='+status,
				})
			},
			gotoLookSomeone(id,status){
				uni.navigateTo({
					url:'./lookSomeone?id='+id,
				})
			},
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
							url: 'http://120.76.138.164:3000/user/queryUser1',
							data: d
						})
						.then(data => {
							let [err, res] = data
			
							that.selectPeople = data[1].data.data
							that.selectPeople.forEach((item)=>{
								item.Name=item.Name.replace(that.inputValue,
							`<span style="color: red">${this.inputValue}</span>`)
							})
						})
				}, 500)
			},
			addFriend(id){
				let that =this
				let data1 = {
					UserID:this.ID,
					PeopleID:id
				}
				uni.request({
					url:'http://120.76.138.164:3000/relationship/addRelationship',
					data:data1
				})
				.then((data)=>{
					let [err,res]=data
					console.log(res,res.data.data.PeopleID)
					if(res.data.data.status==1){
						let data3={
							_id:res.data.data.PeopleID
						}
						uni.request({
							url:'http://120.76.138.164:3000/user/queryUserById',
							data:data3
						})
						.then(data=>{
							let [err,res1]=data
							let friend={}
							console.log(3,res1)
							friend.status=1
							friend.id = res1.data.data._id
							friend.headImg = res1.data.data.HeadImg
							friend.name = res1.data.data.Name
							friend.sex = res1.data.data.Sex
							console.log(friend)
							that.friends.push(friend)
							this.$forceUpdate()
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
			getInfo(option){
				let that = this
				if(option ==null){
					option.ID = this.ID
				}
				uni.request({
						url: 'http://120.76.138.164:3000/relationship/queryRelationship?data=' +
							'{"UserID":"' + option.ID + '","status":[1,2]}'
					})
					.then(data => {
						let [err, res] = data
						that.ID = option.ID
						console.log(1,err,res)
						// console.log(res.data.data)
						res.data.data.forEach((item) => {
							let friend = {}
							friend.status = item.status
							let data3={
								_id:item.PeopleID
							}
							console.log(data3)
							uni.request({
									url: 'http://120.76.138.164:3000/user/queryUserById',
									data:data3
								})
								.then(data => {
									let [err1, res1] = data
									if(!res1.data.data){
										return
									}else{
										friend.id = res1.data.data._id
										friend.headImg = res1.data.data.HeadImg
										friend.name = res1.data.data.Name
										friend.sex = res1.data.data.Sex
										that.friends.push(friend)
									}
									
								})
						})
					})
			}
		},
		onLoad(option) {
			console.log(1)
			this.getInfo(option)
		},
		onShow() {
			console.log(2)
			if(this.ID == ''){
				return 
			}
			let option = {}
			this.getInfo(option)
		}
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
			max-height: 49vh;
			overflow: auto;
			.select-item {
				width: inherit;
				height: 7vh;
				padding: 1vh 3vw;
				box-sizing: border-box;
				background-image: linear-gradient(to right, #ffffff 50%, #fbfbfb 100%);
				    border-bottom: 1rpx solid #e7ebf0;
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
				background-image: linear-gradient(to right, rgb(132,180,253) 50%, rgb(110,148,255) 100%);
				    border-bottom: 1rpx solid #c6daf5;

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
					margin-left: 3vw;
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
