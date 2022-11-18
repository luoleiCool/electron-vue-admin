<template>
  <div class="app-wrapper">
    <el-container>
      <el-container>
        <el-aside width="100px">
          <el-menu :default-openeds="['1']">
            <router-link to="/index">
              <el-menu-item index="1">
                <el-icon><House /></el-icon>
                控制台
              </el-menu-item>
            </router-link>
            <router-link to="/hello">
              <el-menu-item index="2">
                <el-icon>
                  <icon-menu/>
                </el-icon>
                查看
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>LuolCool copyright@2022</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {}
  },
  components: {
    // menu
  },
  mounted() {

  }
}
</script>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.homepage {
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-header,
.el-footer {
  background-color: #409EFF;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #415670;
  color: #050303;
  text-align: center;
  font-size: 20px;
}

.el-aside.router-link-active {
 text-decoration: none;
}

.el-aside a {
  text-decoration: none;
  font-size: 20px;
}

.el-main {
  background-color: #ecf5ff;
  color: #333;
  text-align: center;
}

.el-menu {
  background-color: #415670;
}
</style>
