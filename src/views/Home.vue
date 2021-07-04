<template>
  <div id="app" class="container">
    <br />
    <div class="row">
      <div class="col-lg-8">
        <h4>Data Karyawan</h4>
        <b-row class="mb-2">
          <b-col md="6">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Cari Karyawan..."
            ></b-form-input>
          </b-col>
          <b-col md="6">
            <b-form @submit="onSubmit">
              <b-row>
                <b-col lg="6">
                  <b-form-select
                    class="form-select"
                    v-model="form.status"
                    :options="listStatus"
                    required
                  ></b-form-select>
                </b-col>
                <b-col lg="6">
                  <b-button type="submit" variant="danger">Filter</b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-table
              striped
              hover
              outlined
              :items="posts"
              :filter="filter"
              :fields="fields"
            >
              <template v-slot:cell(actions)="data">
                <b-button variant="primary" @click="detailItem(data.item.id)"
                  >Detail</b-button
                >
              </template>
            </b-table>
          </b-col>
        </b-row>
      </div>
      <div class="col-lg-4">
        <br />
        <div class="card card-container">
          <h4>Kotak Absensi</h4>
          <hr />
          <div class="form-group">
            <h6>Selamat Datang !</h6>
            <p>
              Nama : <b>{{ employee.fullname }}</b> <br />
              Divisi : <b>{{ employee.divisi }}</b> <br />
              Status : <b>{{ employee.txtstatus }}</b>
            </p>
            <p>
              Tanggal :
              <b>{{
                date.toLocaleString("en-US", {
                  timeZone: "Asia/Jakarta",
                  hour12: false,
                })
              }}</b>
            </p>
          </div>
          <hr />
          <div class="form-group">
            <div v-if="employee.status == null">
              <b-button variant="danger" @click="updateStatus(employee.id, 1)"
                >Mulai Kerja</b-button
              >
            </div>
            <div v-else-if="employee.status == 1">
              <b-button variant="primary" @click="updateStatus(employee.id, 2)"
                >Istirahat</b-button
              >
              |
              <b-button variant="danger" @click="updateStatus(employee.id, 3)"
                >Selesai Kerja</b-button
              >
            </div>
            <div v-else-if="employee.status == 2">
              <b-button variant="primary" @click="updateStatus(employee.id, 1)"
                >Lanjut Kerja</b-button
              >
              |
              <b-button variant="danger" @click="updateStatus(employee.id, 3)"
                >Selesai Kerja</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EmployeeService from "../services/employees.service";

export default {
  name: "Home",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      filter: "",
      employee: "",
      date: new Date(),
      posts: [],
      fields: [
        { key: "fullname", label: "Nama Lengkap" },
        { key: "divisi" },
        { key: "status" },
        { key: "timestamp" },
        {
          key: "actions",
        },
      ],
      form: {
        status: null,
      },
      listStatus: [
        { text: "Pilih Status", value: null },
        { text: "Kerja", value: 1 },
        { text: "Istirahat", value: 2 },
        { text: "Pulang", value: 3 },
        { text: "Belum Masuk", value: 0 },
        { text: "Lihat Semua", value: 4 },
      ],
    };
  },
  mounted() {
    EmployeeService.getAll().then(
      (response) => {
        this.posts = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
    EmployeeService.getTodayById(this.currentUser.id).then(
      (response) => {
        this.employee = response.data[0];
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      if (this.form.status == 4) {
        EmployeeService.getAll().then(
          (response) => {
            this.posts = response.data;
          },
          (error) => {
            this.content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      } else {
        EmployeeService.getAllByStatus(this.form.status).then(
          (response) => {
            this.posts = response.data;
          },
          (error) => {
            this.content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
    detailItem(id) {
      this.$router.push("/employee/" + id);
    },
    updateStatus(id, status) {
      var data = {
        id: id,
        status: status,
      };
      EmployeeService.updateStatus(data).then(
        () => {
          EmployeeService.getAll().then(
            (response) => {
              this.posts = response.data;
              EmployeeService.getTodayById(this.currentUser.id).then(
                (user) => {
                  this.employee = user.data[0];
                },
                (error) => {
                  this.content =
                    (error.user && error.user.data) ||
                    error.message ||
                    error.toString();
                }
              );
            },
            (error) => {
              this.content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        },
        (error) => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
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