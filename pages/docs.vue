<template>

  <div id="mainDiv">

    <div id="sideNote">
      <a href="https://github.com/pwnsoni/marvel_quiz" target="_blank" v-b-tooltip.hover title="Visit github repo" id="git"><b-icon icon="github" aria-hidden="true" font-scale="1.5"></b-icon> </a>
    </div>

    <div id="head">
      <h1 id="topBarText"> <span> Marvel Quiz <b-link to="/"> <b-icon icon="house" aria-hidden="true" font-scale="1"></b-icon> </b-link></span>  </h1>
    </div>

    <div id="heading">
        Functional Docs
    </div>

    <div>
        <b-list-group>
        <b-list-group-item variant="success">Create / join a game with a username</b-list-group-item>
        <b-list-group-item variant="primary"> Make your friend join the same room with different username</b-list-group-item>
        <b-list-group-item variant="success"> Every time a player submits an answer, leaderboard on that particular player's screen will update.</b-list-group-item>
        </b-list-group>
        
    </div>
    <br/> <br/>
    <div id="heading">
        Technology Stack
    </div>

    <div>
        <b-list-group>
        <b-list-group-item variant="success"><strong> Nuxt </strong>: For front end</b-list-group-item>
        <b-list-group-item variant="primary"> <strong> Express </strong>: For back end</b-list-group-item>
        <b-list-group-item variant="success"> <strong>Redis Cloud</strong>: For Leaderboard</b-list-group-item>
        <b-list-group-item variant="primary"> <strong>AWS Lambda</strong>: For deployment</b-list-group-item>
        <b-list-group-item variant="success"> <strong> ioredis</strong>: Framework to connect with redis</b-list-group-item>
        </b-list-group>
        
    </div>

    <br/> <br/>

    <div id="heading">
        Technical Docs
    </div>

    <div>
        <b-list-group>
        <b-list-group-item variant="success">You can create or join a room.</b-list-group-item>
        <b-list-group-item variant="primary"> Five random questions from a predefined question set would be selected for a particular player, this is stored in a json file in server code itself.</b-list-group-item>
        <b-list-group-item variant="success">A redis key would be created when a player joins a room with score 0.</b-list-group-item>
        <b-list-group-item variant="primary"> Every time a user submits the answer, new score of that player would be added in the redis and leaderboard would alse be updated on that user's screen.</b-list-group-item>
        </b-list-group>
        
    </div>

  </div>
    
</template>

<script>
  export default {
    data() {
      return {
        form: {
          group: '',
          username: '',
        }
      }
    },

    methods: {
      async onSubmit(event) {
        event.preventDefault()
        await this.$store.dispatch('JOIN_ROOM', this.form);
      }
    }
  }
</script>

<style scoped>
  #mainDiv{
    padding: 10%;
    max-width: 100vw;
    min-height: 85vh;
  }

  #head{
    padding-bottom: 4%;
    justify-content: space-between;
    text-align: center;
    font-weight: 500;
  }

  #heading{
    font-size: 35px;
    padding-bottom: 4%;
    font-weight: 500;
  }

  #topBarText{
    font-size: 60px;
  }

  #sideNote{
    position: fixed;
    left: 30px;
    top: 50vh;
  }


    #git{
        transition: 0.5s;
    }

    #git:hover{
        color: teal;
        font-size: 20px;
    }

  @media screen and (max-width: 600px) {
      #heading{
        font-size: 25px;
        padding-bottom: 4%;
        font-weight: 500;
      }

    #topBarText{
        font-size: 40px;
    }
     #sideNote{
        position: relative;
        left: 10px;
        top: 5px;
    }
  }

</style>

