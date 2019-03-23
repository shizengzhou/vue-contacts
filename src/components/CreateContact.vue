<template>
  <div>
    <router-link to="/" class="back-link"></router-link>
    <form class="create-contact-form" v-on:submit.prevent="addContact">
      <ImageInput class="create-contact-avatar" name="avatarURL"
        maxHeight="64"
      >
      </ImageInput>
      <div class="create-contact-info">
        <input type="text" name="name" placeholder="Name">
        <input type="text" name="email" placeholder="Email">
        <button type="submit">ADD CONTACT</button>
      </div>
    </form>
  </div>
</template>

<script>
import serialize from 'form-serialize';
import ImageInput from './ImageInput.vue';
import * as API from '../utils/api.js';

export default {
  methods: {
    addContact: function (e) {
      const values = serialize(e.target, { hash: true });
      API.add(values);
      this.$router.push('/');
    }
  },
  components: {
    ImageInput
  }
};
</script>

<style scoped>
.back-link {
  display: block;
  width: 60px;
  height: 60px;
  background-image: url(../icons/arrow-back.svg);
  background-repeat: no-repeat;
  background-position: center;
  -webkit-background-size: 30px;
  background-size: 30px;
}

.create-contact-form {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  padding: 0 20px;
}

.create-contact-avatar {
  min-width: 60px;
  height: 60px;
  background-color: #fff;
  background-image: url(../icons/person.svg);
  background-repeat: no-repeat;
  background-position: center;
  -webkit-background-size: 32px;
  background-size: 32px;
  border-radius: 50%;
}

.create-contact-info {
  margin-left: 20px;
}

.create-contact-info input {
  width: 100%;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid #ccc;
  outline: 0;
  font-size: inherit;
  padding: 5px 10px;
  margin-bottom: 10px;
}

.create-contact-info button {
  margin-top: 20px;
  padding: 10px;
  font-size: inherit;
  background-color: #ccc;
  border: 0;
  outline: 0;
  cursor: pointer;
}
</style>
