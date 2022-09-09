import { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { useSpring, animated, config } from "react-spring";

const AnimatedPaper = animated(Paper);

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

  const [flipNum, setNum] = useState(false);
  const { number } = useSpring({
    reset: true,
    reverse: flipNum,
    from: { number: 0 },
    number: 1,
    config: config.molasses,
    onRest: () => setNum(!flipNum),
  })
  const springProps = useSpring({
    opacity: number.to(number => number + 0.1),
    config: config.slow,
    delay: 200,
    loop: { reverse: true },
  });

  return (
    <Grid container sx={classes.containerRoot}>
      <AnimatedPaper
        elevation={3}
        sx={classes.paperRoot}
        style={springProps}
      >
        {number.to(n => n.toFixed(2))}
      </AnimatedPaper>
    </Grid>
  );
}

export default Take1;
