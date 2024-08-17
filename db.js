import pkg from 'pg';
import {createTables} from "./schemas.js";

const { Client } = pkg;

class DBClient {
  constructor() {
    this.db = new Client({
      database: 'todo',
    });

    this.db.connect()
      .catch(err => console.error('Connection error', err.stack));

    try {
      this.db.query(createTables);
    } catch (err) {
      console.error('Error creating users table', err.stack);
    }
  }

  async newUser(email, password) {
    try {
      const user = await this.db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id', [email, password]);
      return user.rows[0].id;
    } catch (err) {
      console.error('Error creating user:', err.stack);
      return null;
    }
  }

  async findUserByEmail(email) {
    try {
      const result = await this.db.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0];
    } catch (err) {
      console.error('Error finding user by email:', err.stack);
      return null;
    }
  }

  async findUserById(id) {
    try {
      const result = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Error finding user by id:', err.stack);
      return null;
    }
  }

  async newTask(id, task) {
    try {
      await this.db.query('INSERT INTO todos (user_id, title) VALUES ($1, $2)', [id, task]);
    } catch (err) {
      console.error(err.stack);
    }
  }

  async getAllTasks(id) {
    try {
      const tasks = await this.db.query('SELECT * FROM todos WHERE user_id = $1 ORDER BY id DESC', [id]);
      return tasks.rows;
    } catch (err) {
      console.error(err.stack);
    }
  }

  async updateTask(id) {
    try {
      return await this.db.query('UPDATE todos SET completed = $1 WHERE id = $2 RETURNING id', [true, id]);
    } catch (err) {
      console.error(err.stack);
    }
  }

  async deleteTask(id) {
    try {
      return await this.db.query('DELETE FROM todos WHERE id = $1', [id]);
    } catch (err) {
      console.error(err.stack);
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
