//this is the model
import { IRoute } from "@models/CommonModel";
import { IUserOnboardInformation } from "../OnBoarding.OnBoardingStackScreen/Model.OnBoardingStackScreen";

export type TLoginScreenProps = IRoute<{ userInformation: IUserOnboardInformation }>;
