import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

interface TaskFormProps {
  categories: string[];
  onAddTask: (category: string, description: string) => void;
}

interface FormData {
  category: string;
  description: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ categories, onAddTask }) => {
  const { control, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    onAddTask(data.category, data.description);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="category-label"
                label="Category"
                sx={{ bgcolor: 'background.paper', color: 'text.primary' }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Task Description"
              variant="outlined"
              fullWidth
              sx={{ bgcolor: 'background.paper', color: 'text.primary' }}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ color: 'secondary.main' }}>
          Add Task
        </Button>
      </Box>
    </form>
  );
};

export default TaskForm;
