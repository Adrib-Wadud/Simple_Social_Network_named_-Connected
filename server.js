const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')
const app = express();
const path = require('path')
connectDB();

const PORT = process.env.PORT || 5000;

// app.use(cors())
app.use(express.json())
app.use(cors())

//Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

//Serve static assets in prod

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, ()=>{
    console.log('Server started on port: ' + PORT);
});