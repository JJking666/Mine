<template>
	<view class="" style="display: flex;flex-direction:row;flex-wrap:wrap; flex-start;">
		<view style="min-width: 48vw;height: 10vh;background-color: #18BC37;"></view>
		<view style="min-width: 48vw;height: 44vh;background-color: #bcb299;"></view>
		<view style="min-width: 48vw;height: 5vh;background-color: #bc6b08;"></view>
		<view style="min-width: 48vw;height: 13vh;background-color: #b9bca2;"></view>
		<view style="min-width: 48vw;height: 24vh;background-color: #18BC37;"></view>
		<view style="min-width: 48vw;height: 10vh;background-color: #9dbc9b;"></view>
		<view style="min-width: 48vw;height: 22vh;background-color: #b7bc4c;"></view>
		<view style="min-width: 48vw;height: 11vh;background-color: #18BC37;"></view>
		<view style="min-width: 48vw;height: 13vh;background-color: #bc974d;"></view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					text: '点赞',
					color: 'blue',
					fontSize: 28
				}, {
					text: '分享'
				}, {
					text: '评论'
				}],
				show: true
			}
		}
	}
</script>