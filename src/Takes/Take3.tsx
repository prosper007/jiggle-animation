import { useEffect, useState } from "react";
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
  const [animate, setAnimate] = useState(false);
  const [styles, api] = useSpring(() => ({
    from: { x: 0 },
    // config: { tension: 10, friction: 10, mass: 1,  }
    // config: { duration: 500, easing: easings.easeInOutElastic }
  }))

  const handleClick = () => {
    setAnimate(!animate)
  }

  useEffect(() => {
    if (animate) {
      api.start({
        to: [{ x: 80 }, { x: -80 }],
        loop: { from: { x: -80 } },
        config: config[preset]
      })
    } else {
      api.stop()
    }
  }, [animate, api, preset])


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
          cursor: "pointer"
        }}
        onClick={handleClick}
      />
    </Box>
  );
}
