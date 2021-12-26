<template>
	<view class="person">
		<view class="content">
			<image id="img" :src="person.headImg" mode=""></image>
			<text id="dq">个人信息</text>
			<view id="id">
				<text id="id">ID:{{person.ID}}</text>
				<image src="../../static/uview/example/js.png" mode=""></image>
			</view>
			<view id="name">
				<text >{{person.name}}</text>
				<image src="../../static/uview/example/js.png" mode=""></image>
			</view>
			<view id="password">
				<text>{{person.sex}}</text>
				<image src="../../static/uview/example/js.png" mode=""></image>
			</view>
			<view id="account">
				<text>{{person.motto}}</text>
				<image src="../../static/uview/example/js.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				person:{
					headImg:'',
					ID:'',
					name:'',
					sex:'',
					motto:''
				}
			}
		},
		onLoad(option) {
			let that =this
			uni.request({
				url:'http://120.76.138.164:3000/user/queryUserById?data='+option.ID
			})
			.then(data=>{
				let [err,res]=data
				console.log(res)
				that.person.headImg=res.data.data[0].HeadImg
				that.person.ID = option.ID.slice(-6)
				if(res.data.data[0].Sex == 'man')that.person.sex='男'
				else that.person.sex='女'
				that.person.motto = res.data.data[0].motto
				that.person.name = res.data.data[0].Name
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
				image{
					margin-top: 0.5vh;
					float: right;
					line-height: 4vh;
					display: inline-block;
				}
			}
			#account{
				text{
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
</style>
