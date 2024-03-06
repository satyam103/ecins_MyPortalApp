import {PermissionsAndroid, Alert, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {postDataUrl} from './utility';

const getLocation = () => {
  Geolocation.getCurrentPosition(
    //Will give you the current location
    (position) => {
      const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
      //getting the Latitude from the location json

      var formData = {
        latitude: currentLatitude,
        longitude: currentLongitude,
      };

      postDataUrl('POST', 'localizations', formData)
        .then((response) => {})
        .catch((response) => {
          this.setState({loginError: true});
        });
    },
    (error) => console.log(error.message),
    {
      enableHighAccuracy: false,
      timeout: 20000,
    },
  );
};

export async function requestLocationPermission() {
  if (Platform.OS === 'ios') {
    getLocation();
  } else {
    try {
      const chckLocationPermission = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'MyPortal App required Location permission',
              message:
                'We required Location permission in order to get device location ' +
                'Please grant us.',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
            getLocation();
          } else {
            console.log('location permission denied');
          }
        } catch (error) {
          console.warn(error);
        }
      }
    } catch (err) {
      console.warn(err);
    }
  }
}
