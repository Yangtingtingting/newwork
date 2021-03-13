import Vue from 'vue';
import nodata from './nodata.vue'
import nonetwork from './nonetwork.vue'
import headerbar from './headerbar.vue'
import lasttime from './lasttime.vue'
import imgcode from './imgcode.vue'
import sendphonecode from './sendphonecode.vue'
const components = [nodata, nonetwork, headerbar, lasttime, imgcode, sendphonecode];
components.map(function(component) {
    Vue.component(component.name, component);
});