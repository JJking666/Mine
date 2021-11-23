<template>
	<view class="" style="display: flex;flex-direction:row;flex-wrap:wrap; flex-start;">
		<robin-editor></robin-editor>
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