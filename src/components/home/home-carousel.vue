<template>
  <div class="h-carousel">
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
    >
      <router-link v-for="top in top_movie" :key="top.id" :to="'/detail/' + top.id">
        <b-carousel-slide
          :img-src="'https://image.tmdb.org/t/p/original/' + top.backdrop_path"
          :caption="top.title"
        ></b-carousel-slide>
      </router-link>
    </b-carousel>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      top_movie: [],
    };
  },
  methods: {
    get_topRated() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=f24e5ec36f06640f404b6d021fd4590c&language=en-US&page=1"
        )
        .then((top_list) => {
          for (let i = 0; i < 5; i++) {
            this.top_movie.push(top_list.data.results[i]);
          }
          console.log(this.top_movie);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.get_topRated();
  },
};
</script>

<style>
.h-carousel .img-fluid {
  height: 600px;
  object-fit: cover;
}

.h-carousel .carousel-indicators li {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>