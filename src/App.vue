<template>
  <div id="app">
             <router-view></router-view>
             <transition>
             <router-view name="main"></router-view>
             </transition>
            <router-view name="right"></router-view>
            <router-view name="foot"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="scss" scoped>

</style>
