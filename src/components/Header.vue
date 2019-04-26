<template>
    <el-row type="flex" justify="space-between" align="middle">
        <i class="el-icon-back" @click="handleClick"></i>
        <div class="user-info">
            {{username}} {{realname}} 
            <span @click="handleLogout">退出</span>
        </div>
    </el-row>
</template>
<script>
export default {
    data(){
        return {
            username: "",
            realname: ""
        }
    },
    methods:{
        // 触发传递过来的左侧展开收缩事件
        handleClick(){
           this.$emit("updataCollapse");
        },

        // 用户退出
        handleLogout(){
            this.$axios({
                url: "/admin/account/logout"
            }).then(res => {
                const {status} = res.data;

                // if(!status){
                if(status === 0){
                    // 跳转到登录页 (push不是最优的方案)
                    // replace也是处理跳转，直接替换掉当前的页面
                    this.$router.replace("/login");

                    // 清除本地的数据
                    localStorage.removeItem('username');
                    localStorage.removeItem('realname');
                }
            })
        }
    },

    mounted(){
        // 从本地获取到用户的信息
        this.username = localStorage.getItem("username");
        this.realname = localStorage.getItem("realname");
    }
}
</script>
<style>
.el-icon-back{
    cursor: pointer;
}
.user-info span{
    cursor: pointer;
}
</style>