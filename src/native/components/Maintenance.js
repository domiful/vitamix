import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Left, Right, H3, List, ListItem, Text } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';
import mchart from '../../images/mc.png';

const MaintenanceView = ({
  error,
  devices,
}) => {
  // Error
  if (error) return <Error content={error} />;

  // Get this Device from all devices
 
 
  // Devices not found
  if (!devices) return <Error content={ErrorMessages.device404} />;

  
  // Build Method listing
  const devs = devices.map(item => (
    <Card key={item.name}>
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
        </Card>
  ));

  return (
    <Container>
      <Content padder>
      <Card>
      <CardItem>
          <Image source={mchart} style={{ height: 300, width: null, flex: 1 }} />

      </CardItem>
  </Card>
                {devs}
            </Content>
    </Container>
  );
};

MaintenanceView.propTypes = {
  error: PropTypes.string,
  devices: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

MaintenanceView.defaultProps = {
  error: null,
};

export default MaintenanceView;
