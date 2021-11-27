<template>
	<view class="demo" style="display: flex;flex-direction:row;flex-wrap:wrap; flex-start;">
		<editor id="editor" class="ql-container" @input="getText" showImgToolbar @statuschange="onStatusChange"
			 @ready="onEditorReady" >
		</editor>
		<button @tap="demo"></button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				Mes: '',
				sb:"<p>ma</p><h2>喝喝酒</h2>",
				show: true
			}
		},
		methods: {
			demo(){
				console.log(this.sb)
				this.editorCtx.setContents({
					html:this.sb,
				})
			} ,
			getMes(res) {
				console.log(3, res.content)
				this.sb = res.content;
				this.Mes=this.sb
				this.editorCtx.setContents({
					html:this.sb,
				})
			},
			onEditorReady() {
				let that = this;
				uni.createSelectorQuery().select('#editor').context((res) => {
					that.editorCtx = res.context
				}).exec()
			},
			getText(e) {
			 var that = this;
				console.log(e.detail.html); //带标签内容
				console.log(e.detail.text); //纯文本内容
			},
		},
		mounted() {
			let that = this
			uni.$on('getMes',that.getMes)
		}
	}
</script>
<style lang="scss">
	.demo {
		width: 100vw;
		height: 100vh;
		background-color: #666666;

		#editor {
			width: 100vw;
			height: 60vh;
			background-color: #A5A5A5;
		}
	}
</style>
