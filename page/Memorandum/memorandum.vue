<template>
	<view class="memorandum">
		<image src="../../static/img/more/shine.jpg"></image>

		<view class="main">
			<button class="record" @tap="gotoHandAccount">制作手账</button>
			<button class="work" @tap="gotoWork">事务与随笔</button>
			<button class="plan" @tap="gotoPlan">计划Go</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{}
		},
		onShow() {
			wx.showTabBar()
		},
		methods:{
			gotoHandAccount(){
				uni.navigateTo({
					url:'../Creation/creation'
				})
			},
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
		height: 10vh;
		background-color: #b8eaf1;
		border: 1px solid transparent;
		border-radius: 5px;
		margin-top: 4vh;
		line-height: 10vh;
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
			height: 60vh;
			position: absolute;
			top: 18vh;
			left: 0;
			padding: 3vh auto;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
		}

	}
</style>
