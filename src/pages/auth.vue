<template>
  <Layout :style="{minHeight: '100vh'}">
    <Header class="auth-page-header">
      <div class="logo-wrapper">
        <img src="../assets/logo.png">
      </div>
    </Header>
    <Content class="auth-page-content">
      <Card class="auth-container">
        <Alert type="error" v-if="error">{{error}}</Alert>
        <Form ref="loginForm" :model="loginForm" :rules="ruleValidate">
          <FormItem label="账号" prop="account">
            <Input v-model="loginForm.account" placeholder="请输入账号"/>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input v-model="loginForm.password" type="password" placeholder="请输入密码"/>
          </FormItem>
          <FormItem>
            <Button type="primary" long @click="handleLogin" :loading="loading">登录</Button>
          </FormItem>
        </Form>
      </Card>
    </Content>
  </Layout>
</template>

<script>
  export default {
    middleware: 'notAuth',
    data() {
      return {
        loading: false,
        error: '',
        loginForm: {
          account: '',
          password: ''
        },
        ruleValidate: {
          account: [
            {required: true, message: 'too young', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'too simple', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      handleLogin() {
        let self = this
        self.loading = true
        this.$store.dispatch('authLogin', this.loginForm)
          .then(() => {
            self.$router.push({name: 'index'})
          })
          .catch(err => {
            self.error = err.toString()
          })
          .finally(() => self.loading = false)
      }
    }
  }
</script>
