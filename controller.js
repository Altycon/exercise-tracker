const { validationResult } = require('express-validator');
const User = require('./model');

require('dotenv').config();

module.exports.getHomePage = function(request,response){

    response.sendFile(__dirname + '/views/index.html');

};

module.exports.getUsers = async function(request,response){

    try{
        const userCursor = User.find().cursor();

        const users = [];

        await userCursor.eachAsync( (user)=> {
            users.push({
                username: user.username,
                _id: user._id
            });
        });

        if(users.length === 0){
            return response.status(500).send('There are no users to show at this time. Become one!')
        }

        response.json(users);

    }catch(error){
        console.log(error);

        response.status(500).send('Error occured getting all users. Please try again.');
    }
};

module.exports.addUser = async function(request,response){

    const validationErrors = validationResult(request);
    if(!validationErrors.isEmpty()){
        return response.status(500).send(validationErrors)
    }

    const { username } = request.body;

    try{

        const _id = (Math.floor(Math.random() * 10000)).toString();

        const newUser = new User({
            username: username,
            _id: _id
        });

        const user = await newUser.save();

        response.json({
            username: user.username,
            _id: +_id
        });

    }catch(error){
        console.log(error);

        response.status(500).send('Error occured creating user. Please try again');
    }
};

module.exports.addExercise = async function(request,response){

    const { _id } = request.params;

    const { description, duration, date } = request.body;

    let newDate, newExerciseDate;

    if(!date || date === ""){

        newDate = new Date();

        newExerciseDate = newDate.toDateString();

    }else{

        newDate = new Date(date);

        newExerciseDate = newDate.toDateString();
    }

    try{

        const userFound = await User.find({ _id });

        if(!userFound || userFound.length === 0){

            return response.status(500).send('User does not exist. Please try again.');

        }

        const exerciseId = Math.floor(Math.random() * 1000);

        const user = userFound[0];

        console.log('user', user)

        user.log.push({
            description: description,
            duration: Number(duration),
            date: newExerciseDate,
            _id: exerciseId
        });
        
        await user.save();

        response.json({
            username: user.username,
            description: description,
            duration: duration,
            date: newExerciseDate,
            _id: _id
        });

    }catch(error){

        response.status(500).send('Error occured adding exercise. Please try again.');

    }
};

function parseUserLogData(userLog,options){
  
    const newLogData = [];

    if(userLog.length > 0){

        const sorted = userLog.sort( (a,b)=> {
            const aDate = new Date(a.date);
            const aTime = aDate.getTime();
            
            const bDate = new Date(b.date);
            const bTime = bDate.getTime();
    
            return aTime - bTime;
        });

        let start = 0;
        let end = sorted.length;
        let limit = 0;
        let counter = 0;

        if(options.limit){
            limit = options.limit;
        }

        if(options.from){
            const fromDate = new Date(options.from);
            const from = fromDate.toDateString();

            sorted.forEach( (log,index) => {

                    if(log.date.includes(from)){
                        start = index;
                    }
            });
        }
        if(options.to){
            const toDate = new Date(options.to);
            const to = toDate.toDateString();

            sorted.forEach( (log,index) => {

                    if(log.date.includes(to)){
                        end = index+1;
                    }
            });
        }

        for(let i = start; i < end; i++){

            newLogData.push({
                description: userLog[i].description,
                duration: userLog[i].duration,
                date: userLog[i].date
            });

            if(options.limit){
                counter++;
                if(counter >= limit) break;
            }
        }
    }

    return newLogData;
};

module.exports.getUserLogs = async function(request,response){

    const { _id } = request.params;
    const { from, to, limit } = request.query;

    const options = {
        from: from ? from:false,
        to: to ? to:false,
        limit: limit ? Number(limit):false
    }

    try{
        const userFound = await User.find({ _id })

        if(!userFound || userFound.length === 0){

            return response.send('User does not exist. Please try again.');
        }

        const user = userFound[0];

        const userLog = parseUserLogData(user.log, options);

        response.json({ 
            username: user.username,
            count: userLog.length,
            log: userLog
        });

    }catch(error){
        console.log(error);

        response.status(500).send('Error occured get user logs. Please try again.')
    }
};

module.exports.deleteUser = async function(request,response){

    const { _id } = request.params;
    
    try{
        const userExists = await User.exists({ _id });
        
        if(!userExists){
            return response.send('No user exists to delete.')
        }

        const user = await User.find({ _id });
        
        await User.deleteOne({ _id });

        response.send(`User ${user[0].username} with id: ${user[0]._id} has been deleted. Thank you playing...`)

    }catch{
        response.send('There was an error deleting user. Please try again.')
    }
};