<template>
  <transition>
    <div
      class='actionsheet_wrapper'
      :style="{maxHeight: (open?contentHeight:minHeight) + 'px'}"
    >
      <div class="actionsheet">
        <div class="_header">
          <span class="cart">您有新的待接订单哦</span>
        </div>
        <div class="_content">
          <br>
          <p>起点：{{ srcPosition }}</p>
          <br><br>
          <p>终点：{{ destPosition }}</p>
          <br><br>
          <button
            class="item callBtn"
            @click="onReceiveOrder"
          >接 单</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
// issue-sass: https://www.jianshu.com/p/c4610144c2f7
import "@/components/ReceiveOrder/ReceiveOrder.scss";

@Component
export default class ReceiveOrder extends Vue {
  @Prop() open!: boolean;
  @Prop() private srcPosition: string = "";
  @Prop() private destPosition: string = "";
  private minHeight: number = 0;
  private contentHeight: number = 200;

  @Watch("open")
  public onOpenChanged() {
    // console.log("onOpenChanged");
    if (this.open) {
    }
  }

  onCancel() {
    this.$emit("show");
  }

  onReceiveOrder() {
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
    // 测试，固定地点
    const req = {
      srcGeo: "[110,27]",
      destGeo: "[112,30]",
    };
    uni.$emit("acceptOrder", req);
  }
}
</script>