import React from 'react';
import SearchBooks from './search-books-component';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import '@testing-library/jest-dom';

it('has title of Book search', () => {
  render(
    <Provider store={store}>
      <SearchBooks />
    </Provider>
  );

  expect(screen.getByLabelText('Title')).toBeTruthy();
  expect(screen.getByLabelText('Author')).toBeTruthy();

  expect(screen.queryByLabelText('FooBar')).toBeFalsy();

  expect(screen.getByText('Book search')).toHaveTextContent('Book search');
});
