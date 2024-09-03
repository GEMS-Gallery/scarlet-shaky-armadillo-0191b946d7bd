import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Box, Container, Grid, Typography, CircularProgress } from '@mui/material';
import TaskList from './components/TaskList';
import CategoryList from './components/CategoryList';
import TaskForm from './components/TaskForm';

interface Task {
  id: bigint;
  category: string;
  description: string;
  completed: boolean;
  createdAt: bigint;
  completedAt: bigint | null;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const fetchTasks = async () => {
    try {
      const result = await backend.getTasks();
      setTasks(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await backend.getCategories();
      setCategories(result);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addTask = async (category: string, description: string) => {
    try {
      await backend.addTask(category, description);
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const completeTask = async (taskId: bigint) => {
    try {
      await backend.completeTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const deleteTask = async (taskId: bigint) => {
    try {
      await backend.deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
        Task Manager
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CategoryList categories={categories} />
          <TaskForm categories={categories} onAddTask={addTask} />
        </Grid>
        <Grid item xs={12} md={8}>
          {loading ? (
            <CircularProgress />
          ) : (
            <TaskList
              tasks={tasks}
              onCompleteTask={completeTask}
              onDeleteTask={deleteTask}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
