import { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { useSpring, animated, config } from "react-spring";

const App = () => {
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
      backgroundColor: "red",
    }
  }
  const AnimatedPaper = animated(Paper);
  const springProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 200,
    loop: { reverse: true },
  });
  const [flip, set] = useState(false)
  const { number } = useSpring({
    reset: true,
    reverse: flip,
    from: { number: 0 },
    number: 1,
    config: config.molasses,
    onRest: () => set(!flip),
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

export default App;
