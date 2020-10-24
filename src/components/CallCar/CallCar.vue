<template>
  <transition>
    <div
      class='actionsheet_wrapper'
      :style="{maxHeight: (open?contentHeight:minHeight) + 'px'}"
    >
      <div class="actionsheet">
        <div class="_header">
          <span class="cart">叫车</span>
          <span
            class="clear"
            @click="onCancel"
          >{{open?"收起":"展开"}}</span>
        </div>
        <div class="_content">
          <input
            v-model="srcPosition"
            class="item input"
            placeholder="输入起始地点"
            @focus="onSrcFocus"
          ></input>
          <input
            v-model="destPosition"
            class="item input"
            placeholder="输入目标地点"
            @focus="onDestFocus"
          ></input>
          <button
            class="item callBtn"
            @click="onCallCar"
          >确认叫车</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
// issue-sass: https://www.jianshu.com/p/c4610144c2f7
import "@/components/CallCar/CallCar.scss";

@Component
export default class CallCar extends Vue {
  @Prop() open!: boolean;
  private minHeight: number = 45;
  private toggleText = "收起";
  private contentHeight: number = 200;
  private srcPosition: string = "";
  private destPosition: string = "";
  private srcGeo: any = null;
  private destGeo: any = null;
  private focusEle = "";

  public mounted(): void {
    console.log("CallCar mounted");
    uni.$on("getloc", (res) => {
      if (this.focusEle == "src") {
        this.srcPosition = res.addr;
        this.srcGeo = res.geo;
      } else if (this.focusEle == "dest") {
        this.destPosition = res.addr;
        this.destGeo = res.geo;
      }
    });
  }

  @Watch("open")
  public onOpenChanged() {
    console.log("onOpenChanged");
  }

  onCancel() {
    this.$emit("show");
  }

  onCallCar() {
    if (
      this.srcPosition.trim().length <= 0 ||
      this.destPosition.trim().length <= 0
    ) {
      uni.showToast({
        title: "起止位置不能为空",
        duration: 2000,
      });
      return;
    }

    const req = {
      srcGeo: `[${this.srcGeo.lng},${this.srcGeo.lat}]`,
      destGeo: `[${this.destGeo.lng},${this.destGeo.lat}]`,
      srcAddr: this.srcPosition,
      destAddr: this.destPosition,
    };
    uni.$emit("callcar", req);
  }

  onSrcFocus() {
    this.focusEle = "src";
  }

  onDestFocus() {
    this.focusEle = "dest";
  }
}
</script>