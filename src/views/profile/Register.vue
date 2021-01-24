<!--  -->
<template>
  <div>
    <nav-bar>
      <template v-slot:default>新用户注册</template>
    </nav-bar>
    <div style="margin-top:100px;text-align:center">
      <van-image
        width="10rem"
        fit="contain"
        src="https://cdn2.lmonkey.com/94f152aaa94d937ccf5de78f3fcac59f/3b6e32e7bc8145a283431f260c3c1d1a.png"
      />
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="userInfo.name"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="userInfo.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="userInfo.password_confirmation"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '确认密码' }]"
        />
        <van-field
          v-model="userInfo.email"
          name="电子邮箱"
          label="电子邮箱"
          placeholder="电子邮箱"
          :rules="[{ required: true, message: '请填写正确的电子邮箱' }]"
        />
        <div
          @click="$router.push({ path: '/login' })"
          style="font-size:14px;color:#42b983;text-align:left;margin-top:10px"
        >
          已有账号?点击登录
        </div>
        <div style="margin: 16px;">
          <van-button
            round
            block
            type="info"
            color="#42b983"
            native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

import { register } from "@/request/user";
export default {
  name: "Register",
  data() {
    return {
      userInfo: {
        name: "",
        password: "",
        password_confirmation: "",
        email: ""
      }
    };
  },
  created() {},
  methods: {
    onSubmit() {
      // console.log(1);
      if (this.userInfo.password !== this.userInfo.password_confirmation) {
        this.$notify("两次输入的密码不一致...");
      }
      register(this.userInfo).then(res => {
        if (res.status == 201) {
          // console.log(res);
          this.$toast.success("注册成功");
          setTimeout(() => {
            this.$router.push("/login");
          }, 1000);
          this.userInfo.password_confirmation = "";
          this.userInfo.password = "";
        }
      });
    }
  },
  components: { NavBar }
};
</script>
<style scoped></style>
