const questions = require('./questions.json');

const addScore = async (req, res) => {
    console.log(`Body in /addScore: ${JSON.stringify(req.body)}`);

    const {question, selected} = req.body;

    questions.forEach(element => {
        // console.log(element.question, question.question)
        if (element.question === question.question){
            console.log(selected, element.correct)
            if (selected === element.correct){
                console.log('correct answer');
                console.log('Update the redis leaderbard');
                res.send({score: 1});
            } else{
                console.log('wrong answer');
                console.log('update redis leaderbodard');
                res.send({score: 0});
            }
        }
    })


    // res.send({"status": 201, "message": "Saved in redis"});
}

const getLeaderBoard = async (req, res) => {
    console.log(`Body in /getLeaderBoard: ${JSON.stringify(req.body)}`);
    res.send({"status": 201, "message": "returned from redis"});
}

const joinRoom = async (req, res) => {
    let leaderBoard = [{status: 201, message: 'I am leaderboard'}];
    console.log('Joining the player in the room');
    res.send({status: 201, leaderBoard, roomInfo: {"status": 201, "message": "returned from redis"}});
}

module.exports = {addScore, getLeaderBoard, joinRoom}