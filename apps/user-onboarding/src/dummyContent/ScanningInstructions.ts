import Images from '../common/utils/Images';
import { translate } from '../common/utils/translations/translate';

export const scanningInstructions = [
  {
    id: '0',
    icon: Images.instructIDcard1,
    title: translate('do_not_take_picture_flash'),
  },
  {
    id: '1',
    icon: Images.instructIDcard2,
    title: translate('do_not_take_login_angle'),
  },
  {
    id: '2',
    icon: Images.instructIDcard3,
    title: translate('do_not_take_device_hidden'),
  },
];
