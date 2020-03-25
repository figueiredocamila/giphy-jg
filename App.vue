<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            type="search"
            v-model="searchTerm"
            full-width
            @input="gifLimitVerification"
            label="Search"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-layout style="margin:10px " v-for="gif in gifs" :key="gif.id">
          <v-img :src="gif" />
        </v-layout>
      </v-row>

      <v-row class="text-center">
        <btn-search pa-2 type="button" title="..." @click.native="showMoreGifs" />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BtnSearch from "./components/shared/btnSearch/BtnSearch.vue";
import axios from "axios";

const apiKey = "dW9DGmODXonLrtZrSz0GyDNMS57ytHfA";
const searchEndPoint = "https://api.giphy.com/v1/gifs/search?";
const searchTrendingEndPoint = "https://api.giphy.com/v1/gifs/trending?";
const gifLimitDefault = 25;
let limit = gifLimitDefault;

export default {
  data: () => ({
    title: "Gif Searcher",
    searchTerm: "",
    gifs: [],
    searchType: "trending",
    gifStyle: ""
  }),

  components: {
    "btn-search": BtnSearch
  },

  created() {
    this.getTrendingGifs();
  },

  methods: {
    getTrendingGifs() {
      let url = `${searchTrendingEndPoint}&api_key=${apiKey}&limit=${limit}`;
      this.requestAPI(url);
    },

    searchGifs() {
      if (this.searchTerm) {
        window.setTimeout(this.getGifs(this.searchTerm), 2000);
      } else {
        this.getTrendingGifs();
        console.log(this.gifs);
      }
    },

    getGifs(searchTerm) {
      let url = `${searchEndPoint}&api_key=${apiKey}&q=${searchTerm}&limit=${limit}`;
      this.requestAPI(url);
    },

    gifLimitVerification() {
      if (limit > gifLimitDefault) {
        limit = gifLimitDefault;
      }

      this.searchGifs();
    },

    showMoreGifs() {
      limit += gifLimitDefault;
      this.searchGifs();
    },

    requestAPI(url) {
      axios
        .get(url)
        .then(json => {
          this.buildGifs(json);
        })
        .catch(err => {
          console.log(err);
        });
    },

    buildGifs(json) {
      this.gifs = json.data.data.map(gif => gif.images.fixed_height.url);
    }
  }
};
</script>

<style>
h1 {
  text-align: center;
  margin-top: 20px;
  font-family: Roboto;
}
</style>
