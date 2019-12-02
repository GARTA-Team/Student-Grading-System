const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// var corsOptions = {
// 	origin: 'http://localhost:3000',
// 	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let userRouter= require("./routers/user-router");
let projectRouter= require("./routers/project-router");


app.use('/user-api',userRouter);
app.use('/project-api',projectRouter);



app.get('/api/hello', (req, res) => {
	console.log("received request");
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));

