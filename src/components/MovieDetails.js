import React, { useState, useEffect } from "react";
import {useParams, useNavigate } from "react-router-dom";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Header } from "./Header";
import axios from 'axios';
const MovieCard = () => {
  const [movie, setMovie] = useState([]);
  const [director, setDirector] = useState('');
  const [actors, setActors] = useState([]);
  const [synopsis, setSynopsis] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9665a68312e617b64e37557d18c1f556&append_to_response=credits`)
      .then(response => {
        const data = response.data;
        setMovie(data)
        // Get the director
        const crew = data.credits.crew;
        const directors = crew.filter(member => member.job === 'Director');
        const directorNames = directors.map(director => director.name);
        setDirector(directorNames.join(', '));

        // Get the actors
        const cast = data.credits.cast;
        const actorNames = cast.slice(0, 5).map(actor => actor.name);
        setActors(actorNames.join(', '));

        // Get the synopsis
        setSynopsis(data.overview);
      })
      .catch(error => console.log(error));
  }, [id]);
  // Get the director
  const {
    poster_path,
    title,
  } = movie;
  return (
    <div>
      <Header />
	  <Button >
              <i bg="dark" onClick={() => navigate(-1)} className="bi bi-arrow-return-left">  retourner <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
</svg></i> 
            </Button>
      <Container fluid>
		
        <Row className="justify-content-md-center">
          <Col xs={12} md={8} lg={3}>
           
            <Card>
              <Card.Img src={`http://image.tmdb.org/t/p/w185${poster_path}`} />

              <Card.Body>
                <Card.Title> <strong>Titre  :</strong> {title}</Card.Title>

                <Card.Text>
                  <strong>Directeur :</strong> {director}
                </Card.Text>
                <Card.Text>
                  {" "}
                  <strong> Acteurs: </strong> {actors}
                </Card.Text>
                <Card.Text>
                  {" "}
                  <strong> Synopsis :</strong> {synopsis}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};


export default MovieCard;
