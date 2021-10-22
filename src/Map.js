import React, { useState } from 'react';
import { GMap } from 'primereact/gmap';
import { g_checkLoginACL } from '../GenericFunctions';
export function mapPage(props) {
    let querry = new URLSearchParams(props.location.search);
    let [lat, lng] = [querry.get('lat').replace(',', '.'), querry.get('lng').replace(',', '.')];
    [lat, lng] = [Number(lat), Number(lng)];
    if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
        window.close();
        return null;
    }
    let onMapClick = props.onMapClick ?? window.onMapClick;
    let onDragEnd = props.onDragEnd ?? window.onDragEnd;
    return g_checkLoginACL(() => <Mapg lat={lat} lng={lng} onMapClick={onMapClick} onDragEnd={onDragEnd} />);
}
export function Mapg(props) {
    let google = window.google;
    let [overlays, setOverlays] = useState([]);
    let options = { center: { lat: props.lat, lng: props.lng }, zoom: 8 };
    let mapReady = () => setOverlays([new google.maps.Marker({ draggable: props.onDragEnd !== undefined && props.onDragEnd !== null, position: options.center })]);
    if (!google) {
        window.location.reload();
        return null;
    }
    return (
        <GMap
            onMapReady={mapReady}
            onOverlayDragEnd={e => (props.onDragEnd ?? (() => {}))(e, [overlays, setOverlays], window)}
            onMapClick={e => (props.onMapClick ?? (() => {}))(e, [overlays, setOverlays], window)}
            overlays={overlays}
            options={options}
            style={{ width: '100%', height: '100vh' }}
        />
    );
}
