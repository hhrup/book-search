import React, { useState } from 'react';
import { TextField, Button, Alert, Typography } from '@mui/material';
import styles from './Books.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { searchParams } from './booksSlice';

export default function SearchBooks() {
  const [formState, setFormState] = useState({
    title: '',
    author: '',
    alert: false,
  });

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if(formState.title || formState.author) {
      dispatch(searchParams({...formState, skip: false}));
    }
    else {
      if(!formState.alert)
        setFormState({...formState, alert: true});
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormState({...formState, [name]: value, alert: false})
  }

  return (
      <div className={styles.searchContainer}>
        <Typography variant='h3' sx={{margin:'auto'}}>Book search</Typography>
        <form onSubmit={handleSubmit} className={styles.searchForm}>

          <TextField
          id='filled-basic'
          label='Title'
          variant='outlined'
          name='title'
          value={formState.title}
          onChange={handleChange}
          />

          <TextField
          id='filled-basic'
          label='Author'
          variant='outlined'
          name='author'
          value={formState.author}
          onChange={handleChange}
          />
          {formState.alert && <Alert severity="warning">Search field empty!</Alert>}
          <Button type='submit' variant="contained" size='large'><SearchIcon className={styles.magnifyIcon}/></Button>
        </form>
      </div>
  )
}
