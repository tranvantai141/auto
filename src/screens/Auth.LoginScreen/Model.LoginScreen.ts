//this is the model
import { IRoute } from "@src/models/CommonModels";
import { IUserOnboardInformation } from "../OnBoarding.OnBoardingStackScreen/Model.OnBoardingStackScreen";

export type TLoginScreenProps = IRoute<{ userInformation: IUserOnboardInformation }>;
