<template>
    <div id="mainDiv">

      <div id="topBar">
        <h2 id="topBarText"> 
        <span> <b-icon icon="person" scale="1" ></b-icon> {{username}} </span> 
        <span @click="leaveGame()" id="leave" v-b-tooltip.hover title="Leave game!!"> <b-icon icon="house-fill" aria-hidden="true" scale="1"></b-icon> </span>
        <span>  <b-icon icon="geo-alt-fill" scale="1" ></b-icon> {{room}} </span>  </h2>
        <h3> <span v-b-tooltip.hover title="Question Number"> <b-icon icon="question-square" scale="1" ></b-icon> {{questionNumber}} </span> </h3>
      </div>

      <div id = "belowBar">

        

        <div id="question">

          <div id="questionDesc"> 
            <h1 id="questionDescText"> {{question.question}} </h1>
          </div>

          <div id="options" >
            <b-form-group label="" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                v-model="selected"
                :options="question.options"
                :aria-describedby="ariaDescribedby"
                name="radios-stacked"
                
              ></b-form-radio-group>
            </b-form-group>
          </div>

        <!-- <span v-if="loading" id="selected"> <b-icon icon="three-dots" animation="cylon" font-scale="4" ></b-icon> </span> -->
        <div id="selected">
          <span  v-if="!loading"> Selected: {{selected}} <span v-b-tooltip.hover title="Submit Answer"> <b-icon icon="caret-right-square" @click="submitAnswer(selected)" scale="3" id="nextButton" ></b-icon> </span> </span>
          <span v-if="loading"> <b-icon icon="three-dots" animation="cylon" font-scale="4" ></b-icon> </span>
          </div>
        

        </div>
          <div id ="leaderBoard">
          <h4> Leaderboard </h4>
          <b-table striped hover :items="leaderBoard"></b-table>
        </div>

      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          creater: '',
          name: '',
          cronStatement: '',
          description: '',
          recipients: ''
        },
        spinning: false,
        isEditing: true,
        spinningInModal: false,
        selected: 'none',
        loading: false
        }
    },


    async mounted(){
      if (!this.$store.state.isActiveSession){
        this.$router.push('/');
      } else{
        await this.$store.dispatch('GET_LEADERBOARD');
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
      question (){
        return this.$store.state.question;
      },
      questionNumber (){
        return this.$store.state.questionNumber;
      },
      leaderBoard (){
        return this.$store.state.leaderBoard;
      }
    },

    methods: {

      async onSubmit(event) {
        event.preventDefault()
        this.makeToast(true, "Saved the snsGroup in DB", responseSnsGroup.data.result._id);
      },
      async submitAnswer(selected){
        this.loading = true;
        await this.$store.dispatch('SUBMIT_THIS_QUESTION', {selected});
        this.loading = false;
        await this.$store.dispatch('GET_LEADERBOARD')
      },
      async leaveGame(){
        if(confirm(`You really wanna leave the battle ${this.username} !!`)){
          await this.$store.dispatch('LEAVE_THE_GAME');
        }
      },

      makeToast(append = false, title, _id) {
        this.$bvToast.toast(`Id : ${_id}`, {
          title: title,
          autoHideDelay: 5000,
          appendToast: append
        })
      }
    } 
  }
</script>

<style scoped>
#mainDiv{
  min-width: 100vw;
  /* min-height: 85vh; */
  background: rgb(220, 247, 248);
}

#leave{
  transition: 0.5s;
}

#leave:hover{
  color: rgba(235, 174, 6, 0.493);
}

#belowBar{
    width: 100vw;
    max-width: 100vw;
    display: flex;
}

#leaderBoard{
    flex: 1;
    float: right;
    /* background: red; */
    max-height: 50vh;
    min-height: 50vh;
    max-width: 35vw;
    padding-left: 3vw;
    padding: 2vw;
    transition: 0.5s;
    overflow-y: auto
}

#leaderBoard:hover{
  /* background: rgb(233, 249, 250); */
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.1);
}

#options, h4{
  /* font-size: x-large; */
  /* margin-left: 45vw; */

  text-align: center;
}

#questionDesc{
  padding: 2%;
  padding-left: 0;
  text-align: center;
}

#selected{
  /* padding: 2%; */
  text-align: center;
  padding-right: 4%;
}

#questionDescText{
  font-size: 3vw;
  padding-top: 25px;
}

#nextButton{
  text-align: center;
  align-content: center;
  color: rgb(19, 32, 32);
  padding-left: 3%;
}

#topBar{
  min-width: 100vw;
  min-height: 30vh;
  background: rgb(19, 32, 32);
  color: rgb(220, 247, 248);
}

#question{
  color: rgb(19, 32, 32);
  min-width: 60vw;
  float: left;
  margin-left: 0;
  /* background: rosybrown; */
  transition: 0.5s;
  /* padding-left: 1px; */
}

#question:hover{
  /* background: rgb(233, 249, 250); */
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.1);
}

h3{
  text-align: right;
  padding-right: 7%;
  padding-bottom: 3%;
}



#topBarText{
  padding: 7%;
  padding-bottom: 4%;
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
  #selected{
  /* padding: 2%; */
  text-align: center;
  padding-right: 4%;
  font-size: 20px;
}

}
</style>