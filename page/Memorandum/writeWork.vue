<template>
	<view class="writeWork">
		<myNav>
			<image src="../../static/img/memorandum/complete.png" id="img1" @tap="createOk"></image>
		</myNav>
		<view class="main">
			<textarea v-model="textTitle" cols="1" maxlength="12" placeholder="标题" placeholder-style="font-size:42rpx;">
				</textarea>
			
			<textarea v-model="textValue" placeholder="请输入内容" focus="true" confirm-type="done"
				auto-blur="true"></textarea>
			<TagList v-model="tagList" @add="addTag" @delete="delTag" @click="clickTag" :enable-del="enableDel"
				:enable-add="enableAdd"> </TagList>
			<view style="padding: 10rpx 20rpx;">
				<view class="uni-title" style="margin-bottom: 10rpx;">当前为:{{toChinaNowPriority}}</view>
				<slider value="1" activeColor="blue" min="1" max="4" @change="sliderChange" step="1" />
			</view>
			
		</view>
	</view>
	<!-- 	<image src="../../static/img/medals/jiangpaixunzhang.png"> -->
</template>
<script>
	import TagList from "../../components/robby-tags/robby-tags.vue"
	import myNav from "../../components/myNav.vue"
	export default {
		components: {
			myNav,
			TagList
		},
		data() {
			return {
				enableDel: true,
				enableAdd: true,
				textValue: "",
				textTitle: "",
				tagList: ['#标签'],
				nowPriority:1
			}
		},
		computed:{
			toChinaNowPriority(){
				switch(this.nowPriority){
					case 1:
						return '无优先级'
					case 2:
						return '低优先级'
					case 3:
						return '中优先级'
					case 4:
						return '高优先级'
				}
			}
		},
		methods: {
			sliderChange(e) {
				this.nowPriority = e.detail.value
			},
			clickTag: function (e) {
				const [t,...nowTag] = this.tagList
				const obj = {
					UserID: 1||null,
					title: this.textTitle,
					content: this.textValue,
					tag:nowTag,
					priority:this.nowPriority
				}
				console.log(e,obj)
			},
			delTag: function (e) {
				console.log(e)
			},
			addTag: function (e) {
				this.tagList = e.allTags
				console.log(e)
			},
			createOk() {
				let that = this
				let id
				uni.getStorage({
					key: "UserID",
					success: (res) => {
						id = res.data
						console.log(id, this.textTitle, this.textValue)
						const [t,...nowTag] = this.tagList
						const obj = {
							UserID: id,
							title: this.textTitle,
							content: this.textValue,
							tag:nowTag,
							priority:this.nowPriority
						}
						uni.request({
							// url:'http://120.76.138.164:3000/work/addWorks?data='+
							// '{"UserID":"'+id+'","title":"'+this.textTitle+'","content":"'+this.textValue+'"}'
							url: 'http://120.76.138.164:3000/work/addWorks',
							method: 'POST',
							data: obj
						}).then(data1 => {
							let [err1, res1] = data1
							console.log(res1)
							uni.navigateBack({
								delta: 1
							})
						})
					}
				})
			},
		}
	}
</script>
<style lang="scss">
	$imgSize:4vh;

	#img1 {
		position: absolute;
		width: $imgSize;
		height: $imgSize;
		right: 3vw;
		top: 0;
	}

	.writeWork {
		width: 100vw;
		height: 100vh;
		background-color: white;
		box-sizing: border-box;
		overflow: auto;

		.main {
			box-sizing: border-box;
			width: 100vw;
			height: fit-content;
			background-color: white;
			padding: 1vh 3vw;
			margin-top: calc(5vh + var(--status-bar-height));

			& textarea:nth-of-type(1) {
				text-align: center;
				width: 100%;
				height: 3vh;
				font-size: $fontSize-lg;
				font-weight: 600;
				margin-top: 1vh;
			}

			& textarea:nth-of-type(2) {
				padding: 0 20rpx;
				margin-top: 2vh;
				width: 100%;
				font-size: $fontSize-sm;
			}
		}
	}
</style>
