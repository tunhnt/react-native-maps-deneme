import React, { useState, useRef } from 'react';
import { View, Text} from 'react-native';
import MapView from 'react-native-maps';

import Loading from './components/Loading/Loading';
import useFetch from './hooks/useFetch';
import UserMarker from './components/marker/UserMarker/UserMarker';
import InfoCard from './components/InfoCard';

const App = () => {
  const mapRef = useRef();
  const [user, setUser] = useState();
  const [infoModalVisibility, setInfoModalVisibility] = useState(false);
  const API = "https://random-data-api.com/api/users/random_user?size=35";
  const {data, loading, error} = useFetch(API);

  
  function handleMarkerSelect(coor, selectedUser) {
      setUser(selectedUser);
      handleModalVisibility();
      mapRef.current.animateToRegion({
        latitude: coor.lat,
        longitude: coor.lng,
        latitudeDelta: 8,
        longitudeDelta: 8, 
      })
  }

  const renderUserMarker = () => {
    return data.map(({id, avatar, first_name, last_name, username ,address: {coordinates}}) => {
      return(
        <UserMarker
          key={id}
          coordinates={{
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          }}
          userImageURL={avatar}
          onSelect={() => handleMarkerSelect(coordinates,{first_name, last_name, username})}
        />
      )
    })
  }

  function handleModalVisibility() {
    setInfoModalVisibility(!infoModalVisibility);
  }

  return (
    <View style={{flex: 1}} >
      <MapView ref={mapRef} style={{flex:1}}>
        {data && renderUserMarker()}
      </MapView>
      {loading && <Loading />} 
      {/* loading true olduğu sürece bu işlemi gerçekleştir */}
      {user && (<InfoCard 
        user={user}
        visible={infoModalVisibility} 
        close={handleModalVisibility}
        />)}
    </View>
  );
};


export default App;
