<template>
    <transition>
        <div class='actionsheet_wrapper' :style="{maxHeight: (open?contentHeight:minHeight) + 'px'}">
            <div class="actionsheet">
                <div class="_header">
                    <span class="cart">叫车</span>
                    <span class="clear" @click="onCancel">{{open?"收起":"展开"}}</span>
                </div>
                <div class="_content">
                    <p class="item">输入起始地点</p>
                    <p class="item">输入目标地点</p>
                    <p class="item">确认呼叫</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">

import { Component, Prop, Vue, Watch } from "vue-property-decorator";
// issue-sass: https://www.jianshu.com/p/c4610144c2f7
import "@/components/CallCar/CallCar.scss"

@Component
export default class CallCar extends Vue {
    @Prop() open!: boolean;
    private minHeight:number = 45;
    private toggleText = "收起"
    private contentHeight: number = 200;

    @Watch("open")
    public onOpenChanged() {
        console.log("onOpenChanged");
    }

    onCancel() {
        this.$emit('show');
    }
}
</script>