import axios from 'axios';

import CONFIGS from '../constants/firebaseConfigs';
import HEADERS from '../constants/restHeaders';

export default axios.create({
  baseURL: `https://firestore.googleapis.com/v1beta1/projects/${CONFIGS.PROJECT_ID}/databases/${CONFIGS.DATABASE_NAME}/documents`,
  headers: HEADERS,
});
