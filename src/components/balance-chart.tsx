import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

type Props = {
  height?: number;
  strokeWidth?: number;
};

export function BalanceChart({ height = 80, strokeWidth = 2.5 }: Props) {
  return (
    <Svg
      width="100%"
      height={height}
      viewBox="0 0 320 80"
      preserveAspectRatio="none"
    >
      <Defs>
        <SvgLinearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#4ADE80" stopOpacity="0.35" />
          <Stop offset="1" stopColor="#4ADE80" stopOpacity="0" />
        </SvgLinearGradient>
      </Defs>
      <Path
        d="M0,55 C30,50 50,30 80,32 C110,34 130,55 160,52 C190,49 210,28 240,22 C270,16 295,28 320,18 L320,80 L0,80 Z"
        fill="url(#balanceFill)"
      />
      <Path
        d="M0,55 C30,50 50,30 80,32 C110,34 130,55 160,52 C190,49 210,28 240,22 C270,16 295,28 320,18"
        stroke="#4ADE80"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}
