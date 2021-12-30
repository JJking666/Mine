<template>
	<view class="account">
		<view class="content">
			<text>账号管理</text>
			<view class="content-item" v-for="(item,index) in itemData" :key="index">
				<text>{{item.content}}</text>
				<image :src="item.src" v-if="item.src" @tap="DoSomething(index)"></image>
				<p>{{item.right}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				itemData:[{
					content:'ID',
					src:'',
					right:'asdsad1'
				},{
					content:'手机号',
					src:'',
					right:'13676103055'
				},{
					content:'邮箱',
					src:'',
					right:'qq1337802617'
				},{
					content:'密码',
					src:'../../static/uview/example/js.png',
				},{
					content:'注销账号',
					src:'../../static/img/more/tuichu.png'
				}]
			}
		},
		methods:{
			DoSomething(index){
				if(index == 3){
					this.changePassword()
				}else{
					this.goBackLogin()
				}
			},
			goBackLogin(){
				uni.removeStorage({
					key:'UserAccount',
					success: ()=> {
						console.log('gb1')
					    uni.redirectTo({
					        url: '../Login/login'
					    });
					},
					fail() {
						uni.redirectTo({
						    url: '../Login/login'
						});
					}
				})
			}
		},
		onLoad(option) {
			let that =this
			let data={
				_id:option.ID
			}
			uni.request({
				url:'http://120.76.138.164:3000/user/queryUserById',
				data:data
			})
			.then(data=>{
				let [err,res]=data
				that.itemData[0].right = option.ID.slice(-6)
				that.itemData[1].right =res.data.data.Phone
				that.itemData[2].right = res.data.data.Email
			})
		}
	}
</script>

<style lang="scss">
	.account{
		width: 100vw;
		height: 100vh;
		padding: 2vh 5vw;
		box-sizing: border-box;
		.content{
			width: 90vw;
			height: 96vh;
			background-color: #BEF5C8;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			&>view:nth-of-type(1){
				margin-top: 3vh;
			}
			&>text{
				display: block;
				margin-top: 1vh;
				margin-left: 5vw;
				font-size: $fontSize-lg;
				font-weight: 600;
			}
			.content-item{
				height: 6vh;
				width: 90vw;
				    padding: 1vh 5vw;
				    box-sizing: border-box;
				border-bottom: 1rpx solid #dedede;
				text{
					line-height: 4vh;
					display: inline-block;
					font-size: $fontSize-sm;
				}
				image{
					width: 4vh;
					height: 4vh;
					size: 100%;
					float: right;
					line-height: 4vh;
					display: inline-block;
				}
				p{
					font-size: $fontSize-sm;
					color: #B9B9B9;
					height: 4vh;
					float: right;
					line-height: 4vh;
					display: inline-block;
				}
			}
		}
	}
</style>
