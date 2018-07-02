import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, RefreshControl } from 'react-native';
import { Container, Content, Card, CardItem, Body, Left, Right, H3, List, ListItem, Text } from 'native-base';
import ErrorMessages from '../../constants/errors';
import { Actions } from 'react-native-router-flux';

import Error from './Error';
import Spacer from './Spacer';

const DeviceView = ({
  error,
  devices,
  reFetch
}) => {
  let refreshing = false;

  onRefresh = () => {
    console.log('aasdadasd');
    refreshing = true;
    reFetch().then(() => {
      refreshing = false;
    });
    
  }
  // Error
  if (error) return <Error content={error} />;

  // Get this Device from all devices
 
 
  // Devices not found
  if (!devices) return <Error content={ErrorMessages.device404} />;

  const onPress = item => Actions.device({ match: { params: { id: String(item.name) } } });
  // Build Method listing
  const devs = devices.map(item => (
    <Card key={item.name}>
    <TouchableOpacity onPress={() => onPress(item)}>
          <CardItem header bordered>
            <Text>Message from: {item.createdBy}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <H3>ID:</H3>
              <Text>{item.name}</Text>
            </Body>
          </CardItem>
          <CardItem>
              <Left>
                <Text>Created On:{"\n"}{new Date(item.createdOn).toDateString()}</Text>
              </Left>
            </CardItem>
            </TouchableOpacity>
        </Card>
  ));

  return (
    <Container>
      <Content 
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={this.onRefresh}
        />
      }
      padder>
          
                {devs}
            </Content>
    </Container>
  );
};

DeviceView.propTypes = {
  error: PropTypes.string,
  devices: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
};

DeviceView.defaultProps = {
  error: null,
  reFetch:null
};

export default DeviceView;
