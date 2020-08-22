<template>
    <view class="content">
        <!-- <view class="avatorWrapper">
            <view class="avator">
                <image class="img" src="../../static/WX20200627-161205.png" mode="widthFix"></image>
            </view>
        </view> -->
		<view class="titleWrapper">
			<view class="title">
					<span>打车 App (Alpha)</span>
					<!-- <image class="img" src="../../static/WX20200627-161205.png" mode="widthFix"></image> -->
			</view>
		</view>
        <view class="form">
            <view class="inputWrapper">
                <input class="input" type="text" value="" placeholder="请输入用户名"/>
            </view>
            <view class="inputWrapper">
                <input class="input" type="password" value="" placeholder="请输入密码"/>
            </view>
			<view class="roleWrapper">
				<radio-group @change="radioChange">
					<label class="radio radiocus"><radio value="r1" checked="true" />司机</label>
					<label class="radio radiocus"><radio value="r2" />乘客</label>
				</radio-group>
			</view>
            <view class="loginBtn">
                <text class="btnValue" @click="onLogin">登录</text>
            </view>
            <!-- <view class="forgotBtn">
                <text>找回密码</text>
            </view> -->
        </view>
    </view>
</template>

<script lang="ts">

import "@/pages/login/index.scss";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class LoginPage extends Vue{
    private title = 'Hello';
    
    onLogin() {
        uni.navigateTo({url: "/pages/home/index"});
	}
	
	radioChange() {

	}
}

</script>