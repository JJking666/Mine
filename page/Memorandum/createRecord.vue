<template>
	<view class="container">
		<!-- <robin-editor class="editor" @cancel="hideEditor" @save="saveEditor" v-model="html" :imageUploader="uploadImg"
			:muiltImage="true">
		</robin-editor> -->
		<jinEdit placeholder="请输入内容" @editOk="editOk" uploadFileUrl="/#"></jinEdit> 
	</view>
</template>

<script>
	import jinEdit from '../../components/jin-edit/jin-edit.vue';
	export default {
		data() {
			return {
				content:""
			}
		},
		components: {
			jinEdit
		},
		methods: {
			// 点击发布
			editOk(res) {
				 this.content = res;
				 console.log(res)
				 uni.$emit('contentemit',res)
			}
		}
	}
</script>

<style>
	.container {
		padding: 10px;
	}

	#editor {
		width: 100%;
		height: 300px;
		background-color: #CCCCCC;
	}

	button {
		margin-top: 10px;
	}
</style>
