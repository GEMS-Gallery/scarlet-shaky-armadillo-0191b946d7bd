import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Typography } from '@mui/material';

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
    <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
        Tasks
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id.toString()}
            sx={{
              textDecoration: task.completed ? 'line-through' : 'none',
              opacity: task.completed ? 0.5 : 1,
              color: 'text.primary',
            }}
          >
            <ListItemText
              primary={task.description}
              secondary={`Category: ${task.category}`}
              secondaryTypographyProps={{ color: 'text.secondary' }}
            />
            <ListItemSecondaryAction>
              {!task.completed && (
                <IconButton
                  edge="end"
                  aria-label="complete"
                  onClick={() => onCompleteTask(task.id)}
                >
                  <svg className="icon" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </IconButton>
              )}
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDeleteTask(task.id)}
              >
                <svg className="icon" viewBox="0 0 24 24">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TaskList;
