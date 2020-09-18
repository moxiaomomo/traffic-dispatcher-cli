<template>
  <div class="home-container">
    <LBSStat
      style="width:100%;height:100%;"
      :locs="locs"
    />
    <CallCar
      :open="asOpen"
      v-on:show="onCallCarEvt($event)"
    />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import LBSStat from "@/components/LBSStat/LBSStat.vue";
import CallCar from "@/components/CallCar/CallCar.vue";

import { Component, Vue, Prop } from "vue-property-decorator";
import { WSService } from "@/service/ws.service";
import { GeoLocation } from "@/components/LBSStat/LBSStat.vue";

@Component({
  components: {
    LBSStat,
    CallCar,
  },
})
export default class Home extends Vue {
  private locs: GeoLocation[] = [];
  private sidPrefix = "lbsclient_";
  private asOpen: boolean = true;

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

  onCallCarEvt(evt: any) {
    this.asOpen = !this.asOpen;
    console.log(this.asOpen);
  }
}
</script>

<style scoped>
.home-container {
  padding: 0px 0px 40px 0px;
  height: 100%;
  background-color: rgb(240, 242, 245, 0.8);
  position: relative;
}
</style>
