import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

interface CategoryListProps {
  categories: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <Paper elevation={0} sx={{ mb: 3, p: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category}>
            <ListItemText primary={category} sx={{ color: 'text.secondary' }} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CategoryList;
