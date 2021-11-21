<template>
	<view class="memorandum">
		<image src="../../static/img/memorandum/dm7.jpg"></image>

		<view class="main">
			<button class="work" @tap="gotoWork">事务</button>

			<button class="table" @tap="gotoClass">课表</button>

			<button class="plan" @tap="gotoPlan">计划</button>

			<button class="record" @tap="gotoRecord">语录</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{}
		},
		methods:{
			gotoWork(){
				uni.navigateTo({
					url:'./work'
				})
			},
			gotoClass(){
				uni.navigateTo({
					url:'classTable'
				})
			},
			gotoPlan(){
				uni.navigateTo({
					url:'plan'
				})
			},
			gotoRecord(){
				uni.navigateTo({
					url:'record'
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	button {
		width: 60vw;
		height: 13vh;
		background-color: #DD524D;
		border: 1px solid #DD524D;
		border-radius: 5px;
		margin-top: 4vh;
	}

	.memorandum {
		width: 100vw;
		height: 100vh;
		position: relative;

		image {
			width: 150%;
			height: inherit;
		}
		.main{
			opacity: 0.9;
			width: 100%;
			height: fit-content;
			position: absolute;
			top: 15vh;
			left: 0;
			padding: 3vh auto;
		}

	}
</style>
