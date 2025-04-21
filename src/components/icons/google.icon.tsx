import { IconProps } from '@/@types/icons.type';

export default function GoogleIcon({ size, color }: IconProps) {
  return (
    <svg width={size || 20} height={size || 20} viewBox="0 0 13 13" fill="none">
      <mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={1}
        y={0}
        width={11}
        height={12}
      >
        <path
          d="M11.784 5.084c.068.368.106.753.106 1.154 0 3.143-2.103 5.377-5.28 5.377a5.5 5.5 0 110-11c1.485 0 2.726.546 3.678 1.434l-1.55 1.55v-.004c-.577-.55-1.31-.832-2.128-.832-1.814 0-3.29 1.533-3.29 3.349 0 1.814 1.476 3.35 3.29 3.35 1.647 0 2.768-.94 2.998-2.233H6.61V5.084h5.174z"
          fill={color || '#E94235'}
        />
      </mask>
      <g mask="url(#a)">
        <path
          fill={color || '#E94235'}
          d="M0.500977 0.11499H12.500977V12.11499H0.500977z"
        />
      </g>
    </svg>
  );
}
