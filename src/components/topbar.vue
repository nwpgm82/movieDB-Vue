<template>
  <div class="topbar">
    <b-navbar toggleable="md" type="dark">
      <b-container fluid="xl">
        <b-navbar-brand href="#"
          ><img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="logo"
            width="154"
            height="20"
        /></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/all">Movie</b-nav-item>
            <b-nav-item-dropdown text="Category">
                <b-dropdown-item v-for="cate in cat.genres" :key="cate.id" :to="'/category/'+cate.name">{{cate.name}}</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input
                class="mr-sm-2"
                placeholder="ค้นหาชื่อภาพยนตร์"
                size="sm"
              ></b-form-input>
              <b-button class="my-2 my-sm-0" variant="info" size="sm"><b-icon icon="search"></b-icon> ค้นหา</b-button>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data(){
    return{
      cat: {}
    }
  },
  methods: {
      getCat(){
          axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=f24e5ec36f06640f404b6d021fd4590c&language=en-US")
          .then((response) => {
            this.cat = response.data
          })
          .catch((error) =>{
            console.log(error);
          })
      }
  },
  created(){
    this.getCat()
  }
};
</script>

<style>
.topbar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
}

.topbar nav {
  background-color: #032541;
}

.topbar .navbar-dark .navbar-nav .nav-link{
  color: #fff;
}

.topbar a a{
  color: #000;
}

.topbar a a:hover{
  text-decoration: none;
}

.topbar .navbar-nav .dropdown-menu{
  height: 300px;
  overflow-y: auto;
}
</style>