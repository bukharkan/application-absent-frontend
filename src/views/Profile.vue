<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h2>Profil</h2>
      <hr />
      <div class="form-group">
        <label for="email">Email</label>
        <h6>{{ user.email }}</h6>
      </div>
      <div class="form-group">
        <label for="fullname">Full Name</label>
        <h6>{{ user.fullname }}</h6>
      </div>
      <div class="form-group">
        <label for="divisi">Divisi</label>
        <h6>{{ user.divisi }}</h6>
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <h6 v-if="user.role == 1">Karyawan</h6>
        <h6 v-else>User</h6>
      </div>
      <hr />
      <div class="form-group">
        <a href="/profile/edit" class="btn btn-primary btn-block"
          >Edit Profile</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      user: "",
    };
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    var data = {
      id: this.currentUser.id,
    };
    UserService.getProfilebyId(data).then(
      (response) => {
        this.user = response.data;
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
  max-width: 350px !important;
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