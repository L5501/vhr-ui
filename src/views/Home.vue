<template>
  <div>
    <el-container>
      <!--      tittle-->
      <el-header class="homHeader">
        <div class="tittle">微人事</div>
        <el-dropdown class="userInfo" @command="commandHandler">
  <span class="el-dropdown-link">
    {{ user.name }}<i><img :src="user.userface"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!--      导航菜单-->
      <el-container>
        <el-aside width="200px">
          <el-menu router>
            <el-submenu index="1" v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden" :key="index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">{{child.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
<!--        页面-->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user"))
    }
  },
  methods: {
    commandHandler(cmd) {
      if (cmd == "logout") {
        this.$confirm('是否注销登录', '注销登录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRequest("/logout");
          window.sessionStorage.removeItem("user");
          this.$router.replace("/")
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      }
    }
  }
}
</script>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #000000;
  display: flex;
  align-items: center;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.homHeader {
  background: #3a76d0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  box-sizing: border-box;
}

.homHeader.tittle {
  font-size: 30px;
  font-family: 华文行楷;
  color: white;
}

.homHeader.userInfo {
  cursor: pointer;
}
</style>
