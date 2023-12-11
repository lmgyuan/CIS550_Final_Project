import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const config = require('../config.json');

function MovieInfoPage() {
  const { movie_id } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const [genres, setGenres] = useState([]);
  const [movieCrew, setMovieCrew] = useState([]);

  useEffect(() => {
    // Get general info of the movie
    fetch(`http://${config.server_host}:${config.server_port}/movie/${movie_id}`)
      .then(res => res.json())
      .then(resJson => {
        setMovieInfo(resJson);
      });

    // Get genres of the movie
    fetch(`http://${config.server_host}:${config.server_port}/movie/${movie_id}/genres`)
    .then(res => res.json())
    .then(resJson => {
      setGenres(resJson);
    });

    // Get crew of the movie
    fetch(`http://${config.server_host}:${config.server_port}/movie/${movie_id}/crew`)
    .then(res => res.json())
    .then(resJson => {
      setMovieCrew(resJson);
    });
    
  }, [movie_id]);

  if (!movieInfo) {
    return <div>Loading...</div>;
  }

  const { PosterURL, PrimaryTitle, StartYear, RuntimeMinutes, AverageRating } = movieInfo;

  const directors = movieCrew.filter(crew => crew.Job === 'director');
  const casts = movieCrew.filter(crew => crew.Job === 'actor' || crew.Job === 'actress');
  const writers = movieCrew.filter(crew => crew.Job === 'writer');
  const producers = movieCrew.filter(crew => crew.Job === 'producer');

  return (
    <Container>
      <Stack direction="row" spacing={2}>
        <img src={PosterURL} alt="Movie Poster" style={{ width: '400px', height: '400px' }} />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h3">{PrimaryTitle}</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><strong style={{ fontSize: '16px' }}>Genre:</strong> {genres.map((genre, index) => genre.Genre).join(', ')} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong style={{ fontSize: '16px' }}>Year:</strong> {StartYear}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong style={{ fontSize: '16px' }}>Runtime (minutes):</strong> {RuntimeMinutes}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong style={{ fontSize: '16px' }}>Rating:</strong> {AverageRating}</TableCell>
              </TableRow>

              {directors.length > 0 && 
                <TableRow>
                  <TableCell>
                    <strong style={{ fontSize: '16px' }}>Director: </strong> 
                    {directors.map((director, index) => (
                      <span key={index}>
                        <NavLink style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}>
                          {director.Name}
                        </NavLink>
                        {index < directors.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </TableCell>
                </TableRow>
              }
              
              {casts.length > 0 && 
                <TableRow>
                  <TableCell>
                    <strong style={{ fontSize: '16px' }}>Top cast:</strong> {casts.map((cast, index) => (
                      <div key={index}>
                        <NavLink style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}>
                          {cast.Name}
                        </NavLink>
                        {' - '}
                        {cast.Characters}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              }
              
              {writers.length > 0 && 
                <TableRow>
                  <TableCell>
                    <strong style={{ fontSize: '16px' }}>Writer: </strong> 
                    {writers.map((writer, index) => (
                      <span key={index}>
                        <NavLink style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}>
                          {writer.Name}
                        </NavLink>
                        {index < writers.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </TableCell>
                </TableRow>
              }
      
              {producers.length > 0 && 
                <TableRow>
                  <TableCell>
                    <strong style={{ fontSize: '16px' }}>Producer: </strong> 
                    {producers.map((producer, index) => (
                      <span key={index}>
                        <NavLink style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}>
                          {producer.Name}
                        </NavLink>
                        {index < producers.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
}

export default MovieInfoPage;
