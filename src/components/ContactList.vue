<template>
  <div>
    <div class="contact-list-top">
      <input type="text" class="search-contact" placeholder="Search contacts"
        v-model="query"
      >
      <router-link to="/create" class="add-contact"></router-link>
    </div>
    <div class="contact-list">
      <div class="contact-count"
        v-if="showingContacts.length !== contacts.length"
      >
        <span>
          Now showing {{ showingContacts.length }} of {{ contacts.length }} total
        </span>
        <button type="button" v-on:click="showAll">Show all</button>
      </div>
      <div class="contact" v-for="contact in showingContacts"
        v-bind:key="contact.id"
      >
        <img class="contact-avatar" v-bind:src="contact.avatarURL" alt="avatar">
        <div class="contact-content">
          <p>{{ contact.name }}</p>
          <p>{{ contact.email }}</p>
        </div>
        <button type="button" class="contact-remove"
          v-on:click="removeContact(contact.id)"
        >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import escapeStringRegexp from 'escape-string-regexp';
import * as API from '../utils/api.js';

export default {
  data: function () {
    return {
      contacts: [],
      showingContacts: [],
      query: ''
    };
  },
  created: function () {
    const vm = this;
    API.getAll().then(response => {
      vm.contacts = response.contacts;
      vm.showingContacts = response.contacts;
    });
  },
  watch: {
    query: function () {
      const match = new RegExp(escapeStringRegexp(this.query), 'i');
      this.showingContacts = this.contacts.filter(
        contact => match.test(contact.name)
      );
    }
  },
  methods: {
    removeContact: function (id) {
      this.contacts = this.contacts.filter(contact => contact.id !== id);
      this.showingContacts = this.contacts;
      API.remove(id);
    },
    showAll: function () {
      this.query = '';
    }
  }
};
</script>

<style scoped>
.contact-list-top {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #d5d8de;
}

.search-contact {
  padding: 20px 20px 20px 60px;
  width: 100%;
  border: 0;
  outline: 0;
  font-size: 1.2em;
  background-image: url(../icons/search.svg);
  background-repeat: no-repeat;
  -webkit-background-size: 1.2em;
  background-size: 1.2em;
  background-position: 20px center;
}

.add-contact {
  display: block;
  width: 73px;
  background-color: #fff;
  background-image: url(../icons/person-add.svg);
  background-repeat: no-repeat;
  -webkit-background-size: 28px;
  background-size: 28px;
  background-position: center;
}

.contact-list {
  padding-top: 60px;
}

.contact {
  margin: 20px 20px 0 20px;
  padding: 20px;
  display: flex;
  background-color: #fff;
  border: 1px solid #d5d8de;
  border-radius: 4px;
}

.contact-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
}

.contact-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  border-left: 1px solid #eee;
  flex: 1 1 auto;
}

.contact-remove {
  width: 32px;
  height: 32px;
  background-image: url(../icons/cancel.svg);
  border: 0;
  outline: 0;
  align-self: center;
  cursor: pointer;
}

.contact-count {
  margin: 20px 0;
  text-align: center;
}

.contact-count > button {
  color: #00f;
  background-color: transparent;
  font-size: inherit;
  border: 0;
  cursor: pointer;
}
</style>
