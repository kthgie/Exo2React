import React from "react";
import { useGeolocated } from "react-geolocated";
import './geolocalisationPrev.css';


const GeolocalisationPrev = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    return !isGeolocationAvailable ? (
        <div>Votre navigateur ne prend pas en compte la géolocalisation</div>
    ) : !isGeolocationEnabled ? (
        <div>La géolocalisation n'est pas prise en compte</div>
    ) : coords ? (
        <table>
            <tbody>
                <th>Votre position :</th>
                <tr>
                    <td>Latitude</td>
                    <td>{coords.latitude}</td>
                </tr>
                <tr>
                    <td>Longitude</td>
                    <td>{coords.longitude}</td>
                </tr>
            </tbody>
        </table>
    ) : (
        <div>Localisation en cours ... </div>
    );
};

export default GeolocalisationPrev;