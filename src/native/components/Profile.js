import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Container, Content, List, ListItem, Body, Left, Text, Icon, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from './Header';
import Spacer from './Spacer';


const Profile = ({ member, logout }) => (
  <Container>
    <Content>
      <List>
        {(member && member.email) ?
          <View>
            <Content padder>
              <Header
                title="Dashboard"//{`Hi ${member.firstName},`}
                content={`You are currently logged in as ${member.email}`}
              />
            </Content>

            <ListItem onPress={Actions.updateProfile} icon>
              <Left>
                <Icon name="person-add" />
              </Left>
              <Body>
                <Text>Update My Profile</Text>
              </Body>
            </ListItem>
            <ListItem onPress={logout} icon>
              <Left>
                <Icon name="power" />
              </Left>
              <Body>
                <Text>Logout</Text>
              </Body>
            </ListItem>
          </View>
        :
          <View>
            <Content padder>
              <Header
                title="Hi there, Amy"
                content="where profile photo and info will go"
              />
            </Content>

            <H3 style={{ paddingLeft: 15 }}>Data Reporting</H3>
            <ListItem onPress={Actions.login} icon>
              <Body>
                <Text>Reports</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.login} icon>
              <Body>
                <Text>Graphs</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.signUp} icon>
              <Body>
                <Text>Maintenance</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.forgotPassword} icon>
              <Body>
                <Text>Data</Text>
              </Body>
            </ListItem>

            <Spacer size={15} />
            <H3 style={{ paddingLeft: 15 }}>Account Settings</H3>

            <ListItem onPress={Actions.signUp} icon>
              <Left>
                <Icon name="add-circle" />
              </Left>
              <Body>
                <Text>Add Friend</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.signUp} icon>
              <Left>
                <Icon name="add-circle" />
              </Left>
              <Body>
                <Text>Legal</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.forgotPassword} icon>
              <Left>
                <Icon name="help-buoy" />
              </Left>
              <Body>
                <Text>Support</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.login} icon>
              <Left>
                <Icon name="power" />
              </Left>
              <Body>
                <Text>Logout</Text>
              </Body>
            </ListItem>
          </View>
        }
      </List>
    </Content>
  </Container>
);

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
