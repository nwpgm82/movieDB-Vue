<template>
  <div class="home">
    <div class="loading">
      <b-spinner small label="Small Spinner"></b-spinner>
    </div>
    <homeCarousel />
    <movieList />
  </div>
</template>

<script>
import homeCarousel from "@/components/home/home-carousel";
import movieList from "@/components/home/movie-list";
export default {
  name: "Home",
  components: {
    homeCarousel,
    movieList,
  },
  mounted() {
    document.querySelector(".loading").style.opacity = 0;
    setTimeout(() => {
      document.querySelector(".loading").remove();
    }, 1000);
  },
};
</script>
<style scoped>
.home {
  /* padding-top: 56px; */
  position: relative;
}
.loading {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  z-index: 999;
  opacity: 1;
  transition: 1s;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 16px;
}
</style>
