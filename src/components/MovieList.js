import React, { useEffect, useState } from "react";
import { Row, Container, Form, Col  } from "react-bootstrap";
import { Input } from "reactstrap";
import { MovieItem } from "./MovieItem";
import { Header } from "./Header";
import axios from 'axios';
const  MovieList= () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchMovieTitle, setSearchMovieTitle] = useState("");
  const [searchYear, setSearchYear] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 

  const retrievemovies =  async () => {
try {	const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=9665a68312e617b64e37557d18c1f556&page=${page}`);
	const { results } = response.data;
        setMovies(results);
		setTotalPages(results.total_pages);
		setIsLoaded(true);
	}
		catch(e) {
			setIsLoaded(true);
			setError(e);
		}
  };
  useEffect(retrievemovies, [page]);
  const handleReset = () => {
    setSearchMovieTitle("");
    retrievemovies();
    setPage(1);
  };
  const handleSearchInputChange = event => {
    const { name, value } = event.target;
    if (name === 'title') {
		setSearchMovieTitle(value);
    } else if (name === 'year') {
      setSearchYear(value);
    }
  };
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };
  const filteredMovies = movies && (movies.filter(movie => {
    const titleMatch = movie.title.toLowerCase().includes(searchMovieTitle.toLowerCase());
    const yearMatch =  movie.release_date?.split('-')[0].includes(searchYear);
    return titleMatch && yearMatch;
  }));
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className="justify-content-center">
        <div className="spinner-border text-primary  justify-content-center"></div>{" "}
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        <Header />
        <br></br>
        <Container>
          <Row>
            <Col md={3}>
              <Row>
                <Row>
                  <button
                    outline
                    className="btn btn-outline-primary"
                    block
                    onClick={handleReset}
                  >
                    mise à jour recherche 
                  </button>{" "}
                </Row>
                <div></div>
                <Row>
                  <div> recherche par date release </div>
                  <div className="input-group mb-3">
                    <Input
                    type="text"
					name="year"
					placeholder="Search by year..."
					value={searchYear}
					onChange={handleSearchInputChange}
                    />
                  </div>
                </Row>
                <Row>
                  <div> recherche par titre de film </div>
                  <div className="input-group mb-3">
                    <Input
                      type="text"
					  name="title"
                      className="form-control"
                      placeholder="search movie"
                      value={searchMovieTitle}
                      onChange={handleSearchInputChange}
                    />
                  </div>{" "}
                </Row>
              </Row>
            </Col>

            <br></br>
            <Col>
              <Row>
                {filteredMovies.map((movies, id) => (
                  <MovieItem
                    key={id}
                    title={movies.title}
                    release_date={movies.release_date}
                    price={movies.price}
                    vote_average={movies.vote_average}
                    poster_path={movies.poster_path}
                    id={movies.id}
                  />
                ))}
              </Row>
            </Col>
          </Row>
          <br></br>
          <Row>
            <div className="col-md-12 list">
              <div className="mt-3">
                {"films par page: "}
				<button type="button" className="btn btn-outline-primary" disabled={page <= 1} onClick={handlePrevPage}>
                Previous Page
                </button>
	            {" "}
                <button  type="button" className="btn btn-outline-primary" disabled={page >= totalPages} onClick={handleNextPage}>
                 Next Page
                </button>
              </div>
            </div>
          </Row>
          <br></br>
          <Row> </Row>
        </Container>
      </div>
    );
  }
}
export default   MovieList