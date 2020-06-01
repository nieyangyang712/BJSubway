import svgJS from 'svg.js'
// import 'svg.draw.js'
import 'svg.pan-zoom.js'
import 'svg.draggable.js'
// import 'svg.draggy.js'
// import 'svg.select.js'
// import 'svg.resize.js'

// import '@svgdotjs/svg.panzoom.js'

export default {
 install: Vue => {
   Vue.prototype.$svg = svgJS
 }
}
