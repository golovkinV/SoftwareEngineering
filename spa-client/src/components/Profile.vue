<template>
  <div class="container container-lrl">
    <div class="form-group image-upload" style="margin-left: 30%">
      <img :src="user.avatar" class="avatar"/>
      <label for="file-input" style="vertical-align: bottom">
        <img src="https://img.icons8.com/material/18/000000/pencil--v1.png"/>
      </label>
      <input id="file-input" type="file" @change="uploadImage($event)" />
    </div>
    <div class="notice notice-lg">
      <strong>Login information</strong>
      <img  v-on:click="editPassword" src="https://img.icons8.com/material/18/000000/pencil--v1.png"/>
      <hr>
      <label>Email:</label>&nbsp;<label class="label label-default">{{ user.email }}</label><br>
      <label>Role:</label>&nbsp;<label class="label label-default">{{ user.role.name }}</label>
    </div>
    <div class="notice  notice-lg">
      <strong>Profile information</strong>
      <img v-on:click="editProfile" src="https://img.icons8.com/material/18/000000/pencil--v1.png"/>
      <hr>
      <label>First name:</label>&nbsp;
      <label class="label label-default">{{ user.firstName }}</label><br>
      <label>Last name:</label>&nbsp;
      <label class="label label-default">{{ user.lastName }}</label><br>
      <label>Country:</label>&nbsp;
      <label class="label label-default">{{ user.country }}</label><br>
      <label>About:</label>&nbsp;
      <label class="label label-default">{{ user.about }}</label>
    </div>
    <div class="notice notice-lg">
      <strong>Personal Identification Number</strong>
      <img v-on:click="editPin" src="https://img.icons8.com/material/18/000000/pencil--v1.png"/>
      <hr>
      <label v-if="user.pin" >PIN: ••••</label>
      <label v-else v-on:click="editPin" class="pin-setting">Set PIN</label>
    </div>
  </div>
</template>

<script>

import ProfileService from "@/services/ProfileService";
import ImageService from "@/services/ImageService";
import UserService from "@/services/UserService";

export default {
  name: "Profile",
  data() {
    return {
      user: Object
    }
  },
  methods: {
    editPassword: function () {
        const user = this.user
        this.$router.push(`/profile/edit_password/${user.id}`)
    },
    editProfile: function () {
        const user = this.user
        this.$router.push(`/profile/edit_profile/${user.id}`)
    },
    editPin: function () {
      const user = this.user
      this.$router.push(`/profile/edit_pin/${user.id}`)
    },
    update() {
      const id = this.$route.params.id
      UserService
          .update(id, this.user)
          .then(res => {
            console.log(res.data)
          })
        .catch(e => {
          console.log(e)
        })
    },
    uploadImage(event) {
      const image = event.target.files[0];
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        ImageService
            .upload(formData)
            .then(res => {
              this.user.avatar = res.data
              this.update()
            })
            .catch(e => {
              console.log(e)
            })
      }
    }
  },
  mounted() {
    const id = this.$route.params.id
    ProfileService
        .get(id)
        .then(response => {
          this.user = response.data
          const user = JSON.stringify(response.data)
          localStorage.setItem("user", user)
        })
        .catch(e => {
          console.log(e);
        })
  }
}
</script>

<!--// -->
<style scoped>

strong {
  margin-right: 8px;
}
.image-upload>input {
  display: none;
}
.avatar {
  margin-top: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: none;
  background-color: #dddddd;
}
img {
  margin-top: -4px;
  cursor: pointer;
}
.pin-setting {
  cursor: pointer;
  background-color: #7f7f84;
  padding: 1.5%;
  width: 50%;
  color: #fff;
  text-align: center;
  margin-left: 24%;
  border-radius: 1rem;
  font-weight: 400;
}
.container-lrl{
  margin-top: 5%;
  margin-bottom: 5%;
  width: 40%;
}

.notice {
  padding: 15px;
  background-color: #fafafa;
  border-left: 6px solid #7f7f84;
  margin-bottom: 10px;
  -webkit-box-shadow: 0 5px 8px -6px rgba(0,0,0,.2);
  -moz-box-shadow: 0 5px 8px -6px rgba(0,0,0,.2);
  box-shadow: 0 5px 8px -6px rgba(0,0,0,.2);
}

.notice-lg {
  padding: 35px;
  font-size: large;
}

.notice-success>strong {
  color: #80D651;
}
.notice-info {
  border-color: #0062cc;
}
.notice-info>strong {
  color: #0062cc;
}

.notice-warning>strong {
  color: #FEAF20;
}

.notice-danger>strong {
  color: #d73814;
}

</style>