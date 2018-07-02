import React from 'react';
import { Scene, Tabs, Stack, Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import RecipesContainer from '../../containers/Recipes';
import RecipesComponent from '../components/Recipes';
import RecipeViewComponent from '../components/Recipe';
import RecipeEditComponent from '../components/RecipeEdit';


import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import BlendersContainer from '../../containers/Blenders';
import BlendersComponent from '../components/Blenders';
import BlenderViewComponent from '../components/Blender';

import DevicesContainer from '../../containers/Devices';
import DevicesComponent from '../components/Devices';
import DeviceViewComponent from '../components/Device';

import ReportsComponent from '../components/Reports';
import MaintenanceComponent from '../components/Maintenance';



const Index = (
  <Stack>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={true}
        {...DefaultProps.tabProps}
      >
      <Stack
        key="recipes"
        title="Recipes"
        icon={() => <Icon name="restaurant" {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key="recipes" hideNavBar component={RecipesContainer} Layout={RecipesComponent} />
      </Stack>
        <Stack
          key="blender"
          title="Blenders"
          icon={() => <Icon name="ios-aperture-outline" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="blenders" hideNavBar component={BlendersContainer} Layout={BlendersComponent} />
          <Scene key="home" component={BlenderViewComponent} />
        </Stack>

        <Stack
          key="profile"
          title="Dashboard"
          icon={() => <Icon name="stats" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} />
          <Scene
            back
            key="signUp"
            title="Legal"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />
          <Scene
            back
            key="devices"
            title="Data"
            {...DefaultProps.navbarProps}
            component={DevicesContainer}
            Layout={DevicesComponent}
          />
          <Scene
            back
            key="reports"
            title="Reports"
            {...DefaultProps.navbarProps}
            component={DevicesContainer}
            Layout={ReportsComponent}
          />
          <Scene
            back
            key="maint"
            title="Maintenance"
            {...DefaultProps.navbarProps}
            component={DevicesContainer}
            Layout={MaintenanceComponent}
          />
          <Scene
            key="login"
            title="LOGIN"
            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
          <Scene
            back
            key="forgotPassword"
            title="Support"
            {...DefaultProps.navbarProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
          />
          <Scene
            back
            key="updateProfile"
            title="UPDATE PROFILE"
            {...DefaultProps.navbarProps}
            component={UpdateProfileContainer}
            Layout={UpdateProfileComponent}
          />
        </Stack>
      </Tabs>
    </Scene>
    <Scene
            key="login"
            title="LOGIN"

            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
    <Scene
      back
      clone
      key="recipe"
      title="RECIPE"
      rightTitle="Edit"
      onRight={()=>{Actions.recipeEdit({ match: { params: { id: "1" } } });}}
      {...DefaultProps.navbarProps}
      component={RecipesContainer}
      Layout={RecipeViewComponent}
    />
    <Scene
      back
      clone
      key="device"
      title="Message"
      {...DefaultProps.navbarProps}
      component={DevicesContainer}
      Layout={DeviceViewComponent}
    />
    <Scene
      back
      clone
      key="recipeEdit"
      title="RECIPE"
      rightTitle="Save"
      onRight={()=>{Actions.pop();}}
      {...DefaultProps.navbarProps}
      component={RecipesContainer}
      Layout={RecipeEditComponent}
    />
  </Stack>
);

export default Index;
