import React from "react";
import { Container, Image } from "react-bootstrap";

const WeatherCard = (props) => {
    let img = "http://openweathermap.org/img/wn/" + props.icon + ".png";
    console.log(img);
    return (
        <Container>
            <Image alt="image" src={img}></Image>
        </Container>
    )
}

export default WeatherCard;