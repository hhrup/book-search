import React from 'react';
import ShowBooks from './show-books-component';
import SearchBooks from './search-books-component';
import styles from './Books.module.css';
import { Container } from '@mui/material';

export default function BooksFeature() {
  return (
    <Container>
      <div className={styles.mainContainer}>
        <SearchBooks />
        <ShowBooks />
      </div>
    </Container>
  );
}
