import { translate } from '../common/utils/translations/translate';
export const servicesList = [
  {
    id: 0,
    name: translate('open_cif'),
    image: require('../assets/images/services/cif.png'),
  },
  {
    id: 1,
    name: translate('open_current_account'),
    image: require('../assets/images/services/user_default.png'),
  },
  {
    id: 2,
    name: translate('register_vcb'),
    image: require('../assets/images/services/icon_app.png'),
  },
  {
    id: 3,
    name: translate('open_debit_card'),
    image: require('../assets/images/services/card.png'),
  },
];
