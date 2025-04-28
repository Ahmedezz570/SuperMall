import { MotiView } from "moti";

const AnimatedIcon = ({
  children,
  isActive,
  duration = 600,
  scaleFrom = 1,
  scaleTo = 1.3,
}) => {
  return (
    <MotiView
      from={{ scale: scaleFrom }}
      animate={{ scale: isActive ? scaleTo : scaleFrom }}
      transition={{
        type: "timing",
        duration: duration,
      }}
    >
      {children}
    </MotiView>
  );
};

export default AnimatedIcon;
