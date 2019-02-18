import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native';
import { connect } from 'react-redux';

import translations from '../../../i18n';
import { logout } from '../../../store/session';
import { loadCategoryListIfNeeded } from '../../../store/categoryList';

import ProfileComponent from './component';

class ProfileContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: translations.t('profile'),
      headerRight: params.signedIn && (
        <Button
          title={translations.t('logout')}
          color="white"
          onPress={() => params.logout()}
        />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.handleSignInButtonPress = () => {
      this.props.navigation.navigate('SignIn');
    };

    this.handleSignUpButtonPress = () => {
      this.props.navigation.navigate('SignUp');
    };
  }

  componentDidMount() {
    this.props.loadCategoryListIfNeeded();

    this.props.navigation.setParams({
      signedIn: this.props.signedIn,
      logout: this.props.logout,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.signedIn !== this.props.signedIn) {
      this.props.navigation.setParams({
        signedIn: this.props.signedIn,
      });
    }
  }

  render() {
    return (
      <ProfileComponent
        user={this.props.user}
        signedIn={this.props.signedIn}
        onSignInButtonPress={this.handleSignInButtonPress}
        onSignUpButtonPress={this.handleSignUpButtonPress}
      />
    );
  }
}

ProfileContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  signedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  loadCategoryListIfNeeded: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.session.user,
  signedIn: state.session.user !== null,
});

const mapDispatchToProps = {
  logout,
  loadCategoryListIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
