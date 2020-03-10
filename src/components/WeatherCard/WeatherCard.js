import React from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import "./WeatherCard.scss";

const WeatherCard = props => {
  let img = "http://openweathermap.org/img/wn/" + props.icon + ".png";
  return (
    <Container className="card-wrapper">
      <Card className="weather-card">
        <Card.Img
          variant="top"
          alt="image"
          width="100"
          height="100"
          src={img}
        />
        <Card.Body>
          <Card.Title
            style={{ fontWeight: "bold", fontSize: "30px", color: "#510180" }}
          >
            {props.weather}
          </Card.Title>
          <Card.Subtitle style={{ fontSize: "18px", color: "#b177d3" }}>
            {props.description}
          </Card.Subtitle>
          <ListGroup style={{ marginTop: "20px" }}>
            <ListGroup.Item>
              <span className="info-title">Temperature:</span>{" "}
              {props.temperature}F
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="info-title">Humidity:</span> {props.humidity}%
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="info-title">Pressure:</span> {props.pressure}P
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WeatherCard;
