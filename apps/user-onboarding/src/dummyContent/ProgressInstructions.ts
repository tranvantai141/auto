import Images from '../common/utils/Images';
import { translate } from '../common/utils/translations/translate';

export const mockDataInstructions = [
  {
    id: '0',
    icon: Images.instruction1,
    title: translate('do_not_take_picture_flash'),
  },
  {
    id: '1',
    icon: Images.instruction2,
    title: translate('do_not_take_login_angle'),
  },
  {
    id: '2',
    icon: Images.instruction3,
    title: translate('do_not_take_device_hidden'),
  },
];
