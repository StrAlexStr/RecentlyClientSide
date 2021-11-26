import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import mapStyles from "../../assets/map/mapStyles";

function Map() {
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 47.023509, lng: 28.833464 }}
      defaultOptions={{
        styles: mapStyles,
        disableDefaultUI: true,
      }}
    />
  );
}

const WrappedMapRoot = withScriptjs(withGoogleMap(Map));

function WrappedMap() {
  return (
    <div className="w-screen h-full z-0">
      <WrappedMapRoot
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div className="h-full w-full" />}
        containerElement={<div className="h-full w-full" />}
        mapElement={<div className="h-full w-full" />}
      />
    </div>
  );
}

export default WrappedMap;
