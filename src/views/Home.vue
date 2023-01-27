<template>
  <div>
    <el-container>
      <el-header class="homHeader">
        <div class="tittle">微人事</div>
        <el-dropdown>
  <span class="el-dropdown-link">
    {{user}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
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
  }
}
</script>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.homHeader {
  background: aqua;
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
