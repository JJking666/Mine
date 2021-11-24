<template>
	<view class="person">
		<view class="content">
			<image id="img" src="../../static/img/icon.jpg" mode=""></image>
			<text id="dq">个人信息</text>
			<view id="id">
				<text id="id">ID:453453</text>
				<image src="../../static/uview/example/js.png" mode=""></image>
			</view>
			<view id="name">
				<text >大帅哥</text>
				<image src="../../static/uview/example/js.png" mode=""></image>
			</view>
			<view id="phone">
				<text>13676103055</text>
				<image src="../../static/uview/example/js.png" mode=""></image>
			</view>
			<view id="email">
				<text id="id">1337802617@qq.com</text>
				<image src="../../static/uview/example/js.png" mode=""></image>
			</view>
			<view id="password">
				<text id="id">密码管理</text>
				<image src="../../static/uview/example/js.png" mode=""></image>
			</view>
			<view id="account">
				<text id="id">注销账号</text>
				<image src="../../static/uview/example/js.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
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
