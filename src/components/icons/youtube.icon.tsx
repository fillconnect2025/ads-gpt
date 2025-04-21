import { IconProps } from '@/@types/icons.type';

export default function YoutubeIcon({ size, color }: IconProps) {
  return (
    <svg
      width={size || 20}
      height={size || 20}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M19.576 5.192a2.513 2.513 0 00-1.772-1.769C16.25 3 10 3 10 3s-6.26.01-7.815.434a2.512 2.512 0 00-1.772 1.77C0 6.754 0 10 0 10s0 3.245.424 4.808a2.512 2.512 0 001.772 1.769C3.75 17 10 17 10 17s6.25 0 7.804-.423a2.513 2.513 0 001.772-1.77C20 13.257 20 10 20 10s0-3.245-.424-4.808zM8 12.995v-5.99L13.196 10 8 12.995z"
        fill={color || "red"}
      />
    </svg>
  );
}
