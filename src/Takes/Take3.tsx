import { useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useControls } from "leva";
import { makeStyles } from "@mui/styles";


type ConfigOptions = keyof typeof config;
type ControlOptions = "preset";
interface ControlConfig {
  value: ConfigOptions;
  options: ConfigOptions[];
}

const useStyles = makeStyles({
  ccardMain: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  ccard: {
    width: "20ch",
    height: "20ch",
    background: "hotpink",
    borderRadius: "5px",
    transition: "box-shadow 0.5s",
    willChange: "transform",
  }
})

export default function Take3() {
  const configList = Object.keys(config) as ConfigOptions[];
  const classes = useStyles();
  const { preset } = useControls<Record<ControlOptions, ControlConfig>, Record<ControlOptions, ControlConfig>, Record<ControlOptions, ControlConfig>>({
    preset: { value: "default", options: configList }
  });
  const [flip, setFlip] = useState(false);
  const styles = useSpring({
    // loop: { reverse: true },
    reverse: flip,
    from: { x: -500 },
    to: { x: 500 },
    onRest: () => setFlip(!flip),
    config: config[preset]
  })


  return (
    <div className={classes.ccardMain}>
      <animated.div
        className={classes.ccard}
        style={{
          ...styles
        }}
      // style={{ transform: xPosSpring.to(trans) }}
      />
    </div>
  );
}
