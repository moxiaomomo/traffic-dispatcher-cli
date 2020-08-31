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
      </view>
    </view>
    <view class="form">
      <view class="inputWrapper">
        <input
          class="input"
          type="text"
          v-model="username"
          placeholder="输入用户名(至少3个字符)"
        />
      </view>
      <view class="inputWrapper">
        <input
          class="input"
          type="password"
          v-model="password"
          placeholder="输入密码(至少5个字符)"
        />
      </view>
      <view class="roleWrapper">
        <radio-group @change="roleChange">
          <label class="radio radiocus">
            <radio value="1" />司机</label>
          <label class="radio radiocus">
            <radio
              value="0"
              checked="true"
            />乘客</label>
        </radio-group>
      </view>
      <view class="signinBtn">
        <text
          class="btnValue"
          @click="onSignin"
        >登录</text>
      </view>
      <view class="forgotBtn">
        <text @click="toSignup">注册新用户》》</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import "@/pages/signin/index.scss";
import { Component, Vue, Prop } from "vue-property-decorator";
import ApiService from "@/api/api.service";

@Component
export default class SigninPage extends Vue {
  private title = "Signin";
  private username = "";
  private password = "";
  private role = 0;

  public mounted(): void {
    uni.getStorage({
      key: "user",
      success: (res) => {
        // 判断token是否有效
        if (res.data && res.data.token && res.data.token.length == 40) {
          uni.switchTab({ url: "/pages/home/index" });
        }
      },
    });
  }

  toSignup() {
    uni.navigateTo({ url: "/pages/signup/index" });
  }

  async onSignin() {
    if (this.username.length < 3 || this.password.length < 5) {
      uni.showToast({
        title: "用户名或密码无效",
        duration: 2000,
      });
      return;
    }
    const data = {
      userName: this.username,
      userPwd: this.password,
      role: this.role,
    };
    const res: any = await ApiService.post(`/passenger/user/signin`, data);
    if (res.data && res.data.code == 1) {
      // 保存登录信息
      try {
        uni.setStorageSync("userRole", this.role);
        uni.setStorageSync("user", res.data.user);
        uni.switchTab({ url: "/pages/home/index" });
      } catch (e) {
        // error
        uni.showToast({
          title: "无法存储登录信息",
          duration: 2000,
        });
      }
    } else {
      uni.showToast({
        title: "用户名或密码不正确",
        duration: 2000,
      });
    }
  }

  roleChange(evt: any) {
    this.role = parseInt(evt.detail.value);
  }
}
</script>
