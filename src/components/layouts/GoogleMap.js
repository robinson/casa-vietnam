import React, { useState, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { headerFont } from '../utilities'
import localization from '../assets/img/marker.png'
const Marker = ({ children }) => children

const StyledMarker = styled.p`
font-size:1rem;
${headerFont};
text-align: center;
width:70px;
.MarkerImg {
 width:40px;
}
`

function GoogleMap() {
  return (
    // Important! Always set the container height explicitly
    <div style={{
      height: '60vh', width: '60%', margin: '0 auto', marginBottom: '5rem'
    }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAPS_API }}
        defaultCenter={{ lat: 45.4913, lng: 9.1969 }}
        defaultZoom={15}
      >
        <Marker
          lat="45.49130630493164"
          lng="9.196946144104004"
        >
          <StyledMarker>
            <img src={localization} className="MarkerImg" />
      casavietnam</StyledMarker>

        </Marker>
      </GoogleMapReact>
    </div>
  );

}

export default GoogleMap;