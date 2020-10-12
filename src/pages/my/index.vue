<template>
  <div
    id="myMainContent"
    class="home-container"
  >
    <uni-card
      :title="userName"
      mode="style"
      :is-shadow="true"
      thumbnail="http://ttcli.ibitcoding.com/image/my1.jpg"
      extra="上次登录 Guangzhou 2020-10-10 12:32:19"
    >
      出行里数: 3000公里<br>会员积分: 320
    </uni-card>
    <button
      class="mini-btn logout"
      type="warn"
      @click="onLogout"
    >
      注销登录
    </button>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class MyPage extends Vue {
  private sidPrefix = "lbsclient_";
  private asOpen: boolean = true;
  private userName: string = "";

  public mounted(): void {
    const content = document.getElementById("myMainContent") as HTMLElement;
    content.style.height = `${window.innerHeight - 100}px`;

    const user = uni.getStorageSync("user");
    this.userName = user.userName;
  }

  onLogout(evt: any) {
    try {
      // 删除user缓存
      uni.removeStorageSync("user");
      // 跳转到登录页
      uni.reLaunch({ url: "/pages/signin/index" });
    } catch (e) {
      // error
      uni.showToast({
        title: "注销异常:" + e,
        icon: "none",
      });
    }
  }
}
</script>

<style scoped>
.home-container {
  padding: 0px;
  height: 100%;
  background-color: rgb(240, 242, 245, 0.8);
  position: relative;
}

.logout {
  margin: 15px 10%;
  position: absolute;
  bottom: 30px;
  width: 80%;
}
</style>
