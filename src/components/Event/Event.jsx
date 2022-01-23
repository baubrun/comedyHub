import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { dateFormat } from "../../shared/helpers";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const infoStyle = {
  color: "white",
  fontFamily: "Courier Prime ",
};

const Event = (props) => {
  const { title, startDate, performer, startTime, image, _id } = props.event;

  return (
    <Card
      sx={{
        minWidth: 350,
        maxWidth: 350,
        backgroundColor: "#020202",
        color: "white",
        margin: 2,
      }}
    >
      <CardHeader
        sx={{ color: "white", fontFamily: "Courier Prime " }}
        title={title}
        subheader={dateFormat(startDate)}
      />

      <Link to={`/events/${_id}`}>
        <LazyLoadImage
          alt=""
          effect="blur"
          src={require(`../../shared/uploads/${image}`)}
          style={{
            objectFit: "cover",
            height: 250,
            width: 350,
          }}
        />
      </Link>

      <CardContent>
        <Typography sx={infoStyle} gutterBottom variant="h5" component="h2">
          {performer}
        </Typography>
        <Typography
          sx={infoStyle}
          variant="body1"
          color="textSecondary"
          component="p"
        >
          {dateFormat(startDate)}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="h5" size="small" color="primary">
          {startTime}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Event;
