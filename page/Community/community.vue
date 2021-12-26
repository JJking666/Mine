<template>
	<view class="container">
		<button type="primary" @tap="testDB()">testDB</button>
		<button type="primary" @tap="emailSignUp()">email</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
			}
		},
		methods: {
			testDB() {
				uni.request({
					url: 'http://120.76.138.164:3000/test',
					data: {},
					method: 'GET',
					success: (data) => {
						console.log(data)
					},
					error: (err) => {
						err
					}
				})
			},
			emailSignUp() {
				uni.request({
					url: 'http://120.76.138.164:3000/email',
					data: {
						email: '246812487@qq.com',
					},
					method: 'POST',
					success: (data) => {
						console.log(data)
					},
					error: (err) => {
						err
					}
				})
			}
		},
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
