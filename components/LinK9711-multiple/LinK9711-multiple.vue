<template>
	<view style="width: 100%;box-sizing: border-box;">
		<view class="multiple">
			<view class="multiple_input" style="">
				<view class="multiple_input" style="display: inline-block;" @click="issShow=!issShow">{{labelName}}</view>
				<!-- <image @click="issShow=!issShow" style="width: 50rpx;height: 50px;transform: rotate(180deg);opacity: 0.5;" src="./icon.svg" mode=""></image> -->
			</view>
			<view class="multiple_bottom"  @click="issShow = false">
				<view class="multiple_cont" v-if="issShow" >
					<view class="multiple_cont_flex" v-for="(k,i) of list" :key="i" @click="confirm(k,i)" > 
						<view :class="k.isCheckbox?'multiple_cont_acveti':''">{{k['label']}}</view> 
						<!-- <image v-if="k.isCheckbox" class="multiple_cont_acveti" src="./right.svg" style="width: 30rpx;height: 30rpx;" mode=""></image> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * multiple 列 单 多 选择器
	 * @property {Array}        list             数据源         	名称默认渲染label
	 * @property {Boolean}      isMultiple       是否多选        默认true
	 * @property {Boolean}      isShow           是否显示        默认false
	 * @property {String}       labelName        自定义显示文字   默认label
	 * @event {Function(e)}     confirm          点击按钮，      返回当前选择的值
	 **/ 
	export default {
		name:"LinK9711-multiple",
		props:{
			list:{
				type:Array,
				default:[]
			},
			isMultiple:{
				type:Boolean,
				default:true
			},
			isShow:{
				type:Boolean,
				default:false
			},
			// 自定义label属性名
			labelName: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				checkedVal:'',
				issShow:this.isShow,
				issMultiple:this.isMultiple,
				// lists:this.list
			};
		},
		methods:{
			close(){
				console.log(99);
				this.$emit('close')
			},
			confirm(k,i){
				this.$emit('confirm',k,i)
				// let arr=[]
				// this.list.forEach((k,ii)=>{
				// 	if(!this.issMultiple){
				// 		if(i==ii){
				// 			k.isCheckbox=true
				// 		}else{
				// 			k.isCheckbox=false
				// 		}
				// 	}
				// 	if(k.isCheckbox){
				// 		arr.push(k[this.labelName])
				// 	}
				// })
				// this.checkedVal=arr.join(',')
				// console.log(this.list);
			},
			
		},
		watch:{
			// isShow(){
			// 	this.issShow=this.isShow
			// 	console.log(this.isMultiple,789);
			// },
			isMultiple(){
				console.log('多选');
			},
			list(){
				console.log(1);
				console.log(this.list);
			},
			
		},
	}
</script>

<style lang="scss">
	.multiple{
		display: flex;
		// align-items: center;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		box-sizing: border-box;
		position: relative;
	}
	.multiple_input{
		font-size: 28rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 6rpx;
		width: 90vw;
		    padding: 6px;
		    background-color: white;
		    border-radius: 6px;
		    font-family: -webkit-body;
	}
	.multiple_bottom{
		// position: absolute;
		// width: 40%;
		box-sizing: border-box;
	}
	.multiple_cont{
		width: 50%;
		position: absolute;
		background-color: #fff;
		z-index: 999;
		padding: 40rpx;
		top: 80rpx;
		border: 1rpx solid #eee;
		border-radius: 5px 5px 5px 5px;
		box-sizing: border-box;
		overflow-y: auto;
	}
	.multiple_cont_flex{
		padding:3px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.multiple_cont_acveti{
		color: #007AFF;
	}
</style>
