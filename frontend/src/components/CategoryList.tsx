import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

interface CategoryListProps {
  categories: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <Paper elevation={3} sx={{ mb: 3, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category}>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CategoryList;
