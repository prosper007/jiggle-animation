import { useState } from "react";
import { useSpring, animated, config, easings } from "@react-spring/web";
import { useControls } from "leva";
import { Box } from "@mui/material";


type ConfigOptions = keyof typeof config;
type ControlOptions = "preset";
interface ControlConfig {
  value: ConfigOptions;
  options: ConfigOptions[];
}

export default function Take3() {
  const configList = Object.keys(config) as ConfigOptions[];
  const { preset } = useControls<Record<ControlOptions, ControlConfig>, Record<ControlOptions, ControlConfig>, Record<ControlOptions, ControlConfig>>({
    preset: { value: "default", options: configList }
  });
  const [flip, setFlip] = useState(false);
  const [styles, api] = useSpring(() => ({
    // reverse: flip,
    from: { x: 0 },
    // to: { x: 60 },
    // onRest: () => setFlip(!flip),
    // config: config[preset]
    // config: { tension: 10, friction: 10, mass: 1,  }
    // config: { duration: 500, easing: easings.easeInOutElastic }
  }))

  const handleClick = () => {
    api.start({
      from: { x: 0 },
      to: [{ x: 60 }, { x: -60 }],
      loop: { from: { x: -60 } },
    })
  }


  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      padding: 2,
    }}>
      <animated.div
        style={{
          ...styles,
          width: "5em",
          height: "4em",
          background: "hotpink",
          borderRadius: "5px",
          transition: "box-shadow 0.5s",
          willChange: "transform",
        }}
        onClick={handleClick}
      // style={{ transform: xPosSpring.to(trans) }}
      />
    </Box>
  );
}
