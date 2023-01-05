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
  const [numOscill, setNumOscill] = useState(0);
  const [styles, api] = useSpring(() => ({
    from: { x: 0 },
    // config: { tension: 10, friction: 10, mass: 1,  }
    // config: { duration: 500, easing: easings.easeInOutElastic }
  }))

  const handleClick = () => {
    setAnimate(!animate)
  }

  // desired number of oscillations is actually three 
  // but it does one extra oscillation before actually stopping animation
  const desiredOscill = 2;

  useEffect(() => {
    if (animate) {
      const toArray = numOscill === desiredOscill ? [{ x: 80 }, { x: -80 }, { x: 0 }] : [{ x: 80 }, { x: -80 }]
      const loopStart = numOscill === desiredOscill ? 0 : -80
      api.start({
        to: toArray,
        loop: { from: { x: loopStart } },
        config: config[preset],
        onRest: () => {
          if (numOscill === desiredOscill) {
            setAnimate(false)
            setNumOscill(0)
          } else {
            setNumOscill(numOscill + 1)
          }

        }
      })
    } else {
      api.stop()
    }
  }, [animate, api, preset, numOscill])


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
