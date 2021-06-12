const express = require("express");
const pool = require("./db");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

/* ROUTES */

/* CREATE NEW TODO */

app.post("/new", async (req, res) => {
  try {
    const { title } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo (title) VALUES ($1) RETURNING *",
      [title]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

/* GET ALL TODOs */

app.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});

/* GET TODO */

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

/* UPDATE TODO */

app.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updated = await pool.query(
      "UPDATE todo SET title = $1 WHERE todo_id = $2 RETURNING *",
      [title, id]
    );

    res.json(updated.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

/* DELETE TODO */

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
      [id]
    );

    res.json(deleted.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

/* START FUNC */

function start() {
  try {
    app.listen(PORT, () => {
      console.log("Server has been started...");
    });
  } catch (error) {
    console.log(error);
  }
}

start();
