import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

// route
app.all('/', (req, res) => {
  // console.log('request received',req);
  // console.log('response send',res);
  res.send('I am up!');
});
const todos = [{
  id:1,
  title:'task 1',
  done: false
},
{
  id:2,
  title:'task 2',
  done: true
}]

//read
app.get('/todos',(req,res)=>{
res.json(todos)
})

//create
app.post('/todos',(req,res)=>{
const newTodos = req.body;
todos.push(newTodos);
res.json({
  message: 'new todos added!'
})
})

//update
app.put("/todos/:id", (req, res) => {
  const newTodoData = req.body;
  const todoParamId = Number(req.params.id); // make sure it's a number
  const todoIndx = todos.findIndex((td) => td.id === todoParamId);

  if (todoIndx !== -1) {
    todos[todoIndx] = {
      id: todoParamId,
      ...newTodoData,
    };
    return res.json({
      message: "Todo updated successfully!",
      todo: todos[todoIndx],
    });
  }

  // if not found
  res.status(404).json({ error: "Todo not found" });
});

//delete

app.delete('/todos/:id', (req,res)=>{
  const todoParamId = Number(req.params.id); // make sure it's a number
  const todoIndx = todos.findIndex((td) => td.id === todoParamId);

  if (todoIndx !== -1) {
   todos.splice(todoIndx,1);
     res.json({
      message: "Todo deleted successfully!"
    });
  }

  // if not found
  res.status(404).json({ error: "Todo not found" });
})


// define port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
