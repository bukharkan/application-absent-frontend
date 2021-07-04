<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h4>Detail Absensi Karyawan</h4>
      <hr />
      <div class="form-group">
        <label for="fullname">Nama Lengkap</label>
        <h6>{{ user.fullname }}</h6>
      </div>
      <div class="form-group">
        <label for="divisi">Divisi</label>
        <h6>{{ user.divisi }}</h6>
      </div>
      <hr />
      <div class="form-group">
        <h6 for="role">List History Absensi</h6>
        <p v-for="log in logs" :key="log.id">
          <b>{{ log.date }}</b
          ><br />
          Masuk Kerja : {{ log.worked }}<br />
          Istirahat : {{ log.break }}<br />
          Lanjut Kerja : {{ log.continue }}<br />
          Selesai Kerja : {{ log.finished }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import EmployeeService from "../services/employees.service";

export default {
  name: "detail-employee",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      user: "",
      logs: [],
    };
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    var data = {
      id: this.$route.params.id,
    };
    UserService.getProfilebyId(data).then(
      (response) => {
        if (response.data == "") {
          this.$router.push("/home");
        }
        this.user = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
    EmployeeService.getLogs(this.$route.params.id).then(
      (response) => {
        this.logs = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 450px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>