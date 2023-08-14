//this is the model
import { IRoute } from "@src/models/CommonModel";
import { IUserOnboardInformation } from "../OnBoarding.OnBoardingStackScreen/Model.OnBoardingStackScreen";

export type TLoginScreenProps = IRoute<{ userInformation: IUserOnboardInformation }>;
