<template>
  <Header class="page-header">
    <Col>
      <!--<DatePicker-->
      <!--:value="dateTimeRange"-->
      <!--type="datetimerange"-->
      <!--placement="bottom-start"-->
      <!--placeholder="选个时间"-->
      <!--style="width: 350px"-->
      <!--size="large"-->
      <!--confirm-->
      <!--:options="dateTimePickerOptions"-->
      <!--@on-change="handleDateTimeChange"-->
      <!--@on-ok="handleDateTimeSelected"-->
      <!--&gt;</DatePicker>-->
      <!--<Button size="large" @click="handleResetDateTime">重置</Button>-->
    </Col>
    <div>
      <Button type="primary" style="margin-right: 10px" @click="handlePassword">改密码</Button>
      <Poptip
        confirm
        title="就登陆着呗，又没啥影响"
        placement="left-start"
        @on-ok="handleLogout">
        <Button type="error" class="logout-btn">
          <Icon type="md-log-out" size="20"/>
        </Button>
      </Poptip>
    </div>
    <Modal v-model="passwordModal" draggable scrollable title="改密码" @on-ok="handleSubmit">
      <Alert type="error" v-if="passwordError">{{passwordError}}</Alert>
      <Form ref="formInline" :model="passwordForm" inline>
        <FormItem prop="user">
          <Input type="password" v-model="passwordForm.pwd" placeholder="密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="passwordForm.pwd1" placeholder="再输一次">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit()">确定</Button>
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </Modal>
  </Header>
</template>

<script>
  import moment from 'moment'

  export default {
    data() {
      return {
        dateTimeRange: [],
        dateTimePickerOptions: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          },
          shortcuts: [
            {
              text: '过去一天',
              value: () => this.calShortCutValue(1, "day"),
            },
            {
              text: '过去一周',
              value: () => this.calShortCutValue(1, "week"),
            },
            {
              text: '过去一月',
              value: () => this.calShortCutValue(1, "month"),
            },
            {
              text: '过去一季度',
              value: () => this.calShortCutValue(1, "quarter"),
            },
            {
              text: '过去一年',
              value: () => this.calShortCutValue(1, "year"),
            }
          ]
        },
        passwordModal: false,
        passwordForm: {
          pwd: '',
          pwd1: ''
        },
        passwordError: ''
      }
    },
    methods: {
      handleLogout() {
        this.$store.dispatch('authLogout')
        this.$router.push('auth')
      },
      handleDateTimeChange(date) {
        this.dateTimeRange = date;
      },
      handleDateTimeSelected() {
        let timeGTE = moment(this.dateTimeRange[0])
        let timeLTE = moment(this.dateTimeRange[1])
        if (timeGTE.isValid() && timeLTE.isValid()) {
          this.$store.commit('SET_TIME_GTE', timeGTE)
          this.$store.commit('SET_TIME_LTE', timeLTE)
        }
      },
      calShortCutValue(num, type) {
        return [moment().subtract(num, type).toDate(), moment().toDate()];
      },
      handleResetDateTime() {
        this.dateTimeRange = []
        this.$store.commit('SET_TIME_GTE', "")
        this.$store.commit('SET_TIME_LTE', "")
      },
      handlePassword() {
        this.passwordModal = true
      },
      handleSubmit() {
        if (this.passwordForm.pwd.length < 8) {
          this.passwordError = "密码太短了"
        } else if (this.passwordForm.pwd !== this.passwordForm.pwd1) {
          this.passwordError = "两次密码不对啊"
        } else {
          this.$store.dispatch('authUpdatePassword', this.passwordForm.pwd)
            .then(() => {
              this.passwordModal = false
              this.$Notice.success({
                title: '改好了'
              })
            })
            .catch(err => this.passwordError = err.toString())
        }
      }
    },
    async mounted() {
      this.$store.dispatch('authUser')
    }
  }
</script>
