import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import FORMS from '../../../constants/reduxForms';
import translations from '../../../i18n';
import { signIn } from '../../../store/session';

import SignInComponent from './component';

class SignInContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || { disabled: true };

    return {
      headerRight: params.loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Button
          title={translations.t('sign_in')}
          color="white"
          disabled={params.disabled}
          onPress={() => params.signIn()}
        />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.handleSignInButtonPress = () => {
      Keyboard.dismiss();

      const { email, password } = this.props.formValues;

      this.props.signIn(email, password);
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      loading: this.props.loading,
      disabled: true,
      signIn: this.handleSignInButtonPress,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.signedIn) {
      this.props.navigation.goBack();
    }

    if (prevProps.loading !== this.props.loading) {
      this.props.navigation.setParams({
        loading: this.props.loading,
      });
    }

    if (prevProps.formValues !== this.props.formValues) {
      const isFormValuesObjectExist = this.props.formValues !== undefined;
      let isFormValuesPropertiesExist = false;

      if (isFormValuesObjectExist) {
        const { formValues } = this.props;
        const isEmailExist = formValues.email !== undefined;
        const isPasswordExist = formValues.password !== undefined;

        isFormValuesPropertiesExist = isEmailExist && isPasswordExist;
      }

      this.props.navigation.setParams({
        disabled: !(isFormValuesObjectExist && isFormValuesPropertiesExist),
      });
    }

    if (!prevProps.error && this.props.error) {
      Alert.alert(translations.t('error'), this.props.error);
    }
  }

  render() {
    return (
      <SignInComponent />
    );
  }
}

SignInContainer.propTypes = {
  navigation: PropTypes.shape({
    setParams: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  signedIn: PropTypes.bool.isRequired,
  error: PropTypes.string,
  formValues: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  signIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.session.loading,
  signedIn: state.session.user !== null,
  error: state.session.error,
  formValues: getFormValues(FORMS.AUTHORIZATION)(state),
});

const mapDispatchToProps = {
  signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
