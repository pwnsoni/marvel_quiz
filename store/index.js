export const state = () => ({
    isActiveSession: false,
    room: '',
    username: '',
    score: 0,
    questions: [],
    question: {},
    questionNumber: 0,
    leaderBoard: []
  })
  
export const mutations = {
    initiateSession(state, responses){
        state.cron = responses.cron;
        state.isActiveSession = true;
        state.activeCron = responses.cron.name;
        state.watch = responses.cron.cloudWatchEventUUID? true : false
        this.$router.push('/dashboard/' + responses.cron._id);
    },
    toggle_watch(state, response){
        state.watch = response;
    },
    updateCron(state, cron){
        state.cron = cron;
    },
    getSns(state, sns){
        state.snsGroup = sns;
    },
    getLastHit(state, lastHit){
        state.lastHit = lastHit;
    },
    validateAxiosResponse(state, response){
        console.log(response.status);
        if (response.status !== 201){
            alert(`Axios Error: ${response.errorMessage}`);
        }
    },
    makeToast(append = false, title, code, vm) {
        vm.$bvToast.toast(`Id : ${code}`, {
          title: title,
          autoHideDelay: 5000,
          appendToast: append
        })
    },

    nextQuestion(state){
        // alert(state.questions.length)
        console.log(state.questions)
        console.log(state.questions.length)
        if (state.questionNumber === state.questions.length){
            this.$router.push('/result');
        } else {
            state.questionNumber += 1;
            state.question = state.questions[state.questionNumber - 1];
        }
    },

    increaseScore(state){
        state.score += 1;
    },

    updateLeaderBoard(state, form){
        state.leaderBoard =form
    },

    joinroom(state, form){
        state.room = form.group;
        state.username = form.username;
        state.score = 0;
        state.isActiveSession = true;
        state.questions = form.questions
        state.questionNumber = 1;
        state.leaderBoard = [{status: 201, message: 'I am leaderboard'}]
        state.question = state.questions[state.questionNumber - 1];
        this.$router.push('/play');
    }
}

export const actions = {

    async JOIN_ROOM({commit}, form){
        console.log('in store', form);
        let response = await this.$axios.$post('/api/joinRoom', form);
        console.log(response);
        let questions = await this.$axios.get('/api/questions');
        console.log(questions.data)
        form.questions = questions.data.questions;
        commit('validateAxiosResponse', response);
        commit('joinroom', form);
    },

    async SUBMIT_THIS_QUESTION({commit, state}, response){
        console.log(response);
        let sc = await this.$axios.post('/api/addScore', {selected: response.selected, question: state.question ,score: state.score});
        if (sc.data.score){
            commit('increaseScore')
        } else{
        }
        commit('nextQuestion');
    },

    async GET_LEADERBOARD_TOPPERS({commit}, room){
        console.log('in store', room);
        let body = {room, top: 10};
        let response = await this.$axios.$post('/api/getLeaderBoard', body);
        console.log(response);
        commit('validateAxiosResponse', response);
        commit('updateLeaderBoardToppers', {response});
    },

    async GET_LEADERBOARD({commit, state}){
        console.log('in store GET_LEADERBOARD');
        let body = {room: state.room, top: -1};
        let response = await this.$axios.$post('/api/leaderBoard', body);
        console.log(response, 'in GET_LEADERBOARD');
        commit('validateAxiosResponse', response);
        commit('updateLeaderBoard', {response});
    },

    async INITIATE_SESSION({commit}, {cron_id}){
        console.log('in store', cron_id);
        let cron = await this.$axios.$get('/api/cron/' + cron_id);
        console.log(cron);
        commit('validateAxiosResult', {status: cron.status});
        commit('initiateSession', {cron: cron.result});
    },

    async GET_SNS({commit, state}){
        let snsGroup = await this.$axios.$get('/api/snsGroup/' + state.cron.snsGroup);
        console.log('sns', snsGroup.result);
        commit('getSns', snsGroup.result)
    },

    


    async GET_LAST_HIT({commit, state}){
        console.log('in GET_LAST_HIT')
        let lastHit = await this.$axios.$get('/api/hit/' + state.cron.lastHits);
        console.log('sns', lastHit.result);
        commit('getLastHit', lastHit.result)
    },

    async RESET_SESSION({commit}){
        commit('resetSession');
    },

    async UPDATE_CRON({commit}, {changes}){
        console.log('in store', cron_id);
        let cron = await this.$axios.$put('/api/cron/' + cron_id, changes);
        commit('updateCron', cron.result);
    },

    async TOGGLE_WATCH({commit, state}, {vm}){
        console.log(`before if ${state.watch}`)
        if (state.watch){
            console.log(`toggling in store if true ${state.watch}`)
            let res = await this.$axios.post('/api/invoke', {
                "event": {
                    "ruleName": `rule_${state.cron._id}`,
                    "targetId": `target_${state.cron._id}`
                },
                "lambdaName": "cron-checker-services-dev-removeRule",
            })
            console.log(JSON.stringify(res));
            commit('validateAxiosResult', {status: res.data.statusCode, vm});
            if (res.data.statusCode === 201){
                commit('toggle_watch', false)
                let cron = await this.$axios.$put('/api/cron/' + state.cron._id, {cloudWatchEventUUID: null});
                commit('updateCron', cron.result);
            }
        } else{

            console.log(`toggling in store if false ${state.watch}`)
            let res = await this.$axios.post('/api/invoke', {
                "event": {
                    "ruleName": `rule_${state.cron._id}`,
                    "ruleExpression": state.cron.cronStatement,
                    "targetId": `target_${state.cron._id}`,
                    "input": {"cron": state.cron._id, "sns": state.cron.snsGroup, "lastHit": state.cron.lastHits}
                },
                "lambdaName": "cron-checker-services-dev-createandmapRule",
            })
            console.log(JSON.stringify(res));
            commit('validateAxiosResult', {status: res.data.statusCode, vm});
            if (res.data.statusCode === 201){
                commit('toggle_watch', true)
                let cron = await this.$axios.$put('/api/cron/' + state.cron._id, {cloudWatchEventUUID: `rule_${state.cron._id}`});
                commit('updateCron', cron.result);
            }
        }

    }
}