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
          <label class="radio radiocus"><radio value="1" />司机</label>
          <label class="radio radiocus"
            ><radio value="0" checked="true" />乘客</label
          >
        </radio-group>
      </view>
      <view class="signupBtn">
        <text class="btnValue" @click="onSignup">注册</text>
      </view>
      <view class="forgotBtn">
        <text @click="toSignin">已有账号，直接登录》》</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import '@/pages/signup/index.scss'
import { Component, Vue, Prop } from 'vue-property-decorator'
import ApiService from '@/api/api.service'

@Component({
  name: 'Signup',
})
export default class SignupPage extends Vue {
  private title = 'Signup'
  private username = ''
  private password = ''
  private role = 0

  public mounted(): void {
    uni.getStorage({
      key: 'user',
      success: (res) => {
        console.log(res)
      },
    })
  }

  async onSignup() {
    if (this.username.length < 3 || this.password.length < 5) {
      uni.showToast({
        title: '用户名或密码无效',
        duration: 2000,
      })
      return
    }
    const data = {
      userName: this.username,
      userPwd: this.password,
      role: this.role,
    }
    const res: any = await ApiService.post(`/passenger/user/signup`, data)
    if (res.data && res.data.code == 1) {
      uni.navigateTo({ url: '/pages/signin/index' })
    } else {
      uni.showToast({
        title: '注册失败，请稍后重试',
        duration: 2000,
      })
    }
  }

  toSignin() {
    uni.navigateTo({ url: '/pages/signin/index' })
  }

  roleChange(evt: any) {
    this.role = parseInt(evt.detail.value)
  }
}
</script>
