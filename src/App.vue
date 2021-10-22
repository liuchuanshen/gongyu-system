<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // setTimeout(() => {
    //   window.L2Dwidget.init({
    //     pluginRootPath: "live2dw/",
    //     pluginJsPath: "lib/",
    //     pluginModelPath: "live2d-widget-model-z16/assets/",
    //     tagMode: false,
    //     debug: false,
    //     model: {
    //       jsonPath:
    //         "../live2dw/live2d-widget-model-haru_1/assets/haru01.model.json"
    //     },
    //     display: { position: "right", width: 300, height: 400 },
    //     mobile: { show: true },
    //     log: false
    //   });
    // }, 1000);
  }
}
// ("../public/live2dw/");
</script>
