import { useRef, useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useControls } from "leva";

import "./Take2styles.css";

const calc = (x: number, y: number, rect: DOMRect) => [
  -(y - rect.top - rect.height / 2) / 5,
  (x - rect.left - rect.width / 2) / 5,
  1.4
];
const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

type ConfigOptions = keyof typeof config;
type ControlOptions = "preset";
interface ControlConfig {
  value: ConfigOptions;
  options: ConfigOptions[];
}

export default function Take2() {
  const configList = Object.keys(config) as ConfigOptions[];
  const ref = useRef<HTMLDivElement>(null);
  const [xys, setXys] = useState([0, 0, 1]);
  const { preset } = useControls<Record<ControlOptions, ControlConfig>, Record<ControlOptions, ControlConfig>, Record<ControlOptions, ControlConfig>>({
    preset: { value: "default", options: configList }
  });
  const { xys: xysSpring } = useSpring({ xys, config: config[preset] });
  return (
    <div className="ccard-main" ref={ref}>
      <animated.div
        className="ccard"
        style={{ transform: xysSpring.to(trans) }}
        onMouseLeave={() => setXys([0, 0, 1])}
        onMouseMove={(e) => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setXys(calc(e.clientX, e.clientY, rect));
          }
        }}
      />
    </div>
  );
}
