<template>
  <div>
    <p>
      This is My Canvas
    </p>
    <my-canvas :canvasSize="canvasSize" :initialColor="initialColor"></my-canvas>
  </div>
</template>

<script>
import MyCanvas from "./MyCanvas.vue";
export default {
  components: {
    MyCanvas,
  },
  name: "paintJs",
  props: {
    msg: String,
  },
  data() {
    return {
      radius: 50,
      initialColor: "2c2c2c",
      canvasSize: 700,
      painting: false,
      filling: false,
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
