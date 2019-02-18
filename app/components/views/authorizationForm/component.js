import React from 'react';
import { ScrollView } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import COLORS from '../../../constants/colors';
import FORMS from '../../../constants/reduxForms';
import translations from '../../../i18n';
import FormTextInput from '../../views/formTextInput';

const AuthorizationForm = () => (
  <ScrollView
    keyboardShouldPersistTaps="handled"
    keyboardDismissMode="on-drag"
  >
    <Field
      name="email"
      autoFocus
      placeholder={translations.t('email')}
      selectionColor={COLORS.BRAND}
      autoCapitalize="none"
      keyboardType="email-address"
      component={FormTextInput}
    />
    <Field
      name="password"
      secureTextEntry
      placeholder={translations.t('password')}
      selectionColor={COLORS.BRAND}
      component={FormTextInput}
    />
  </ScrollView >
);

export default reduxForm({ form: FORMS.AUTHORIZATION })(AuthorizationForm);
