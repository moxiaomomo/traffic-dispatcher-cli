<template>
  <div
    id="hisMainContent"
    class="home-container"
  >
    <view class="uni-list">
      <view
        class="uni-list-cell"
        hover-class="uni-list-cell-hover"
        v-for="(item,index) in hisList"
        :key="index"
      >
        <uni-card
          :title="index + item.status"
          note="true"
        >
          开始日期：{{item.createAt}}
          <template v-slot:footer>
            <view class="footer-box">
              <view>上车位置：{{item.srcGeo}}</view>
              <view>终点位置：{{item.destGeo}}</view>
            </view>
          </template>
        </uni-card>
      </view>
    </view>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

declare const BMap: any;

import { Component, Vue, Prop } from "vue-property-decorator";
import ApiService from "@/api/api.service";

@Component({
  components: {},
})
export default class HistoryPage extends Vue {
  private sidPrefix = "lbsclient_";
  private asOpen: boolean = true;
  private hisList: any[] = [];
  private statusStr = new Map([
    ["0", "等待接单中"],
    ["1", "司机已接单，等待上车"],
    ["2", "行程进行中"],
    ["3", "订单已取消"],
    ["4", "订单已结束"],
  ]);

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
      // console.log(res.data.orders);
      this.hisList = res.data.orders;
      if (this.hisList != null) {
        for (const ele of this.hisList) {
          if (ele.status == null) {
            ele.status = "0";
          } else {
            ele.status = "" + ele.status;
          }
          ele.status = this.statusStr.get(ele.status);
        }
      }
    }

    // var convertor = new BMap.Convertor();
    // var point = new BMap.Point(106.554241, 29.556531);
    // var geoc = new BMap.Geocoder();
    // geoc.getLocation(point, (rs: any) => {
    //   console.log(res);
    // });
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
