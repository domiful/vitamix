import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getDevices, getDevice } from '../actions/devices';

class DeviceListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    devices: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      devices: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getDevices: PropTypes.func.isRequired,
    getDevice: PropTypes.func.isRequired,

  }

  static defaultProps = {
    match: null,
  }

  componentDidMount () {
    //if(!device) this.fetchDevice(deviceId);
    this.fetchDevices();
  }

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchDevices = () => {
    return this.props.getDevices()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  fetchDevice = (device) => {
    return this.props.getDevice(device)
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  render = () => {
    const { Layout, devices, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        deviceId={id}
        error={devices.error}
        loading={devices.loading}
        devices={devices.devices}
        reFetch={() => this.fetchDevices()}
        fetchOne={(f) => this.fetchDevice(f)}
      />
    );
  }
}

const mapStateToProps = state => ({
  devices: state.devices || [],
  device: state.device || null,
});

const mapDispatchToProps = {
  getDevices,
  getDevice
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceListing);
