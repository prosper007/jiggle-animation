import { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { useSpring, animated, config } from "react-spring";

const Take1 = () => {
  const classes = {
    containerRoot: {
      height: "100vh",
      width: "100vw",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "gray",
    },
    paperRoot: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "16em",
      width: "14em",
      borderRadius: "0.75em",
      backgroundColor: "pink",
    }
  }
  const AnimatedPaper = animated(Paper);
  const [flipFadeIn, setFlipFadeIn] = useState(false);
  const springProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: config.slow,
    delay: 200,
    loop: { reverse: true },
  });
  const [flipNum, setNum] = useState(false);
  const { number } = useSpring({
    reset: true,
    reverse: flipNum,
    from: { number: 0 },
    number: 1,
    config: config.molasses,
    onRest: () => setNum(!flipNum),
  })
  return (
    <Grid container sx={classes.containerRoot}>
      {/* <animated.div style={springProps}> */}
      <AnimatedPaper
        elevation={3}
        sx={classes.paperRoot}
        style={springProps}
      >
        {number.to(n => n.toFixed(2))}
      </AnimatedPaper>
      {/* </animated.div> */}
    </Grid>
  );
}

export default Take1;
