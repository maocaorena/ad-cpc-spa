<template >
    <div id="layout">
        <slide-bar></slide-bar>
        <div class="right-bar">
            <router-view></router-view>
        </div>
    </div>
</template>
<script type="text/javascript">
    import slideBar from "./slidebar.vue";
    import { Util } from '../../lib/util.js';
    export default{
        data(){
            return{

            }
        },
        components:{
            "slide-bar": slideBar
        }
    }
</script>
<style lang="scss">
    #layout{
        width: 100%;
        height: 100%;
        position: relative;
        .right-bar{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 150px;
            right: 0;
            width: auto;
            height: auto;
            background: #ccc;
        }
    }
</style>
