// module.exports = file => () => import('@/src/syscfg/' + file + '.vue')
module.exports = file => () => import('../' + file + '.vue')
