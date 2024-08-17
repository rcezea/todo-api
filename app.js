import dbClient from "./db.js";

class App {
  static async newTodo(req, res) {
    const userid = req.user.id;
    const { task } = req.body;

    await dbClient.newTask(userid, task);
    return res.status(201).json({message: "New task added"});
  }
  static async allTodo(req, res) {
    const userid = req.user.id;

    const tasks = await dbClient.getAllTasks(userid);
    return res.status(200).json({ tasks });
  }
  static async updateTodo(req, res) {
    const id = Number(req.body.task_id);

    const result = await dbClient.updateTask(id);
    if (result.rowCount === 0) return res.status(400).json({error: "An error occurred"});
    return res.status(200).json({message: "Task updated"});
  }
  static async delTodo(req, res) {
    const id = Number(req.body.task_id);

    const result = await dbClient.deleteTask(id);
    if (result.rowCount === 0) return res.status(400).json({error: "An error occurred"});
    return res.status(200).json({message: "Task deleted"});
  }
}

export default App;