import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Task {
  id: bigint;
  category: string;
  description: string;
  completed: boolean;
  createdAt: bigint;
  completedAt: bigint | null;
}

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (taskId: bigint) => void;
  onDeleteTask: (taskId: bigint) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask, onDeleteTask }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Tasks
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id.toString()}
            sx={{
              textDecoration: task.completed ? 'line-through' : 'none',
              opacity: task.completed ? 0.5 : 1,
            }}
          >
            <ListItemText
              primary={task.description}
              secondary={`Category: ${task.category}`}
            />
            <ListItemSecondaryAction>
              {!task.completed && (
                <IconButton
                  edge="end"
                  aria-label="complete"
                  onClick={() => onCompleteTask(task.id)}
                >
                  <CheckCircleIcon />
                </IconButton>
              )}
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDeleteTask(task.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TaskList;
