<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h2>Edit Profil</h2>
      <form name="form" @submit.prevent="saveProfile">
        <div class="form-group">
          <label for="fullname">Full Name</label>
          <input
            v-model="currentUser.fullname"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="fullname"
          />
          <div
            v-if="errors.has('fullname')"
            class="alert alert-danger"
            role="alert"
          >
            fullname is required!
          </div>
        </div>
        <div class="form-group">
          <label for="divisi">Divisi</label>
          <input
            v-model="currentUser.divisi"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="divisi"
          />
          <div
            v-if="errors.has('divisi')"
            class="alert alert-danger"
            role="alert"
          >
            divisi is required!
          </div>
        </div>
        <hr />
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Update Profile</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message.message }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from "../models/user";
import UserService from "../services/user.service";

export default {
  name: "EditProfile",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    saveProfile() {
      var data = {
        id: this.currentUser.id,
        fullname: this.currentUser.fullname,
        divisi: this.currentUser.divisi,
      };

      UserService.update(data)
        .then(() => {
          this.$router.push("/home");
        })
        .catch((e) => {
          console.log(e);
        });
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