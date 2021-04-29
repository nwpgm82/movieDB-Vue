<template>
  <div class="movie">
    <b-container>
      <div>
        <div class="header">
          <h2>Upcoming Movie</h2>
          <router-link to="/upcoming">See more -></router-link>
        </div>
        <hr />
        <div class="movie-box">
          <div class="prev" v-on:click="up_prev">
            <b-icon icon="arrow-left-circle-fill" scale="3"></b-icon>
          </div>
          <div class="next" v-on:click="up_next">
            <b-icon icon="arrow-right-circle-fill" scale="3"></b-icon>
          </div>
          <div class="movie-list" id="up-list">
            <router-link
              v-for="up in up_movie"
              :key="up.id"
              :to="'/detail/' + up.id"
            >
              <b-card
                :img-src="'https://image.tmdb.org/t/p/w200/' + up.poster_path"
              >
                <div class="textbox-shadow">
                  <p>{{ up.title }}</p>
                </div>
              </b-card>
            </router-link>
          </div>
        </div>
      </div>
      <!--  -->
      <div>
        <div class="header">
          <h2>Now Playing</h2>
          <router-link to="/nowplaying">See more -></router-link>
        </div>
        <hr />
        <div class="movie-box">
          <div class="prev" v-on:click="now_prev">
            <b-icon icon="arrow-left-circle-fill" scale="3"></b-icon>
          </div>
          <div class="next" v-on:click="now_next">
            <b-icon icon="arrow-right-circle-fill" scale="3"></b-icon>
          </div>
          <div class="movie-list" id="now-list">
            <router-link
              v-for="now in now_movie"
              :key="now.id"
              :to="'/detail/' + now.id"
            >
              <b-card
                :img-src="'https://image.tmdb.org/t/p/w200/' + now.poster_path"
              >
                <div class="textbox-shadow">
                  <p>{{ now.title }}</p>
                </div>
              </b-card>
            </router-link>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      up_movie: [],
      now_movie: [],
    };
  },
  methods: {
    get_upcoming() {
      axios
        .all([
          axios.get(
            "https://api.themoviedb.org/3/movie/upcoming?api_key=f24e5ec36f06640f404b6d021fd4590c&language=en-US&page=1"
          ),
          axios.get(
            "https://api.themoviedb.org/3/movie/now_playing?api_key=f24e5ec36f06640f404b6d021fd4590c&language=en-US&page=1"
          ),
        ])
        .then((movie_list) => {
          for (let i = 0; i < 10; i++) {
            this.up_movie.push(movie_list[0].data.results[i]);
            this.now_movie.push(movie_list[1].data.results[i]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    up_prev() {
      document.querySelector("#up-list").scrollLeft -= 400;
    },
    up_next() {
      document.querySelector("#up-list").scrollLeft += 400;
    },
    now_prev() {
      document.querySelector("#now-list").scrollLeft -= 400;
    },
    now_next() {
      document.querySelector("#now-list").scrollLeft += 400;
    },
  },
  created() {
    this.get_upcoming();
  },
};
</script>

<style>
.movie {
  padding-top: 32px;
}

.movie > div > div:not(:first-child) {
  padding-top: 32px;
}

.movie .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.movie hr {
  margin-top: 0;
}

.movie .movie-box {
  position: relative;
}

.movie .movie-box .prev,
.movie .movie-box .next {
  background-color: #fff;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  cursor: pointer;
}

.movie .movie-box .prev svg,
.movie .movie-box .next svg {
  transition: 0.3s;
}

.movie .movie-box .prev {
  position: absolute;
  top: 50%;
  left: -24px;
  transform: translateY(-50%);
}

.movie .movie-box .next {
  position: absolute;
  top: 50%;
  right: -24px;
  transform: translateY(-50%);
}

.movie .movie-box .prev:hover svg,
.movie .movie-box .next:hover svg {
  transform: scale(1.1);
}

.movie .movie-box .movie-list {
  width: 100%;
  padding: 8px 0;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  line-height: 0;
}

.movie .movie-box .movie-list a{
  width: 200px;
  height: 300px;
  display: inline-block;
  margin: 16px 8px;
}

.movie .movie-box .movie-list .card {
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 0.3s;
  cursor: pointer;
  position: relative;
  border: none;
}

.movie .movie-box .movie-list .card .textbox-shadow {
  width: 100%;
  height: 150px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-shadow: inset 0 -80px 30px -10px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: inset 0 -80px 30px -10px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: inset 0 -80px 30px -10px rgba(0, 0, 0, 0.8);
  opacity: 0;
  transition: 0.3s;
}

.movie .movie-box .movie-list .card .textbox-shadow p {
  width: 160px;
  color: #fff;
  text-align: center;
  white-space: normal;
  word-break: break-all;
  line-height: 20px;
}

.movie .movie-box .movie-list .card:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);
}

.movie .movie-box .movie-list .card:hover .textbox-shadow {
  opacity: 1;
}

.movie .movie-box .movie-list .card .card-body {
  padding: 0;
}

.movie .movie-box .movie-list .card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}
</style>