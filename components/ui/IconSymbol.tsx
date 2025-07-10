import React from 'react';
import { MaterialIcons, Ionicons, Feather, FontAwesome, FontAwesome5, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const iconSets = {
  material: MaterialIcons,
  ion: Ionicons,
  feather: Feather,
  fa: FontAwesome,
  fa5: FontAwesome5,
  ant: AntDesign,
  mci: MaterialCommunityIcons,
};

type IconSymbolProps = {
  name: string;
  filledName?: string;
  size?: number;
  color?: string;
  type?: keyof typeof iconSets;
  focused?: boolean; // <-- active state
};

export function IconSymbol({
  name,
  filledName,
  size = 24,
  color = 'black',
  type = 'material',
  focused = false,
}: IconSymbolProps) {
  const IconComponent = iconSets[type] || MaterialIcons;
  const iconName = focused && filledName ? filledName : name;
  return <IconComponent name={iconName as any} size={size} color={color} />;
}
