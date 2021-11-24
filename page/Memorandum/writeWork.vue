<template>
	<view class="writeWork">
		<myNav>
			<image src="../../static/img/memorandum/complete.png" id="img1" @tap="createOk"></image>
		</myNav>
		<view class="main">
			<textarea v-model="this.textTitle"  cols="1" maxlength="12" placeholder="标题" placeholder-style="font-size:32rpx;">
				</textarea>
			<textarea v-model="this.textValue"  placeholder="请输入内容" focus="true" confirm-type="done"
				auto-blur="true"></textarea>
		</view>
	</view>
</template>

<script>
	import myNav from "../../components/myNav.vue"
	export default {
		components: {
			myNav
		},
		data() {
			return {
				textValue: "",
				textTitle:""
			}
		},
		methods:{
			createOk(){
				uni.$emit('addWork',{value:this.textValue,title:this.textTitle})
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style lang="scss">
	$imgSize:4vh;
	#img1{
		position: absolute;
		width: $imgSize;
		height: $imgSize;
		right: 3vw;
		top: 0;
	}
	.writeWork {
		width: 100vw;
		height: 100vh;
		background-color: #DBF1E1;
		box-sizing: border-box;
		overflow: auto;
		.main {
			width: 100vw;
			height: fit-content;
			background-color: #DBF1E1;
			padding: 1vh 3vw;
			margin-top: calc(5vh + var(--status-bar-height));
			& textarea:nth-of-type(1) {
				width: 100%;
				height: 3vh;
				font-size: $fontSize-lg;
				font-weight: 600;
				margin-top: 1vh;
			}
			& textarea:nth-of-type(2) {
				margin-top: 2vh;
				width: 100%;
				font-size: $fontSize-sm;
			}
		}
	}
</style>
