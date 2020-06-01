<template>
  <navbar>
    <button
      class="navbar-toggler mobile-sidebar-toggler d-lg-none"
      type="button"
      @click="mobileSidebarToggle">&#9776;</button>
    <a class="navbar-brand">
      <span style="display: block;color: #fff;margin-left: 30px;font-size: 20px;font-weight: bold;margin-top: 5px;">北京地铁</span>
    </a>
    <ul class="nav navbar-nav d-md-down-none">
      <li class="nav-item">
        <a class="nav-link navbar-toggler sidebar-toggler" @click="sidebarMinimize">&#9776;</a>
      </li>
    </ul>

    <ul class="nav navbar-nav d-md-down-none">

      <li class="nav-item header-item">
        <router-link tag="div" to="/" style="height:55px;" class="nav-link">
          <span>
            <Icon type="ios-home" size="30" color="#2d8cf0"></Icon>
          </span>
          <span style="color:white">首页</span>
        </router-link>
      </li>

      <li class="nav-item header-item">
        <router-link tag="div" to="/train" style="height:55px;" class="nav-link">
          <span>
            <Icon type="briefcase" size="30" color="#2d8cf0"></Icon>
          </span>
          <span style="color:white">北京地铁</span>
        </router-link>
      </li>

      <li class="nav-item header-item">
        <router-link tag="div" to="/facility" style="height:55px;" class="nav-link">
          <span>
            <Icon type="briefcase" size="30" color="#2d8cf0"></Icon>
          </span>
          <span style="color:white">设备管理</span>
        </router-link>
      </li>

    </ul>

    <ul class="nav navbar-nav ml-auto">
      <Dropdown class="nav-item">
        <a href="javascript:void(0)">
          <span slot="button">
            <img src="static/img/avatars/6.jpg" class="img-avatar" alt="o" />
            <span class="d-md-down-none">{{this.$store.state.user.name}}</span>
          </span>
        </a>
        <Dropdown-menu slot="list">
          <Dropdown-item>
            <a href @click="Logout">
              <p class="dropdown-itemp">
                <Icon type="power"></Icon>Logout
              </p>
            </a>
          </Dropdown-item>
        </Dropdown-menu>
      </Dropdown>

      <li class="nav-item d-md-down-none">
        <a class="nav-link navbar-toggler aside-menu-toggler" @click="asideToggle">&#9776;</a>
      </li>
    </ul>
  </navbar>
</template>
<script>
import navbar from "./Navbar";

export default {
  name: "header",
  components: {
    navbar
  },
  methods: {
    Logout(e) {
      e.preventDefault();
      this.$store
        .dispatch("LogOut")
        .then(() => {
          this.$router.push({ path: "/login" });
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    click() {
      // do nothing
    },
    sidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-hidden");
    },
    sidebarMinimize(e) {
      e.preventDefault();

      document.body.classList.toggle("sidebar-minimized");
    },
    mobileSidebarToggle(e) {
      e.preventDefault();

      document.body.classList.toggle("sidebar-mobile-show");
    },
    asideToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("aside-menu-hidden");
    }
  }
};
</script>

<style type="text/css" scoped>
.dropdown-itemp {
  text-align: left;
  font-size: 15px;
  padding: 10px;
}
.header-item .ivu-dropdown-item {
  padding: 15px;
}
.header-item {
  width: 120px;
  height: 55px;
  line-height: 55px;
}
.header-item span:first-child {
  height: 55px;
  width: 30px;
  float: left;
  padding-top: 5px;
  margin-left: 12px;
}
.header-item span:last-child {
  height: 55px;
  width: 70px;
  float: left;
}
.header-item:hover {
  background-color: #20a8d8;
}
.header-item a {
  color: white !important;
}
</style>
