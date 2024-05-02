
const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');

const router = express.Router();


const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};


router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description, owner: req.userId });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar tarefa.' });
  }
});


router.get('/', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter tarefas.' });
  }
});


router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await Task.findById(id);

    if (!task || task.owner.toString() !== req.userId) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    task.title = title;
    task.description = description;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar tarefa.' });
  }
});


router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task || task.owner.toString() !== req.userId) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    await task.remove();
    res.status(200).json({ message: 'Tarefa excluída com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir tarefa.' });
  }
});

module.exports = router;
