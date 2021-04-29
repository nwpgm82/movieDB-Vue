<template>
  <div style="position: relative">
    <div class="loading">
      <b-spinner small label="Small Spinner"></b-spinner>
    </div>
    <div class="detail" v-if="after_get">
      <!-- {{ this.$route.params.id }}
      {{ detail.title }} -->
      <!-- <iframe width="100%" height="300" :src="'https://www.youtube.com/embed/'+video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
      <div class="cover-img">
        <img
          :src="'https://img.youtube.com/vi/' + video + '/maxresdefault.jpg'"
          alt="cover_img"
        />
        <div class="bg-icon" v-b-modal.modal-1>
          <b-icon icon="play-circle-fill" scale="6"></b-icon>
        </div>
        <b-modal
          id="modal-1"
          size="xl"
          modal-header-close
          hide-header
          hide-footer
        >
          <!-- <p class="my-4">Hello from modal!</p> -->
          <iframe
            width="100%"
            height="100%"
            :src="'https://www.youtube.com/embed/' + video"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </b-modal>
      </div>
      <b-container>
        <div class="detail-content">
          <div>
            <img
              :src="'https://image.tmdb.org/t/p/w200/' + detail.poster_path"
              alt="poster_path"
            />
            <div class="detail-main">
              <div>
                <h6>Original Title</h6>
                <p>{{ detail.original_title }}</p>
              </div>
              <div>
                <h6>Status</h6>
                <p>{{ detail.status }}</p>
              </div>
              <div>
                <h6>Original Language</h6>
                <p>{{ lang }}</p>
              </div>
              <div>
                <h6>Budget</h6>
                <p v-if="detail.budget != 0">$ {{ numberWithCommas(detail.budget) }}</p>
                <p v-else>-</p>
              </div>
              <div>
                <h6>Revenue</h6>
                <p v-if="detail.revenue != 0">$ {{ numberWithCommas(detail.revenue) }}</p>
                <p v-else>-</p>
              </div>
            </div>
          </div>
          <div>
            <h1>{{ detail.title }}</h1>
            <b-breadcrumb>
              <b-breadcrumb-item
                v-for="gen in genres"
                :key="gen.id"
                :to="'/category/' + gen.name"
                >{{ gen.name }}</b-breadcrumb-item
              >
            </b-breadcrumb>
            <div>

              
            </div>
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      after_get: false,
      detail: {},
      video: "",
      genres: {},
      lang: "",
    };
  },
  methods: {
    get_detail() {
      axios
        .all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=f24e5ec36f06640f404b6d021fd4590c&language=en-US`
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos?api_key=f24e5ec36f06640f404b6d021fd4590c&language=en-US`
          ),
          axios.get(
            "https://api.themoviedb.org/3/configuration/languages?api_key=f24e5ec36f06640f404b6d021fd4590c"
          ),
        ])
        .then((response) => {
          this.detail = response[0].data;
          this.video = response[1].data.results[0].key;
          this.genres = this.detail.genres;
          this.lang = response[2].data.filter(
            (el) => el.iso_639_1 === this.detail.original_language
          )[0].english_name;
          this.after_get = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  created() {
    this.get_detail();
  },
  mounted() {
    document.querySelector(".loading").style.opacity = 0;
    setTimeout(() => {
      document.querySelector(".loading").remove();
    }, 1000);
  },
};
</script>

<style>
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

.detail {
  padding-top: 56px;
}

.detail .cover-img {
  width: 100%;
  height: 300px;
  position: relative;
}

.detail .cover-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail .cover-img .bg-icon {
  width: 50px;
  height: 50px;
  /* border-radius: 50%; */
  background-color: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
}

.detail .cover-img .bg-icon svg {
  color: #fff;
  transition: 0.3s;
}

.detail .cover-img .bg-icon:hover {
  background-color: #fff;
}

.detail .cover-img .bg-icon:hover svg {
  color: #cc0000;
}

.detail .detail-content {
  position: relative;
  display: flex;
  /* align-items: flex-end; */
  column-gap: 32px;
  padding-top: 32px;
}

.detail .detail-content img {
  position: absolute;
  top: -120px;
  left: 0;
  border-radius: 4px;
}

.detail .detail-content > div:first-child {
  width: 200px;
}

.detail .detail-content .detail-main {
  margin-top: 180px;
  width: 100%;
  min-height: 500px;
  height: auto;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  padding: 16px;
  color: #fff;
}

.detail .detail-content .detail-main > div {
  line-height: 8px;
  padding-bottom: 16px;
}

.detail .detail-content .detail-main h6 {
  font-weight: bold;
}

.detail .detail-content .detail-main p {
  font-size: 14px;
}

div .modal-content {
  overflow: hidden;
  background-color: transparent;
}

div .modal-body {
  padding: 0;
  height: 650px;
}
</style>