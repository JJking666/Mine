<template>
	<view class="friends">
		<image id="record-bk" src="../../static/more/微信图片_20211126111415.jpg" mode=""></image>
		<input id="record-input" placeholder="搜索记录" placeholder-style="" v-model="inputValue" @input="select" />
		<view class="content">
			<view class="friend-item" v-for="(item,index) in friendsData" :key="item.id">
				<image :src="item.head">
				<text>{{item.name}}</text>
				<image src="../../static/more/faxian-36.png" mode=""></image>
				<button>已关注</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				friendsData:[{
					id:1,
					name:'大白菜',
					sex:'man',
					head:"../../static/img/icon.jpg"
				},{
					id:2,
					name:'白大菜',
					sex:'man',
					head:"../../static/img/memorandum/dm1.jpg"
				},{
					id:3,
					name:'帅哥马崇濠',
					sex:'man',
					head:"../../static/img/memorandum/dm2.jpg"
				},{
					id:4,
					name:'马小帅',
					sex:'man',
					head:"../../static/img/memorandum/dm3.jpg"
				},{
					id:5,
					name:'杀无赦',
					sex:'man',
					head:"../../static/img/memorandum/bk1.jpg"
				},{
					id:6,
					name:'王二狗',
					sex:'man',
					head:"../../static/img/memorandum/dm5.jpg"
				},{
					id:7,
					name:'吃屎啦你',
					sex:'man',
					head:"../../static/img/memorandum/dm6.jpg"
				},{
					id:8,
					name:'干你乃',
					sex:'man',
					head:"../../static/img/memorandum/dm7.jpg"
				},{
					id:9,
					name:'曹操',
					sex:'man',
					head:"../../static/img/memorandum/dm8.jpg"
				},{
					id:10,
					name:'嗯嗯菜',
					sex:'man',
					head:"../../static/img/memorandum/dm1.jpg"
				}]
			}
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
		.content{
			width: 100vw;
			height: 90vh;
			margin: auto;
			overflow: auto;
			.friend-item{
				width: inherit;
				height: 9vh;
				padding: 1.5vh 10vw;
				box-sizing: border-box;
				background-image: linear-gradient(to right,rgba(238, 238, 238,0.6) 10%,rgba(1,1,1,0.2) 100%);
				border-bottom: 1rpx solid #999992;
				image:nth-of-type(1){
					width: 6vh;
					height: 6vh;
					display: inline-block;
					size: 100%;
					vertical-align: middle;
				}
				text{
					font-size: $fontSize-md;
					display: inline-block;
					width: fit-content;
					height: 6vh;
					font-weight: 500;
					margin-left: 3vw;
					vertical-align: middle;
					line-height: 6vh;
				}
				image:nth-of-type(2){
					width: 3vh;
					height: 3vh;
					display: inline-block;
					size: 100%;
					vertical-align: middle;
				}
				button{
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
