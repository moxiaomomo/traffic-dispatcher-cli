<template>
  <div class="home-container">

    <div
      v-show="showHomePage"
      class="home-container"
    >
      <uni-notice-bar
        v-show="processingOrder"
        single="true"
        :text="noticeText"
        @click="toCheckProcessingOrder"
      ></uni-notice-bar>
      <LBSStat
        style="width:100%;height:100%;"
        :locs="locs"
      />
      <CallCar
        :open="asOpen"
        v-on:show="onCallCarCmpEvt($event)"
      />
      <!-- <cCircle
        v-show="waitForAccept"
        :size="60"
        :percent="60"
      > -->
      </cCircle>

    </div>

    <div
      id="driverCanvas"
      v-show="showDriverHomePage"
      class="driver-container"
    >
      <uni-notice-bar
        v-show="processingOrder"
        single="true"
        :text="noticeText"
        @click="toCheckProcessingOrder"
      ></uni-notice-bar>

      <div style='width:100%;height:80%;padding:40% 0;'>
        <iCircle
          :percent="percent"
          :size="300"
          :stroke-color="color()"
          :finished="orderArrived"
          BgId="BgId1"
          InId="InId1"
          style="margin:auto;"
        >
          <text style="font-size:14px; color: #FFFFFF;">{{ waitText }}</text>
          <view slot="canvas">
            <canvas
              class="CanvasBox strokeCanvas"
              canvas-id="BgId1"
            ></canvas>
            <canvas
              class="CanvasBox trailCanvas"
              canvas-id="InId1"
            ></canvas>
          </view>
        </iCircle>
      </div>

      <!-- <div style="width:100%;height:100%;">
        <p style="width:100%;text-align:center;color:rgb(225,225,225);">等待订单中</p>
      </div> -->
      <ReceiveOrder
        :open="orderArrived"
        :srcPosition="srcPosition"
        :destPosition="destPosition"
      />
    </div>

  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import LBSStat from "@/components/LBSStat/LBSStat.vue";
import CallCar from "@/components/CallCar/CallCar.vue";
import ReceiveOrder from "@/components/ReceiveOrder/ReceiveOrder.vue";
import iCircle from "@/components/CircleProgress/CircleProgress.vue";
import BaiduMap from "vue-baidu-map";

import { Component, Vue, Prop } from "vue-property-decorator";
import { WSService } from "@/service/ws.service";
import { GeoLocation } from "@/components/LBSStat/LBSStat.vue";
import ApiService from "@/api/api.service";

@Component({
  components: {
    LBSStat,
    CallCar,
    ReceiveOrder,
    iCircle,
  },
})
export default class Home extends Vue {
  private locs: GeoLocation[] = [];
  private sidPrefix = "lbsclient_";
  private asOpen: boolean = true;
  private showHomePage = true;
  private showDriverHomePage = false;
  private waitForAccept = false;
  private processingOrder = false;
  private noticeText = "您有一条进行中的行程订单哦，点击查看 >>";
  private waitText = "接单中";

  private percent: number = 100;
  private orderArrived = false;
  private srcPosition: string = "";
  private destPosition: string = "";

  public mounted(): void {
    const canvas = document.getElementById("driverCanvas") as HTMLElement;
    canvas.style.height = `${window.innerHeight - 135}px`;

    const user = uni.getStorageSync("user");
    const role = "" + uni.getStorageSync("userRole");
    WSService.initiate();
    WSService.connect(this.sidPrefix + new Date().getDate(), user.userID, role);
    WSService.msgSubject.subscribe((data: any) => {
      // console.log(data);
      if (data.topic == "geolist") {
        this.processGeoResp(data.data);
      } else if (data.topic == "orderhis") {
        this.processOrderHisResp(data.data);
      } else if (data.topic == "orderreq") {
        console.log(data);
        this.processOrderReq(data.data);
      }
    });

    const roleVal = parseInt(role);
    const qRoleVal = 1 - roleVal;
    setInterval(() => {
      // this.toggleTest = !this.toggleTest;

      WSService.sendMessage(
        JSON.stringify({
          cmd: 3,
          role: roleVal,
          qrole: qRoleVal,
          geo: { lng: 116.404, lat: 39.915 },
          qgeo: { lng: 116.404, lat: 39.915 },
        })
      );
      WSService.sendMessage(JSON.stringify({ lng: 116.404, lat: 39.915 }));
    }, 5000);
  }

  onLoad() {
    const role = uni.getStorageSync("userRole");
    if (role == 1) {
      // uni.navigateTo({ url: "/pages/driver-home/index" });
      // return;
      this.showHomePage = false;
      this.showDriverHomePage = true;
    } else {
      this.showHomePage = true;
      this.showDriverHomePage = false;
      // on callcar
      uni.$on("callcar", (res) => {
        this.onCallCar(res);
      });
    }

    // uni.getLocation({
    //   type: "wgs84",
    //   success: function (res) {
    //     console.log("当前位置的经度：" + res.longitude);
    //     console.log("当前位置的纬度：" + res.latitude);
    //     var point = new (plus.maps as any).Point(res.longitude, res.latitude);
    //     (plus.maps as any).Map.reverseGeocode(
    //       point,
    //       {},
    //       function (event: any) {
    //         var address = event.address; // 转换后的地理位置
    //         console.log(address);
    //       },
    //       function (e: any) {
    //         console.log(e);
    //       }
    //     );
    //   },
    // });
  }

  onUnload() {
    uni.$off("callcar", () => {
      console.log("unsubscribe callcar event");
    });
  }

  async onCallCar(req: any) {
    const user = uni.getStorageSync("user");
    const data = {
      srcGeo: req.srcGeo,
      destGeo: req.destGeo,
      srcAddr: req.srcAddr,
      destAddr: req.destAddr,
      passengerId: user.userID,
    };
    const res: any = await ApiService.post(
      `/passenger/order/createOrder`,
      data
    );
    if (res.data && res.data.code == 10000) {
      uni.showToast({
        title: "已发起呼叫，请等待司机接单",
        duration: 2000,
      });
      this.waitForAccept = true;
      this.processingOrder = true;
    } else if (res.data && res.data.code == 10007) {
      uni.showToast({
        title: "当前还有一条进行中的订单哦",
        duration: 2000,
      });
      this.processingOrder = true;
    } else {
      uni.showToast({
        title: "叫车失败，请稍后重试",
        duration: 2000,
      });
    }
  }

  onCallCarCmpEvt(evt: any) {
    this.asOpen = !this.asOpen;
    // console.log(this.asOpen);
  }

  processGeoResp(msg: any) {
    if (msg == null) {
      return;
    }
    const data = JSON.parse(msg);
    if (!(data instanceof Array)) {
      console.log("Unknown message:" + data);
      return;
    }
    this.locs = [];
    for (const ele of data) {
      const geo = ele.geoinfo.coordinates;
      console.log(geo);
      if (geo instanceof Array && geo.length == 2) {
        this.locs.push({ lng: geo[0], lat: geo[1] });
      }
    }
  }

  processOrderHisResp(data: any) {
    if (data == null) {
      return;
    }
    if (!(data instanceof Array)) {
      console.log("Unknown message:" + data);
      return;
    }
    for (const ele of data) {
      if (ele.status != 3 && ele.status != 4) {
        this.processingOrder = true;
      }
    }
  }

  processOrderReq(data: any) {
    this.orderArrived = true;
    this.noticeText = "有一条新订单到达， 快点击查看";
    this.waitText = "新订单到达";
    if (typeof data == "string") {
      data = JSON.parse(data);
    }
    this.srcPosition = data.srcAddr;
    this.destPosition = data.destAddr;
  }

  toCheckProcessingOrder() {
    uni.switchTab({
      url: "/pages/historwaitTexty/index",
    });
  }

  color() {
    let color = "#2db7f5";
    if (this.percent == 100) {
      color = "#5cb85c";
    }
    return color;
  }
}
</script>

<style scoped>
.home-container {
  padding: 0px 0px 40px 0px;
  height: 100%;
  background: linear-gradient(rgba(68, 115, 184, 0.8), rgb(56, 107, 184));
  position: relative;
}

.driver-container {
  background: linear-gradient(rgba(68, 115, 184, 0.8), rgb(56, 107, 184));
}

.CanvasBox {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
