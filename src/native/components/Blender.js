import React from 'react';
import { Container, Content, Text, H1, H2, H3, Button, Picker, Item, Icon } from 'native-base';
import Spacer from './Spacer';
import { Image } from 'react-native';


const BlenderView = () => {
  return(
    <Container>
      <Content padder>
        <H1>Vitamix A3500</H1>
        <Image source={{ uri: "https://www.williams-sonoma.com/wsimgs/ab/images/dp/wcm/201811/0004/vitamix-a3500-ascent-series-blender-candy-apple-red-c.jpg" }} style={{ height: 350, width: null, flex: 1 }} />

        <Spacer size={10} />
        <Text style={{paddingLeft:15}}>Status: Powered On</Text>
        <Spacer size={10} />

        <Picker
              iosHeader="Select Function"
              mode="dropdown"
              selectedValue={"keyx"}
              onValueChange={()=>{}}
            >
              <Item label="Select Blender Function" value="keyx" />
              <Item label="Chop" value="key0" />
              <Item label="Pulse" value="key1" />
              <Item label="Mince" value="key2" />
              <Item label="Spin" value="key3" />
              <Item label="Knead" value="key4" />
        </Picker>
        <Spacer size={10} />
        <Button full iconLeft>
            <Icon name='aperture' />
            <Text>BLEND</Text>
          </Button>

        
      </Content>
    </Container>
  );
};

export default BlenderView;