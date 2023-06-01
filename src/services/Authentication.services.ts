import ServicesManager from "@src/helper/ServicesManager";
class AuthenticationServices {
  private static axiosInstance = new ServicesManager(ServicesManager.AUTH_URL).getAxiosInstance(false);

  public static getProfileApi = (): Promise<null> => {
    return this.axiosInstance.get(`auth/me`).then((res) => res.data);
  };
}

export default AuthenticationServices;
