<template>
  <div class="home-container">

    <div
      v-show="showHomePage"
      class="home-container"
    >
      <LBSStat
        style="width:100%;height:100%;"
        :locs="locs"
      />
      <CallCar
        :open="asOpen"
        v-on:show="onCallCarCmpEvt($event)"
      />
    </div>

    <div
      v-show="showDriverHomePage"
      class="home-container"
    >
      <div style="width:100%;height:100%;">
        <p style="width:100%;text-align:center;color:rgb(225,225,225);">等待订单中</p>
      </div>
      <ReceiveOrder style="width:100%;" />
    </div>

  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import LBSStat from "@/components/LBSStat/LBSStat.vue";
import CallCar from "@/components/CallCar/CallCar.vue";
import ReceiveOrder from "@/components/ReceiveOrder/ReceiveOrder.vue";

import { Component, Vue, Prop } from "vue-property-decorator";
import { WSService } from "@/service/ws.service";
import { GeoLocation } from "@/components/LBSStat/LBSStat.vue";
import ApiService from "@/api/api.service";

@Component({
  components: {
    LBSStat,
    CallCar,
    ReceiveOrder,
  },
})
export default class Home extends Vue {
  private locs: GeoLocation[] = [];
  private sidPrefix = "lbsclient_";
  private asOpen: boolean = true;
  private showHomePage = true;
  private showDriverHomePage = false;

  public mounted(): void {
    const role = "" + uni.getStorageSync("userRole");
    WSService.initiate();
    WSService.connect(this.sidPrefix + new Date().getDate(), role);
    WSService.msgSubject.subscribe((data: any) => {
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
    });
    setInterval(() => {
      WSService.sendMessage(
        JSON.stringify({
          cmd: 3,
          role: 0,
          qrole: 1,
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
    } else if (res.data && res.data.code == 10007) {
      uni.showToast({
        title: "当前还有一条进行中的订单哦",
        duration: 2000,
      });
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
}
</script>

<style scoped>
.home-container {
  padding: 0px 0px 40px 0px;
  height: 100%;
  background: linear-gradient(rgba(68, 115, 184, 0.8), rgb(56, 107, 184));
  position: relative;
}
</style>
