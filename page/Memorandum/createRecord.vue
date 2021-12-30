<template>
	<view class="container">
		<textarea placeholder="写些小思路~" focus auto-height  @confirm="finish" v-model="content" >
			
		</textarea>
		<image src="../../static/img/more/rili.png" @tap="finish" mode=""></image>
	</view>
</template>

<script>
	import jinEdit from '../../components/jin-edit/jin-edit.vue';
	export default {
		data() {
			return {
				content:"",
				id:''
			}
		},
		methods: {
			// 点击发布
			finish(){
				let data={
					UserID:this.id,
					content:this.content
				}
				console.log(data)
				uni.request({
					url:'http://120.76.138.164:3000/record/addRecord',
					data:data
				})
				.then((data)=>{
					console.log('finish')
					uni.reLaunch({
						url:'record'
					})
				})
			},
		},
		onReady() {
			uni.getStorage({
				key:'UserID',
				success:(res)=>{
					this.id =res.data
				}
			})
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 2vh;
		background-color: aliceblue;
		width: 100vw;
		height: 100vh;
		
	}
	image{
			width: 5vh;
			height: 5vh;
			display: inline-block;
			position: fixed;
			right: 2vh;
			top: 1vh;
			object-fit: cover;
	}
	textarea{
		text-decoration: underline;
		font-style: oblique;
		font-size: 40rpx;
		font-family: emoji;
		width: 80vw;
	}
</style>
