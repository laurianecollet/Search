<template>
  <div class="hello">
    <h2>Hello</h2>
    <input v-model="search" @keyup="rechercher()"></input>
    <ul>
      <li v-for="post in posts">{{post.title}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        posts: [],
        search: ''
      }
    },
    created() {
      this.$http.get('http://localhost:3000/').then((res) => {
        this.posts = res.body;
      });
    },
    methods: {
      rechercher() {
        this.$http.get(`http://localhost:3000/search/${this.search}`).then((res) => {
          this.posts = res.body;
        });
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>