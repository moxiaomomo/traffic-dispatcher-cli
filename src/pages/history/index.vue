<template>
  <div
    id="hisMainContent"
    class="home-container"
  ></div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Component, Vue, Prop } from "vue-property-decorator";
import ApiService from "@/api/api.service";

@Component({
  components: {},
})
export default class HistoryPage extends Vue {
  private sidPrefix = "lbsclient_";
  private asOpen: boolean = true;

  public mounted(): void {
    const content = document.getElementById("hisMainContent") as HTMLElement;
    content.style.height = `${window.innerHeight - 100}px`;

    this.initHistory();
  }

  async initHistory() {
    const user = uni.getStorageSync("user");
    const userRole = uni.getStorageSync("userRole");
    const data = {
      userId: user.userID,
      role: userRole,
    };
    const res: any = await ApiService.post(
      `/passenger/order/queryOrderHis`,
      data
    );
    if (res.data) {
      console.log(res.data);
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
