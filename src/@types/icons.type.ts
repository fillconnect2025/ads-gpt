
import IconComponents from '@/components/icons';
import { icons } from 'lucide-react';
import { ElementType } from 'react';

export interface IconProps {
  color?: string;
  size?: number;
}

export interface DynamicIconProps {
  name: keyof typeof icons;
  color?: string;
  size?: number;
}

export type IconComponentType = ElementType<IconProps>;
export type IconName = keyof typeof IconComponents;
