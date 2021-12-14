import booksReducer, { searchParams } from './booksSlice';

describe('books reducer', () => {
  const initialState = {
    title: '',
    author: '',
    skip: true,
  }

  it('should handle initial state', () => {
    expect(booksReducer(undefined, { type: 'unknown' })).toEqual({
      title: '',
      author: '',
      skip: true
    });
  });

  it('should handle searchParams action', () => {
    const actual = booksReducer(initialState, searchParams({
      title: 'good book',
      author: 'Goody Goodson',
      skip: false
    }));
    expect(actual.title).toEqual('good book');
    expect(actual.author).toEqual('Goody Goodson');
    expect(actual.skip).toEqual(false);
  });

})