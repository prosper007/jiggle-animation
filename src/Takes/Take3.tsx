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
  }))

  const handleClick = () => {
    setAnimate(!animate)
  }

  // desired number of oscillations is actually three 
  // but it does one extra oscillation before actually stopping animation
  const desiredOscill = 2;
  const travelLength = 20;

  useEffect(() => {
    if (animate) {
      const toArray = numOscill === desiredOscill
        ? [{ x: travelLength }, { x: -travelLength }, { x: 0 }]
        : [{ x: travelLength }, { x: -travelLength }]
      const loopStart = numOscill === desiredOscill ? 0 : -travelLength
      api.start({
        to: toArray,
        loop: { from: { x: loopStart } },
        config: { duration: 60, easing: easings.easeOutQuart },
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
      background: "linear-gradient(27deg, rgba(18, 39, 154, 1) 0%, rgba(158, 64, 117, 1) 45%, rgba(176, 36, 197, 0.986453956582633) 100%)"
    }}>
      <animated.div
        style={{
          ...styles,
          width: "10em",
          height: "2em",
          background: "rgb(200, 130, 184, 0.76)",
          borderRadius: "20px",
          transition: "box-shadow 0.5s",
          willChange: "transform",
          cursor: "pointer"
        }}
        onClick={handleClick}
      />
    </Box>
  );
}
