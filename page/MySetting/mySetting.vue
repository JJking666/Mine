<template>
	<view class="mysetting">
		<view class="setting-nav">
			<image src="../../static/img/memorandum/dm7.jpg" mode=""></image>
			<image src="../../static/img/memorandum/bk2.jpg" mode=""></image>
			<text>name</text>
			<view class="qianm">
				<text>&nbsp;你好好你好好你好好你好好你好好你好好你好好你好好你好好你好好你好好你好好你好好你好</text>
			</view>
			<view class="nav-something">
				<text>20000</text>
				<text>200</text>
				<text>200</text>
			</view>
		</view>
		<view class="setting-main1"></view>
		<view class="setting-main2"></view>
		<view class="setting-footer"></view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.mysetting {
		height: 100vh;
		width: 100vw;
		background-color: #606266;

		.setting-nav {
			width: 100vw;
			height: 45vh;
			padding: 2vh 5vw;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			position: relative;
			color: white;
			&>image:nth-of-type(1) {
				position: absolute;
				height: inherit;
				left: 0;
				top: 0;
				width: 100vw;
				size: 100%;
				object-fit: cover;
				z-index: 1;
			}

			&>image:nth-of-type(2) {
				height: 18vh;
				width: 18vh;
				border-radius: 100%;
				size: 100%;
				object-fit: cover;
				z-index: 10;
				margin-top: 8vh;
			}
			.qianm{
				width: fit-content;
				max-width: 75vw;
				height: 6vh;
				z-index: 10;
				margin-top: 2vh;
				image{
					height: 4vh;
					width: 2vh;
					size: 100%;
					object-fit: cover;
					z-index: 10;
					display: inline-block;
				}
				text{
					font-size: $fontSize-sm;
					display: -webkit-box;
					overflow: hidden;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					z-index: 10;
				}
			}

			&>text:nth-of-type(1) {
				font-size: $fontSize-lg;
				font-weight: 600;
				z-index: 10;
				margin-top: 2vh;
				display: block;
				width: 18vh;
				text-align: center;
			}

			

			.nav-something {
				z-index: 10;
				display: flex;
				flex-direction: row;
				margin-top: 1.5vh;
				color: white;
				&>text:nth-of-type(1) {
					font-size: $fontSize-md;
					font-weight: 500;

					&::after {
						content: '获赞';
						margin-left: 2vw;
					}
				}

				&>text:nth-of-type(2) {
					margin-left: 7vw;
					font-size: $fontSize-md;
					font-weight: 500;

					&::after {
						content: '关注';
						margin-left: 2vw;
					}
				}

				& text:nth-of-type(3) {
					margin-left: 7vw;
					font-size: $fontSize-md;
					font-weight: 500;

					&::after {
						content: '粉丝';
						margin-left: 2vw;
					}
				}
			}

		}
	}
</style>
