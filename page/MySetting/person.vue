<template>
	<view class="person">
		<view class="content">
			<image id="img" :src="person.headImg" mode="" @tap="openImg"></image>
			<text id="dq">个人信息</text>
			<view id="id">
				<text id="id">ID:{{person.ID}}</text>
			</view>
			<view id="name">
				<text v-show="changeArray[1]==0">{{person.name}}</text>
				<input type="text" placeholder="昵称" v-model="person.name" v-show="changeArray[1]!=0"/>
				<image :src="changeArray[1]!=0?'../../static/uview/example/js.png':'../../static/img/memorandum/complete.png'" mode="" @tap="changeA(1)"></image>
			</view>
			<view>
				<text  v-show="changeArray[2]==0">{{sexArray[sexIndex]}}</text>
				<picker @change="changeSex" :value="sexIndex"  :range="sexArray" v-show="changeArray[2]!=0" style="display: inline-block;">
										<view class="uni-input">{{sexArray[sexIndex]}}</view>
									</picker>
				<image :src="changeArray[2]!=0?'../../static/uview/example/js.png':'../../static/img/memorandum/complete.png'" mode="" @tap="changeA(2)"> </image>
			</view>
			<view >
				<text v-show="changeArray[3]==0">{{person.motto}}</text>
				<input type="text"  placeholder="个性签名" v-model="person.motto" v-show="changeArray[3]!=0"/>
				<image :src="changeArray[3]!=0?'../../static/uview/example/js.png':'../../static/img/memorandum/complete.png'" mode="" @tap="changeA(3)"> </image>
			</view>
			<view >
				<text v-show="changeArray[4]==0">{{person.funMotto}}</text>
				<input type="text" placeholder="被关注签名" v-model="person.funMotto" v-show="changeArray[4]!=0"/>
				<image :src="changeArray[4]!=0?'../../static/uview/example/js.png':'../../static/img/memorandum/complete.png'" mode="" @tap="changeA(4)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				changeArray:[0,0,0,0,0],
				person:{
					headImg:'',
					ID:'',
					name:'',
					sex:'',
					motto:'',
				},
				sexArray:['男','女'],
				sexIndex:0,
			}
		},
		methods:{
			changeSex(e){
				this.sexIndex = e.detail.value
				// console.log('changeSex',e)
			},
			changeA(index){
				let c=this.changeArray[index]==0?1:0
				this.$set(this.changeArray,index,c)
				console.log(this.changeArray[index])
				if(c == 0){
					uni.showToast({
					    title: '修改成功~~',
					    duration: 2000
					});
				}
		
			},
			openImg(){
				uni.showModal({
				    title: '提示',
				    content: '获取头像图片',
				    success: (res)=>{
				        if (res.confirm) {
				            uni.chooseImage({
				            	count: 1, //默认9
				            	sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				            	sourceType: ['album'], //从相册选择
				            	success: (res) => {
				            		this.person.headImg = res.tempFilePaths[0]
									uni.showToast({
									    title: '修改成功~~',
									    duration: 2000
									});
				            		//this.$data.person.headImg.splice(this.$data.nowIndex, 1, res.tempFilePaths[0])
				            	}
				            });
				        } else if (res.cancel) {
				            return
				        }
				    }
				});
			}
		},
		onUnload() {
			uni.getStorage({
				key:'UserID',
				success:(res)=>{
					let data1 = {
						UserID:res.data,
						HeadImg:this.person.headImg,
						Name:this.person.name,
						Sex:this.sexArray[this.sexIndex],
						motto:this.person.motto,
						funMotto:this.person.funMotto
					}
					console.log("getStorage",data1)
					uni.request({
						url:'http://120.76.138.164:3000/user/changeUserInfo',
						data:data1
					})
					.then((data)=>{
						
					})
				}
			})
		},
		onLoad(option) {
			let that =this
			let data={
				_id:option.ID
			}
			console.log('peron',option.ID)
			uni.request({
				url: 'http://120.76.138.164:3000/user/queryUserById',
				data:data
			})
			.then(data=>{
				let [err,res]=data
				console.log(res)
				that.person.headImg=res.data.data.HeadImg
				that.person.ID = option.ID.slice(-6)
				if(res.data.data.Sex === 'man'|| res.data.data.Sex === '男')that.person.sex='男'
				else that.person.sex='女'
				that.person.motto = res.data.data.motto
				that.person.funMotto = res.data.data.funMotto
				that.person.name = res.data.data.Name
				this.sexIndex = that.person.sex === '男' ? 0:1
			})
		}
	}
</script>

<style lang="scss">
	.person{
		width: 100vw;
		height: 100vh;
		padding: 2vh 5vw;
		box-sizing: border-box;
		.content{
			width: 90vw;
			height: 96vh;
			border: 1rpx solid transparent;
			border-radius:20rpx;
			position:relative;
			display:flex;
			flex-direction:column;
			align-items: flex-start;
			&>view{
				height: 4vh;
				width: 90vw;
				padding: 2vh 0;
				border-bottom: 1rpx solid #dedede;
				text{
					line-height: 4vh;
					display: inline-block;
					font-size: $fontSize-sm;
				}
				input{
					line-height: 4vh;
					display: inline-block;
					font-size: $fontSize-sm;
					font-style: oblique;
				}
				image{
					margin-top: 0.5vh;
					float: right;
					line-height: 4vh;
					display: inline-block;
				}
			}
			#account{
				text,input{
					overflow: hidden;
					text-overflow: ellipsis;
					line-height: 4vh;
					height: 4vh;
					display: inline-block;
					width: 60vw;
					white-space: nowrap;
					font-size: $fontSize-sm;
				}
			}
			image{
				width: 3vh;
				height: 3vh;
				size: 100%;
			}
			#img{
				display: block;
				width: 10vh;
				height: 10vh;
				position: absolute;
				left: calc(45vw - 5vh);
				top: 5vh;
			}
			#dq{
				display: block;
				margin-top: 20vh;
				font-size: $fontSize-lg;
				font-weight: 500;
				color: #8F939C;
			}
		}
	}
	input{
		font-weight: 800 !important;
		font-size: 32rpx !important;
		color: black;
	}
</style>
