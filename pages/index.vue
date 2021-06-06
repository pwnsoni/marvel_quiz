<template>

  <div id="mainDiv">
    <div>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="9"
        description="Room name"
        label="Create or Join game"
        label-for="input-horizontal"
      >
        <b-form-input id="input-horizontal" v-model="form.group"></b-form-input>
      </b-form-group>
    </div>

     <div>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="9"
        description="Let us know your name."
        label="username"
        label-for="input-horizontal"
      >
        <b-form-input id="input-horizontal" v-model="form.username"></b-form-input>
      </b-form-group>
    </div>
    <b-button type="submit" @click="onSubmit" block variant="primary">Block Level Button</b-button>

  </div>
    
</template>

<script>
  export default {
    data() {
      return {
        form: {
          group: '',
          username: '',
        },
        // foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        // show: true
      }
    },

    // computed: {
    //   cron () {
    //     return this.$store.state.cron;
    //   },
    //   sns (){
    //     return this.$store.state.snsGroup;
    //   },
    //   watch(){
    //     return this.$store.state.watch;
    //   },
    //   hit(){
    //     return this.$store.state.lastHit;
    //   }
    // },
    methods: {
      async onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form));
        await this.$store.dispatch('JOIN_ROOM', this.form);
      }
    }
  }
</script>

<style scoped>
  #mainDiv{
    padding: 10%;
    min-width: 80vw;
    min-height: 80vh;
  }
</style>

