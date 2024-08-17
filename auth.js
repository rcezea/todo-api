import sha1 from 'sha1';
import dbClient from "./db.js";
import redisClient from './redis.js';
import { v4 as uuidv4 } from 'uuid';

class AuthController {

  static async register(req, res) {
    const { email, password } = req.body;
    const passwordHash = sha1(password);

    const userExists = await dbClient.findUserByEmail(email);
    if (userExists) return res.status(400).json({ error: "User exists already" });

    const user = await dbClient.newUser(email, passwordHash);
    if (user) return res.status(500).json({ error: 'Internal Server Error' });

    return res.status(201).json({ id: user, email });
  }

  static async connect(req, res) {
    try {
      const { email, password } = req.body;
      const passwordHash = sha1(password);

      const user = await dbClient.findUserByEmail(email);
      if (!user || user.password !== passwordHash) return handleUnauthorized(res);

      const token = uuidv4();
      const key = `auth_${token}`;
      const value = user.id.toString();
      await redisClient.set(key, value, 86400);

      return res.status(200).json({ token });
    } catch (error) {
      console.error('Error in connect:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async disconnect(req, res) {
    try {
      await redisClient.del(`auth_${req.headers['x-token']}`);
      return res.status(204).end();
    } catch (error) {
      console.error('Error in disconnect:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
function handleUnauthorized(res) {
  return res.status(401).json({ error: 'Unauthorized' });
}

export default AuthController;
