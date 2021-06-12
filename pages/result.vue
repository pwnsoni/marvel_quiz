<template>
    <div id="mainDiv">

     <div id="topBar">
        <h2 id="topBarText"> 
        <span> <b-icon icon="person" scale="1" ></b-icon> {{username}} </span> 
        <span @click="leaveGame()" id="leave" v-b-tooltip.hover title="Go to homepage"> <b-icon icon="house-fill" aria-hidden="true" scale="1"></b-icon> </span>
        <span>  <b-icon icon="geo-alt-fill" scale="1" ></b-icon> {{room}} </span>  </h2>
      </div>

      <div id = "score">

        <h1> Score: {{score}} / {{questionNumber}} </h1>

      </div>

      <div id ="leaderBoard">
          <h3> Leaderboard </h3>
          <b-table striped hover :items="leaderBoard"></b-table>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },


    mounted(){
      if (!this.$store.state.isActiveSession){
        this.$router.push('/');
      } else if (this.$store.state.isActiveSession && this.$store.state.questionNumber !== this.$store.state.questions.length) {
          alert('Please complete the game first!!');
          this.$router.push('/play');
      }
    },
    
    computed: {
      room () {
        return this.$store.state.room;
      },
      username (){
        return this.$store.state.username;
      },
      score (){
        return this.$store.state.score;
      },
      questionNumber (){
        return this.$store.state.questionNumber;
      },
      leaderBoard (){
        return this.$store.state.leaderBoard;
      }
    },
    methods: {
      async leaveGame(){
        await this.$store.dispatch('LEAVE_THE_GAME');
      
      }
    }
  }
</script>

<style scoped>
#mainDiv{
  min-width: 100vw;
  min-height: 80vh;
  background: rgb(220, 247, 248);
}

#leaderBoard{
    flex: 1;
    text-align: center;
    /* background: red; */
    min-height: 40vh;
    /* max-width: 80vw; */
    padding: 5vw;
    padding-top: 1vw;
    padding-bottom: 1vw;
    
}



h1{
  text-align: center;
  color: rgb(19, 32, 32);
  padding-top: 5%;
}


#topBar{
  min-width: 100vw;
  min-height: 30vh;
  background: rgb(19, 32, 32);
  color: rgb(220, 247, 248);
}

#topBarText{
  padding: 7%;
  justify-content: space-between;
  display: flex;
}


@media screen and (max-width: 600px) {
  #leaderBoard{
    display: unset;
    justify-content: unset;
    float: unset;
    min-height: 30px;
    max-width: 35vw;
    padding-left: 3vw;
    padding: 2vw;
    transition: 0.5s;
    height: 40px;
    overflow-y: auto;
  }


  #topBarText{
    font-size: 25px;
  }

  #belowBar{
    display: unset;
  }

  #question{
    color: rgb(19, 32, 32);
    min-width: 70vw;
    float: unset;
    margin: 20px;
    padding-bottom: 20px;
    /* background: rosybrown; */
    transition: 0.5s;
    /* padding-left: 1px; */
  }

  h3{
    font-size: 20px;
  }

  #questionDesc{
    padding: 2%;
    /* padding-left: 0; */
    text-align: center;
  }

  #questionDescText{
    font-size: 30px;
  }

}
</style>