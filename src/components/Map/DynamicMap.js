// @ts-nocheck
import { useEffect } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import styles from './Map.module.scss';

const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, ...rest }) => {
  

  return (
    <MapContainer className='w-full h-96' {...rest}>
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  )
}

export default Map;
