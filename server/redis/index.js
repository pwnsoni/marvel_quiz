const questions = require('./questions.json');
const {getLeaderBoardTops, addScoreInRoom} = require('./util');

const addScore = async (req, res) => {
    console.log(`Body in /addScore: ${JSON.stringify(req.body)}`);

    let {question, selected, score, room, username} = req.body;

    questions.forEach(async element => {
        // console.log(element.question, question.question)
        if (element.question === question.question){
            console.log(selected, element.correct)
            if (selected === element.correct){
                score++;
                console.log('correct answer');
                console.log('Update the redis leaderbard');
                const response = await addScoreInRoom(room, username, score);
                
                
                res.send({score});
            } else{
                console.log('wrong answer');
                console.log('update redis leaderbodard');
                const response = await addScoreInRoom(room, username, score)
                console.log(response)
                res.send({score});
            }
        }
    })

}

const getLeaderBoard = async (req, res) => {
    console.log(`Body in /getLeaderBoard: ${JSON.stringify(req.body)}`);
    const {room, top} = req.body;
    const lb = await getLeaderBoardTops(room, top);
    res.send({"status": 201, leaderBoard: lb});
}

const joinRoom = async (req, res) => {
    const {room, username, score} = req.body;
    console.log(room, username, score);
    let leaderBoard = [{status: 201, message: 'I am leaderboard'}];
    const response = await addScoreInRoom(room, username, score);
    console.log('Joining the player in the room', response);
    res.send({status: 201, leaderBoard, roomInfo: {"status": 201, "message": "returned from redis"}});
}

module.exports = {addScore, getLeaderBoard, joinRoom}