<template>
  <div style="height: 100%;">
    <h2>北京地铁线路图</h2>
    <Row :gutter="24" style="margin-top:10px;margin-bottom:10px;">
      <!-- <Col span="5">
        <div style="margin: 10px 0 30px;">
          <Icon type="ios-information-circle" />使用 svg.js 操作各元素
        </div>
      </Col> -->
      <Col span="2">
        <Button type="primary" @click="select_circle">点击框选车站</Button>
      </Col>
      <Col span="3">
        <Button type="primary" @click="drag">点击拖拽</Button>
      </Col>
    </Row>
    <div id="svg_subway" class="draw"></div>
  </div>
</template>

<script>
const imgSrc =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACldJREFUeNq8mmtMVdkVx7eIKOIDn4gvUFuQghjFR6dlfOA79ZFaR/2iNWZMJu2HdtKZpk07TZ0mpp1p06RN+8U2WtExgpgZUzS1GmtQ6wsRH/gCBRF8IiqoKApdvz1n32zO3HPOBbErWV65nLP3/q+19n+ttTddHj16pGpqatQbki6i3ZzPFtHmzhy8paVFjRo1SvXs2VNFA2LXrl2dtegU0TTRyaKpogmi0c7vW0UbRatES0WLRa+I1nV0whcvXqi1a9eqpKSk0CSvI2+JviM6TXSsaFw73q0UPSe6W7RQ9FZHFxEI5OXLl9qFSFRUlIqO1q8QLt8T/aHotx1vfEVaW1vbuqzLVx5LdnSRKPGdL/oX0XLebW5uVt26dQv3XvuAAGLBggUqISFBD9jU1KQKCwvfrq+v39C1a9dsP9BITEyMBm+Ehb169SoESsawfz9M9Meia+S5P2dnZ/8hPT390d69e9WNGzf0/B0GwqKGDRumVUgh7tixYx/V1dW9L4PG2M8AgAUNHDhQDRkyRD8/YMAA1atXrzZAiOmHDx+q27dva4K5c+eOevLkiQbkeBqJl58/KikpWSKx/wP5/5FOCS0sUVlZOWbr1q25Yqm3sLIJGxYWFxenxo0bpzIyMtTw4cNVjx49fMcbMWKEfh65f/++unLlijp//ryqra3VXgIQ4J8/f54pc/5b5v+V6O9fCwggzp07l1FcXFwglk8xIAgRJpw6dapWPNER4T108uTJ6uLFi+rIkSPq1q1bOiQBJZ+x8tineEn0lx0GIoNlFBUV/VPcm4T7EbGUtvzcuXNVcnJyp+QDDJaZmalSUlLU0aNHtRKuVrj9gi0n+tOOABkjWiCTJJlQwhNZWVlq3rx5gSHUEWHMnJwcbSghFfalvck/dPLQx+0Bwiq3OwlOg8BC06dP1xO9acEzffv2VTt37lT37t2zwawXrRDd5n4nymOs9U52Du2JadOm/V9AGIHyV6xYofr166eNaAkb/+uRAPmW6AfmB/YE4RQEwp38OkMggmXLlumQs/LTENHfudfuBoIP/2i+xxPEK3siqObZsWOH2rdvX+DihAH1Zo4UODkJYiGRWu98V3Sp3x7hgSnGwrDG/PnzVffu3X09wcYUmlaG2fCexThtpLq6Wh0/flxVVVWpOXPmRETdEyZM0PmmrKxMmRQg8jPRL0xFbXuEVfzItvLEiRPVyJEjfScBwJkzZ3QpzSSHDh1SJ0+e9Hy+oaFBP3fp0iW1adMmdeLEiTZljZdgHOawns0SnRcutNgb3zRlBxmbZOcn7J/Dhw+HyhA2JYxDlg8nhColCc8D5tmzZ9qb27dvV3fv3vWda9CgQXpcxrDkPVOw2kDeMT+zoLFjx+p6yU8oLaibCCMDfuHChap3795hnwfE06dPQ8AJRQARNps3b1ZSy/l6Z9KkSSo2NtbeK2/LGMk2EHqI2SE3yURk2qCC8uzZs6FFYSne8QMPENRdlgOGyppKd9u2bbqY9KJkQt3ySp/S0tIcG8goJ5Nrb+DGoUOH+gKRUl4nK6yKhViMV0gZefz4sR4/XH9hvHP16lW1ceNGvdfYp25JTU1VtsGFPHIIcQMkzalltKUTExN9mcodJlAj4LGYnzx48MD391gaMLQCFju1EdIBazOsKu3AN8SDIY7Msh8O8obxnIlVwAPEi3IjAYIxCE0qYRbr1RXGx8drpQVwGrMkmXe48UiqO6MGid0wITRRQUIRaC/cdIvmZ6pp+hW/1pYsD6lYpNBPDJQY5dDXQJPcKNDg6yDBvbjfeIUwCwqbxsbGEG1jLLxoFsTiSXiRZHyMZj8nGz4hymGsHgYIiwvqjzXNiVUAzDu4mNaVBXrVYICAIHhn5syZas2aNTrJmYKQMWArCCGSct9FFPFRTkYPPqYIYxXyBSHBImCw8vLyNvRs6irjhfT0dLVu3ToNBECEEhvb9PxkfWK/vWGtv5J/mti7xr0sIJKSgcFgKWNxPskrfFZUVKgtW7aogoKCEOcPHjxYLV68WPXv379NeALO7BXe9coh7jB1EUUTNEM8NBggWC5ciIRtIceMUadOnQq1qzdv3lS5ubn6+Ma0qgDwsKKW0aNHtwllTlmCBOq3RYxzz4xebYeEzS5BQLAwFjVGuHbtWggYSqcXRBo8ZzzrXmS4isJVHTSPHz/+jgFSaj8ciXuJ5wsXLoRAGI+ak0EmZB8EMSCFIxncjOHqBsPOCyGYlkHmqZF3qk0GO2Mfa8JAWCgcnxM+hNP169d1GLDwcGFjgMBufsJ5liEMU3f5CWQAGMKWNcr414TF6s0KoJv7hgapaL1ilY0GUAZkMK/kxSQwW9DCIAYzBu8EVdzUYoYcWIt0kMfZhwZIregpsynhfF4IJ9xHQKGzZ8/Wz7oZxAYStD/oQegYTWmDEbki8Ot/AG68h+Nlf/zLrn5bnbYxNKBkS894xcrkgtWrV+uSggnCUTYnIH5Cd0hFgEcc6+rxvOTy5cs6X1k1XbmQTbG7sfrChJdTVep2NOgcFzCzZs3S77jLbq8wwVu0x6h9ljxlyhTPwpNwArhL8uX7RjcQLlk+szc9bWxQTmGzc3AHIDI1zzMpC/IKLej9wIED2guEJwYgn/j1M4CGaKycQ474u9dx0J+cY0m9EBjFlBiRHNusWrVKH93wLupFvZThS5cu1WRAaPHJPYxX0oR4aLRcv+e08boXkAoHTGgv4BW7hvI9EZfFZ2dna+9gXb/zYUhj+fLluvdZtGhRqAIIR+O0wHjR2uREzydBJ42/FS2za6/du3cHnnK4uzgWF3TQDUPBgBx0eMn+/fv1XnXR+K/Vl5eqvkCou95lfxkrk0nz8/NVXV37LmAjufvzaxkIJ+5MXM/sFP1bpIfY/xX9uT0ZtMcJBxvuTQtkwfHrwYMH3ZehZc49Y0ukQJRzU7TBZFEGpDECTElJyRsDwV7Iy8vTnnBVDmxsbpJr2n1jxU2RJLUYCakPAMLA0Ct7hsw/Y8YMz03aXiH5QrFFRUWapVx7woC41KGrNwaXZujD06dPN0i3t55TPsMcVL4Ujlxscu0QdBTkV/1y0sh5MWFrjlMNYxFO8p0viEAgDMTClyxZ8rF4oko6wE8kNwx2Lip1IuOYk3KGLM+5L5/kCUB7xT/kQdGJV6mdIBHTAtiH6FLZ5sl370v/URtEHNGRMA9WWrly5T8yMzOPFhYWbmhqalrGdyiNEYsj17AwAAKE8r1Pnz6hOMcoJD8KUoBQipuDCzdzSca/LcXgb6Qw/Ss5BO8HHRgGXk8zEPnAsdhVmZjD7hWiPzHXc7Y1WRwWhuXCHe0YA3jQbr1orszxqQC9uWfPHh1uQa1AIBDTZNmVrdNI7ZD/8idF3xH9vugM9eVdeOhPM6wsHIlcFM0DBNUFQCsrK/W8Ef8tCg+HOyyO4ASD/3zu6NdEJ3If4xy/ciju1SExGcnosuh/RPkTDfj8aSQnJu4rP+P1aOI4LS3tddmz3NE852fuLKCxRNFY5+yMFT1w6qQaJ4xem7JNYfo/AQYAqpk3qBLp2UoAAAAASUVORK5CYII=";

export default {
  data() {
    return {
      draw: null,
      group: null,
      path: null,
      panZoomTiger: null,
      selectedPoints: null,
      s_cx: null,
      s_cy: null,
      e_cx: null,
      e_cy: null
    };
  },
  methods: {
    drawLine(lines) {
      // 开始画线
      this.draw = this.$svg("svg_subway")

        .size(1660, 650)
        .addClass("subway");
      // var draw = SVG('svg_subway').size(800, 600)
      var group = this.draw.group();
      this.group = group;
      for (var i = 0; i < lines.length; i++) {
        var { l_xmlattr, p } = lines[i]; // p： 线内站点信息
        var { lb, loop, uid } = l_xmlattr; // 地铁线信息
        var dStr = ""; //地铁线路点 轨迹 点 字符串 path()
        var isLb = false; //是否圆润拐点
        for (var j = 0; j < p.length; j++) {
          // rc: 是否是首发站
          var { x, y, lb, st, ex, rc } = p[j].p_xmlattr; // 每个站点的详细信息

          if (isLb) {
            isLb = false;
            dStr += x + " " + y + " ";
          } else {
            if (rc) {
              isLb = true;
              dStr += "Q" + x + " " + y + " ";
            } else {
              if (j == 0) {
                dStr += "M" + x + " " + y + " ";
              } else {
                dStr += "L" + x + " " + y + " ";
              }
              if (j == p.length - 1) {
                if (loop) {
                  dStr += "Z";
                }
              }
            }
          }
        }
        var { lb, lc, lbx, lby } = l_xmlattr;

        // 绘制地铁线路名称 和样式
        var lineColor = "#" + lc.split("x")[1];
        var line_text = group.text(lb);
        line_text
          .move(lbx - 10, lby + 15)
          .font({ fill: lineColor, family: "Inconsolata" })
          .addClass("line_name");

        // 绘制地铁线 和样式
        var path = group.path(dStr);
        this.path = path;
        path.fill("none");
        path.stroke({
          color: lineColor,
          width: 4,
          linecap: "round",
          linejoin: "round"
        });
        // .click(function() {
        //   this.stroke({ width: 8})
        // })
      }

      //  根据uid 判断重复的车站重复点
      var repeatStr = ""; //uid字符串判断重复点
      for (var i = 0; i < lines.length; i++) {
        var { l_xmlattr, p } = lines[i];

        if (!l_xmlattr.uid) {
          //暂未开通
          break;
        }
        for (var j = 0; j < p.length; j++) {
          // x, y ： 坐标位置 uid: 唯一标志id
          // ex: 是否是换乘点 st: 是否是车站 rc： lb: 车站名称
          var { x, y, rx, ry, lb, ex, rc, st, uid } = p[j].p_xmlattr;

          if (st) {
            if (ex) {
              // 换乘站
              if (!repeatStr.includes(uid)) {
                var image = group
                  .image(imgSrc)
                  .attr({ name: lb })
                  .addClass("trans");
                image
                  .size(16, 16)
                  .move(x - 8, y - 8)
                  .mouseover(function() {
                    // this
                    // .size(30, 30)
                    // .scale(1.5,1,5)
                    // .animate({ ease: '<', delay: '0.5s', loops: true, reversing: true }).rotate(360).reverse()
                  });
              }
            } else {
              // 非换成站
              var station_point = group
                .circle(8)
                .fill("#fff")
                .stroke({ color: "#" + l_xmlattr.lc.split("x")[1] })
                .addClass("point")
                .move(x - 4, y - 4)
                .attr({ name: lb });
            }

            // 未重复的换成车站名
            if (!repeatStr.includes(uid)) {
              var station_text = group.text(lb);
              station_text
                .move(x + rx + 2, y + ry + 8)
                .font({
                  // family: 'Helvetica',
                  family: "黑体",
                  size: 12,
                  anchor: "start"
                  // leading:  '3em',
                  // fill: '#000',
                })
                .addClass("station_name");

              repeatStr += uid;
            }
          }
        }
      }
    },
    drag() {
      // 开启平移和缩放
      this.panZoomTiger.enablePan();
      this.panZoomTiger.enableZoom();
    },
    select_circle() {
      // 禁用平移和缩放
      this.panZoomTiger.disablePan();
      this.panZoomTiger.disableZoom();
      // 让鼠标指针变成 十字架形态  matrix(0.4,0,0,0.4,402,314)
      var circle;
      $("#svg_subway").css({ cursor: "crosshair" });

      this.draw.mousedown(e => {
        // console.log(e, this.group.attr('transform'))
        // 计算坐标
        let transformValueStr = this.group
          .attr("transform")
          .substring(7, this.group.attr("transform").length - 1);
        let scale_x = transformValueStr.split(",")[0];
        let scale_y = transformValueStr.split(",")[3];
        let translate_x = transformValueStr.split(",")[4];
        let translate_y = transformValueStr.split(",")[5];

        this.s_x = (e.offsetX - translate_x) / scale_x;
        this.s_y = (e.offsetY - translate_y) / scale_y;

        // console.log( this.s_x, this.s_y)

        circle = this.draw
          .ellipse(10, 10)
          .fill("transparent")
          .stroke({ color: "#f06" })
          .addClass("select-circle")
          .move(this.s_x - 15, this.s_y - 15);

        this.group.add(circle);

        this.draw.mousemove(e => {
          let transformValueStr = this.group
            .attr("transform")
            .substring(7, this.group.attr("transform").length - 1);
          let scale_x = transformValueStr.split(",")[0];
          let scale_y = transformValueStr.split(",")[3];
          let translate_x = transformValueStr.split(",")[4];
          let translate_y = transformValueStr.split(",")[5];

          this.m_x = (e.offsetX - translate_x) / scale_x;
          this.m_y = (e.offsetY - translate_y) / scale_y;

          $(".select-circle");
          // .animate({ ease: '<', delay: '1.5s' })
          circle.attr({
            rx: Math.abs(this.m_x - this.s_x) / 2,
            ry: Math.abs(this.m_y - this.s_y) / 2,
            cx: this.m_x - 15,
            cy: this.m_y - 15
          });

          this.draw.mouseup(e => {
            let transformValueStr = this.group
              .attr("transform")
              .substring(7, this.group.attr("transform").length - 1);
            let scale_x = transformValueStr.split(",")[0];
            let scale_y = transformValueStr.split(",")[3];
            let translate_x = transformValueStr.split(",")[4];
            let translate_y = transformValueStr.split(",")[5];

            this.e_x = (e.offsetX - translate_x) / scale_x;
            this.e_y = (e.offsetY - translate_y) / scale_y;

            circle.attr({
              rx: Math.abs(this.e_x - this.s_x) / 2,
              ry: Math.abs(this.e_x - this.s_x) / 2,
              cx: this.e_x - 15,
              cy: this.e_y - 15
            });

            // 销毁所有事件
            this.draw.off();

            $("#svg_subway").css({ cursor: "default" });

            console.log(circle.attr(), $(".point")[0].getAttribute("cx"));
            let points = [];
            // 非换乘点
            var pointsHtml = $(".point");
            for (var i = 1; i < pointsHtml.length; i++) {
              points.push({
                cx: pointsHtml[i].getAttribute("cx"),
                cy: pointsHtml[i].getAttribute("cy"),
                s_name: pointsHtml[i].getAttribute("name"),
                type: "point"
              });
            }

            //换乘点
            var tansHtml = $(".trans");
            for (var i = 1; i < tansHtml.length; i++) {
              points.push({
                cx: tansHtml[i].getAttribute("x"),
                cy: tansHtml[i].getAttribute("y"),
                s_name: tansHtml[i].getAttribute("name"),
                type: "trans"
              });
            }
            console.log(points);
            // $('circle').map(v => {
            //   console.log(v.attributes[2].value)
            // })
            var circle_cx = circle.attr("cx");
            var circle_cy = circle.attr("cy");
            var circle_rx = circle.attr("rx");
            var circle_rx = circle.attr("ry");
            this.selectedPoints = [];
            points.map(v => {
              let a =
                (v.cx - circle_cx) * (v.cx - circle_cx) +
                (v.cy - circle_cy) * (v.cy - circle_cy); // 距离平方
              let b;
              if (v.type === "point") {
                b = circle_rx + 4; // 两个圆的半径和
              } else {
                b = circle_rx; // 圆圈的半径
              }
              var d = Math.sqrt(a) - b;
              if (d <= 0) {
                console.log(d);
                console.log(v.s_name);
              }
            });
          });
        });
      });
    },
    init() {
      var cityCode = 131;

      var lineData;

      if (localStorage.getItem("subway")) {
        lineData = JSON.parse(localStorage.getItem("subway"));
        this.drawLine(lineData);
      } else {
        var timeStamp = (Math.random() * 100000).toFixed(0);
        var checkUrl =
          "https://api.map.baidu.com/?qt=subways&c=" +
          cityCode +
          "&format=json&ak=yZSTYLk9UUvs0ZqXqBbtTp8ViKk5vxLM&v=3.0&from=jsapi&callback=BMapSub._rd._cbk" +
          timeStamp;
        $.getScript(checkUrl);
        BMapSub._rd["_cbk" + timeStamp] = json => {
          console.log("BMapSub:", json.subways.l);
          lineData = json.subways.l;
          this.drawLine(lineData);
          localStorage.setItem("subway", JSON.stringify(json.subways.l));
        };
      }
    }
  },
  created() {},
  destroyed() {
    // 销毁 panZoomTiger 实例
    this.panZoomTiger.destroy();
  },
  computed: {},
  mounted() {
    this.init();
    // 获取方法实例  // 文档: https://www.npmjs.com/package/svg-pan-zoom
    this.panZoomTiger = svgPanZoom(".subway");
    // this.panZoomTiger.zoom(1.2)
    this.panZoomTiger.fit();

    window.onresize = () => {
      this.panZoomTiger.resize(); // update SVG cached size and controls positions
      this.panZoomTiger.fit();
      this.panZoomTiger.center();
    };
  }
};
</script>

<style scoped>
.draw {
  border: 1px solid #ccc;
  border-radius: 5px;
  user-select: none;
  /* min-width: 1600px; */
  width: 100%;
  height: 100%;
  min-height: 650px !important;
  /* margin-top: 10px; */
}
svg {
  width: 100%;
  height: 100%;
  min-height: 650px !important;
}
.draw .subway{
  height: 650px;
}
</style>