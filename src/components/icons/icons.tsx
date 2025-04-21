import { IconComponentType, IconName } from '@/@types/icons.type';
import React from 'react';
import IconComponents from '.';


interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
}

export default function Icon({ name, color, size }: IconProps) {
  const Icon = IconComponents[name] as IconComponentType;

  if (!Icon) {
    return null;
  }

  return <Icon color={color} size={size} />;
}
