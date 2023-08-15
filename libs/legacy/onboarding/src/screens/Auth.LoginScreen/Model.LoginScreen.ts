//this is the model
import { IRoute } from '@skeleton-app/sdk-managers/models';
import { IUserOnboardInformation } from '../OnBoarding.OnBoardingStackScreen/Model.OnBoardingStackScreen';

export type TLoginScreenProps = IRoute<{
  userInformation: IUserOnboardInformation;
}>;
