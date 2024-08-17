import express from 'express';
import AuthController from './auth.js';
import App from './app.js';
import redisClient from "./redis.js";
import dbClient from "./db.js";
const app = express();

app.use(express.urlencoded({ extended: true }));

function handleUnauthorized(res) {
  return res.status(401).json({ error: 'Unauthorized' });
}

async function authenticateToken(req, res, next) {
  const userId = await redisClient.get(`auth_${req.headers['x-token']}`);
  if (!userId) return handleUnauthorized(res);

  const user = await dbClient.findUserById(userId);
  if (!user) return handleUnauthorized(res);

  req.user = user;

  next();
}

app.post('/register', AuthController.register);
app.post('/connect', AuthController.connect);
app.delete('/disconnect', authenticateToken, AuthController.disconnect);

app.get('/todos', authenticateToken, App.allTodo);
app.post('/todo', authenticateToken, App.newTodo);
app.put('/todo', authenticateToken, App.updateTodo);
app.delete('/todo', authenticateToken, App.delTodo);

app.listen(3000, () => console.log("Listening on port 3000"));
