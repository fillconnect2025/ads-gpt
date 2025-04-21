import { IconProps } from "@/@types/icons.type";

export default function FacebookIcon({ size, color }: IconProps) {
  return (
    <svg width={size || 20} height={size || 20} viewBox="0 0 13 13" fill="none">
      <mask id="a" maskUnits="userSpaceOnUse" x={3} y={0} width={7} height={13}>
        <path
          d="M5.073 12.115v-5.63h-1.49V4.456h1.49V2.725c0-1.36.88-2.61 2.906-2.61.82 0 1.427.079 1.427.079l-.048 1.893S8.74 2.08 8.064 2.08c-.73 0-.848.337-.848.896v1.48h2.2L9.32 6.484H7.216v5.631H5.073z"
          fill={color || '#fff'}
        />
      </mask>
      <g mask="url(#a)">
        <path
          fill={color || '#fff'}
          d="M0.500977 0.11499H12.500977V12.11499H0.500977z"
        />
      </g>
    </svg>
  );
}
