import React, {useState, useEffect} from 'react';
import { useGetVolumesQuery, apiSlice } from '../api/apiSlice';
import { CircularProgress, Card, CardContent, CardMedia, Typography, Box, Pagination, Alert } from '@mui/material';
import { shallowEqual, useSelector} from 'react-redux';
import {getAuthors, getCategories, getPublisher, getPublishedDate, getDescription} from './bookHelpers';
import styles from './Books.module.css';

export default function ShowBooks() {
  const {title, author, skip} = useSelector(state => state.books, shallowEqual);

  const [currentPage, setPage] = useState(1);
  const [index, setIndex] = useState(0);

  const prefetchVolumes = apiSlice.usePrefetch('getVolumes');

  useEffect(() => {
    setPage(1);
  }, [title, author]);

  // Books are called volumes in Google book api
  const {data: volumes, isLoading, isSuccess, isError, error} =
    useGetVolumesQuery({title: title, author: author, startIndex: index}, {skip});

  function getInfo(title, author, totalItems) {
    const titleString = title === '' ? '' : `Title: ${title};`;
    const authorString = author === '' ? '' : `Author: ${author};`;
    return (
      <Alert variant="filled" severity="info" sx={{fontSize:'1.4rem', alignContent:'center'}}>
        {`Found ${totalItems} results for: ${titleString} ${authorString} `}
      </Alert>
    )
  }

  function handlePagination(e, pageNumber) {
    setIndex((pageNumber - 1) * 10);

    setPage(pageNumber);

    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  function getPagination(totalItems) {
    const numOfPages = Math.ceil(totalItems/10);

    return <Pagination
      count={numOfPages}
      size='large'
      sx={{margin:'auto'}}
      onChange={(e, value) => handlePagination(e, value)}
      page={currentPage}/>;
  }

  function getArrayOfBookCards(volumes) {
    return (
      content = volumes.items.map((volume, index) => (
        <Card key={index} className={styles.card} >
          <Box className={styles.cardImage}>
            <CardMedia
            component='img'
            height="200"
            image={volume.volumeInfo.imageLinks?.thumbnail}
            alt='image of a book'
            />
          </Box>
          <Box>
            <CardContent>
              <Typography variant="h4">{volume.volumeInfo.title}</Typography>
              <Typography variant="h5">{getAuthors(volume.volumeInfo.authors)}</Typography>
              <Typography variant="h6">{getPublisher(volume.volumeInfo.publisher)}</Typography>
              <Typography variant="h6">{getPublishedDate(volume.volumeInfo.publishedDate)}</Typography>
              <Typography variant="h6">{getCategories(volume.volumeInfo.categories)}</Typography>
              <Typography variant="body1">{getDescription(volume.volumeInfo.description)}</Typography>
            </CardContent>
          </Box>
        </Card>))
    )
  }

  let content;
  let pagination;
  let info;

  if(isLoading) {
    content = <CircularProgress size='8rem' sx={{alignSelf:'center'}}/>
  } else if (isSuccess) {
    content = getArrayOfBookCards(volumes);
    pagination = getPagination(volumes.totalItems);
    info = getInfo(title, author, volumes.totalItems);
    prefetchVolumes({title: title, author: author, startIndex: index+10}); // prefetch index must be +10 from index
  } else if (isError) {
    console.log(error);
    content = <Alert severity="error" sx={{fontSize:'1.4rem', alignContent:'center'}}>{error.error}, Status: {error.status}</Alert>
  }

  return (
    <div className={styles.booksDisplay}>
      {info}
      {pagination}
      {content || <Typography variant="h4" sx={{alignSelf:'center'}}>Search by one or more criteria!</Typography>}
      {pagination}
    </div>
  );
}
