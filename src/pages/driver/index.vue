<template>
  <div id="hisMainContent" class="home-container"></div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class DriverPage extends Vue {
  private sidPrefix = 'lbsclient_'
  private asOpen: boolean = true

  public mounted(): void {
    const content = document.getElementById('hisMainContent') as HTMLElement
    content.style.height = `${window.innerHeight - 100}px`
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
