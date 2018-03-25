import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getBlenders } from '../actions/blenders';

class BlenderListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    blenders: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      blenders: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getBlenders: PropTypes.func.isRequired,

  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchBlenders();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchBlenders = () => {
    return this.props.getBlenders()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  render = () => {
    const { Layout, blenders, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        blenderId={id}
        error={blenders.error}
        loading={blenders.loading}
        blenders={blenders.blenders}
        reFetch={() => this.fetchBlenders()}
      />
    );
  }
}

const mapStateToProps = state => ({
  blenders: state.blenders || {},
});

const mapDispatchToProps = {
  getBlenders,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlenderListing);
