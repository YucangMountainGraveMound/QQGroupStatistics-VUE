<template>
  <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
    <Menu theme="dark" width="auto" :active-name="currentRouteName" @on-select="handleMenuSelect"
          :class="menuItemClasses"
          @on-collapse="handleMenuCollapse"
    >
      <div class="menu-logo">
        <router-link :to="{name: 'index'}">
          <img src="@/assets/logo.png">
        </router-link>
      </div>
      <MenuItem name="overview">
        <Icon type="md-analytics"/>
        <span>总览</span>
      </MenuItem>
      <MenuItem name="time">
        <Icon type="md-timer"/>
        <span>时间分析</span>
      </MenuItem>
      <MenuItem name="message">
        <Icon type="md-chatboxes"/>
        <span>内容分析</span>
      </MenuItem>
      <MenuItem name="image">
        <Icon type="md-images"/>
        <span>图片分析</span>
      </MenuItem>
      <MenuItem name="habit">
        <Icon type="md-person"/>
        <span>习惯分析</span>
      </MenuItem>
    </Menu>
  </Sider>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        isCollapsed: false
      };
    },
    computed: {
      ...mapGetters([
        'currentRouteName'
      ]),
      menuItemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    methods: {
      handleMenuSelect(name) {
        this.$router.push({name: name})
        this.active = name
      },
      handleMenuCollapse(collapse) {
        this.$store.commit('SET_MENU_COLLAPSE', collapse)
      }
    }
  }
</script>
