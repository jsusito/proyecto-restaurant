import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '320pt',
    
};


const center = {
    lat: 28.98, 
    lng: -13.83
};

function Maps() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBEChhrJuTzA-0va2W34tIb6nfqoPL1XXQ"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={19}
      >
        <>
          <Marker position={ center} label="CASANDRA">
          </Marker>
        </>
      </GoogleMap>
    </LoadScript>
  )
}

export default Maps