<template>
  <div>
    <canvas id="jsCanvas" width="700" height="700" class="canvas"></canvas>
    <div class="controls">
      <div class="controls__range">
        <input type="range" id="jsRange" min="0.1" max="5" value="2.5" step="0.1" />
      </div>
      <div class="controls__btns">
        <button id="jsMode">Fill</button>
        <button id="jsSave">Save</button>
      </div>
      <div class="controls__colors" id="jsColors">
        <div class="controls__color jsColor" style="background-color: #2c2c2c"></div>
        <div class="controls__color jsColor" style="background-color: white"></div>
        <div class="controls__color jsColor" style="background-color: #ff3b30"></div>
        <div class="controls__color jsColor" style="background-color: #ff9500"></div>
        <div class="controls__color jsColor" style="background-color: #ffcc00"></div>
        <div class="controls__color jsColor" style="background-color: #4cd963"></div>
        <div class="controls__color jsColor" style="background-color: #5ac8fa"></div>
        <div class="controls__color jsColor" style="background-color: #0579ff"></div>
        <div class="controls__color jsColor" style="background-color: #5856d6"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 50,
    },
    canvasSize: {
      type: Number,
      default: 700,
    },
    initialColor: {
      type: String,
      default: "2c2c2c",
    },
  },
  data() {
    return {
      filling: false,
      painting: false,
    };
  },
  watch: {
    radius() {
      this.draw(this.radius);
    },
    // range() {
    //   console.log("range");
    //   if (this.range) {
    //     this.range.addEventListener("input", this.handleRangeChange);
    //   }
    // },
  },
  methods: {
    startPainting() {
      //console.log("start");
      this.painting = true;
    },
    stopPainting() {
      //console.log("stop");
      this.painting = false;
    },

    onMouseMove(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      //console.log(x, y);
      if (!this.painting) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
        //console.log("line", x, y);
        this.ctx.stroke();
      }
    },

    handleCanvasClick() {
      if (this.filling) {
        this.ctx.fillRect(0, 0, 700, 700);
      }
      //console.log("canvasClick");
    },

    handleRangeChange(event) {
      const size = event.target.value;
      this.ctx.lineWidth = size;
    },

    handleModeClick() {
      if (this.filling === true) {
        this.filling = false;
        this.mode.innerText = "Fill";
      } else {
        this.filling = true;
        this.mode.innerText = "Paint";
      }
    },

    saveButtonClick() {
      if (this.saveBtn) {
        this.saveBtn.addEventListener("click", this.handleSaveClick);
      }
    },

    handleSaveClick() {
      const image = this.canvas.toDataURL();
      const link = document.createElement("a");
      console.log(link);
      link.href = image;
      link.download = "PaintJS";

      link.click();
    },

    handleColorClick(event) {
      console.log(event.target.style);

      const color = event.target.style.backgroundColor;
      this.ctx.strokeStyle = color;
      this.ctx.fillStyle = color;
      //console.log("colorClick", event);
    },

    draw() {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);
      this.strokeStyle = this.initialColor;
      this.fillStyle = this.initialColor;
      this.lineWidth = 2.5;

      console.log("rad", this.range);
      // this.ctx.beginPath();
      // this.ctx.clearRect(0, 0, 200, 200);
      // this.ctx.arc(100, 100, radius, 0, Math.PI * 2);
      // this.ctx.fill();
    },
  },
  mounted() {
    // mounted 이후부터 canvas의 DOM에 접근할 수 있습니다.
    // CreateJS 등을 사용할 때에도 여기에서 canvas를 매개 변수로 전달해야 합니다.
    // //console.log(this.$el);
    this.canvas = document.getElementById("jsCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.colors = document.getElementsByClassName("jsColor");
    this.range = document.getElementById("jsRange");
    this.mode = document.getElementById("jsMode");
    this.saveBtn = document.getElementById("jsSave");

    if (this.canvas) {
      this.canvas.addEventListener("mousemove", this.onMouseMove);
      this.canvas.addEventListener("mousedown", this.startPainting);
      this.canvas.addEventListener("mouseup", this.stopPainting);
      this.canvas.addEventListener("mouseleave", this.stopPainting);
      this.canvas.addEventListener("click", this.handleCanvasClick);
      // this.canvas.addEventListener("contextmenu", handleCM);
    }
    Array.from(this.colors).forEach((color) =>
      color.addEventListener("click", this.handleColorClick)
    );
    if (this.range) {
      this.range.addEventListener("input", this.handleRangeChange);
    }

    if (this.mode) {
      this.mode.addEventListener("click", this.handleModeClick);
    }

    if (this.saveBtn) {
      this.saveBtn.addEventListener("click", this.handleSaveClick);
    }

    this.draw();
  },
};
</script>

<style scoped>
.canvas {
  widows: 700px;
  height: 700px;
  background-color: grey;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.controls {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.controls .controls__btns {
  margin-bottom: 30px;
}

.controls__btns button {
  all: unset;
  cursor: pointer;
  background-color: white;
  padding: 5px 0px;
  width: 80px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 2px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.7);
  text-transform: uppercase;
  font-weight: 800;
  font-size: 12px;
}

.controls__btns button:active {
  transform: scale(0.98);
}

.controls .controls__colors {
  display: flex;
}
.controls__colors .controls__color {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.controls .controls__range {
  margin-bottom: 30px;
}
</style>
