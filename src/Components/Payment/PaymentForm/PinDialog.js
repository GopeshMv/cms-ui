import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const PinDialog = ({ open, onClose, setInputValue, postPayment }) => {

  const [pin, setPin] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setPin(e.target.value);
  };

  const handleSubmit = () => {
    postPayment(pin);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter your pin number!</DialogTitle>
      <DialogContent>
        <TextField
          label="Enter Value"
          onChange={handleInputChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PinDialog;