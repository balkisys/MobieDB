import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link ,useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';
export const MovieItem = (
  { title, release_date, vote_average, poster_path,id },
  k
) => {
	const navigate = useNavigate();

  const navigateToMovie = () => {
    // 👇️ navigate to /movie details
    navigate(`/movie/${id}`);
  };
  return (
    <Col key={id} xs={12} md={8} lg={3}>
      
        <Card onClick={navigateToMovie}>
          <Card.Img src={`http://image.tmdb.org/t/p/w185${poster_path}`} />

          <Card.Body>
            <Card.Title>
              {" "}
              <strong>  Titre :</strong>
			  {" "}
              {title}
            </Card.Title>

            <Card.Text>
              {" "}
              <strong> Date de sortie : </strong> {release_date}
            </Card.Text>
            <Card.Text>
              {" "}
              <strong> Note TMDb : </strong> {vote_average}
            </Card.Text>
          </Card.Body>
		  
        </Card>
      
	  
    </Col>
  );
};
MovieItem.propTypes = {
	title: PropTypes.string.isRequired,
	release_date: PropTypes.string.isRequired,
	vote_average: PropTypes.number.isRequired,
	poster_path: PropTypes.string.isRequired,
  };