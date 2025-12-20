import React from 'react';
import { ControlPosition, MapControl } from '@vis.gl/react-google-maps';

type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition; // свойство где конкретно будет размещен поиск.
  children?: React.ReactNode;
};

export const CustomMapControl = ({ controlPosition, children }: CustomAutocompleteControlProps) => {
  return <MapControl position={controlPosition}>{children}</MapControl>;
};
