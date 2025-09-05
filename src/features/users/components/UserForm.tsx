import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  Chip,
  OutlinedInput,
  SelectChangeEvent
} from '@mui/material';
import { User, UserFormData } from '../types/user';

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: initialData.name || '',
    whatsapp: initialData.whatsapp || '',
    email: initialData.email || '',
    gender: initialData.gender || 'male',
    planId: initialData.planId || '',
    batchId: initialData.batchId || '',
    notes: initialData.notes || '',
    tags: initialData.tags || [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof UserFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof UserFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTagsChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setFormData(prev => ({ 
      ...prev, 
      tags: typeof value === 'string' ? value.split(',') : value 
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Please enter a valid phone number';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.planId.trim()) {
      newErrors.planId = 'Plan is required';
    }
    
    if (!formData.batchId.trim()) {
      newErrors.batchId = 'Batch is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Mock data for dropdowns
  const plans = [
    { id: 'plan1', title: 'Premium Monthly' },
    { id: 'plan2', title: 'Standard Monthly' },
    { id: 'plan3', title: 'Basic Monthly' },
    { id: 'plan4', title: 'Premium Yearly' },
    { id: 'plan5', title: 'Standard Quarterly' },
  ];
  
  const batches = [
    { id: 'batch1', title: 'Morning Batch (6-8 AM)' },
    { id: 'batch2', title: 'Evening Batch (6-8 PM)' },
    { id: 'batch3', title: 'Weekend Batch' },
  ];

  const availableTags = ['VIP', 'New', 'Long-term', 'Referral', 'Corporate'];

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Full Name"
        name="name"
        autoComplete="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        disabled={isLoading}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="whatsapp"
        label="WhatsApp Number"
        name="whatsapp"
        autoComplete="tel"
        value={formData.whatsapp}
        onChange={handleChange}
        error={!!errors.whatsapp}
        helperText={errors.whatsapp}
        disabled={isLoading}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        disabled={isLoading}
      />
      
      <FormControl 
        fullWidth 
        margin="normal" 
        required
        error={!!errors.gender}
      >
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          name="gender"
          value={formData.gender}
          label="Gender"
          onChange={handleSelectChange}
          disabled={isLoading}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
        {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
      </FormControl>
      
      <FormControl 
        fullWidth 
        margin="normal" 
        required
        error={!!errors.planId}
      >
        <InputLabel id="plan-label">Plan</InputLabel>
        <Select
          labelId="plan-label"
          id="planId"
          name="planId"
          value={formData.planId}
          label="Plan"
          onChange={handleSelectChange}
          disabled={isLoading}
        >
          {plans.map(plan => (
            <MenuItem key={plan.id} value={plan.id}>{plan.title}</MenuItem>
          ))}
        </Select>
        {errors.planId && <FormHelperText>{errors.planId}</FormHelperText>}
      </FormControl>
      
      <FormControl 
        fullWidth 
        margin="normal" 
        required
        error={!!errors.batchId}
      >
        <InputLabel id="batch-label">Batch</InputLabel>
        <Select
          labelId="batch-label"
          id="batchId"
          name="batchId"
          value={formData.batchId}
          label="Batch"
          onChange={handleSelectChange}
          disabled={isLoading}
        >
          {batches.map(batch => (
            <MenuItem key={batch.id} value={batch.id}>{batch.title}</MenuItem>
          ))}
        </Select>
        {errors.batchId && <FormHelperText>{errors.batchId}</FormHelperText>}
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <InputLabel id="tags-label">Tags</InputLabel>
        <Select
          labelId="tags-label"
          id="tags"
          multiple
          value={formData.tags || []}
          onChange={handleTagsChange}
          input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          disabled={isLoading}
        >
          {availableTags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <TextField
        margin="normal"
        fullWidth
        id="notes"
        label="Notes"
        name="notes"
        multiline
        rows={4}
        value={formData.notes || ''}
        onChange={handleChange}
        disabled={isLoading}
      />
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm; 