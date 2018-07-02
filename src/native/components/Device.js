import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Left, Right, H3, List, ListItem, Text } from 'native-base';
import ErrorMessages from '../../constants/errors';
import Error from './Error';
import Spacer from './Spacer';

const d = null;
const nid = null;
const DeviceView = ({
  error,
  deviceId,
  fetchOne,
}) => {
  // Error
  console.log(deviceId);
  if (error) return <Error content={error} />;

  // Get this Device from all devices

  

  // Device not found
  if (!deviceId) return <Error content={ErrorMessages.device404} />;

  if(nid!==deviceId){
    nid=deviceId;
    fetchOne(deviceId).then((r)=>{
      d = r.data[0];
      console.log(d);
    });
  }  
  if(d)
  return (
    <Container>
      <Content padder>

      <Card>
            <CardItem header bordered>
              <Text>Message from device</Text>
            </CardItem>
            <CardItem>
              <Body>
                <H3>ID:</H3>
                <Text>{deviceId}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <H3>Direction:</H3>
                <Text>{d.direction}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <H3>Maintenance:</H3>
                <Text>{d.payload.data.maintenance ? 'No Maintenance Needed': 'Maintenance Needed' }</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <H3>Powered Status:</H3>
                <Text>{d.payload.data.status ? 'Powered On' : 'Powered Off' }</Text>
              </Body>
            </CardItem>
          </Card>
      </Content>
    </Container>
  );
  else return (
    <Container>
      <Content padder>

      <Card>
            <CardItem header bordered>
              <Text>Loading...</Text>
            </CardItem>
          </Card>
      </Content>
    </Container>
  );
};

DeviceView.propTypes = {
  error: PropTypes.string,
  deviceId: PropTypes.string.isRequired,
};

DeviceView.defaultProps = {
  error: null,
  deviceId: null,
  fetchOne: null,
};

export default DeviceView;






