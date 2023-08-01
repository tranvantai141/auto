import { Dimensions, Platform, StatusBar } from "react-native";

class ScaleManager {
  private static readonly width = Dimensions.get("window").width;

  private static readonly height = Dimensions.get("window").height;

  private static readonly fontScale = Dimensions.get("window").fontScale;

  private static readonly STATUSBAR_DEFAULT_HEIGHT = 20;

  private static readonly STATUSBAR_X_HEIGHT = 44;

  private static readonly STATUSBAR_IP12_HEIGHT = 47;

  private static readonly STATUSBAR_IP12MAX_HEIGHT = 47;

  private static readonly X_WIDTH = 375;

  private static readonly X_HEIGHT = 812;

  private static readonly XSMAX_WIDTH = 414;

  private static readonly XSMAX_HEIGHT = 896;

  private static readonly IP12_WIDTH = 390;

  private static readonly IP12_HEIGHT = 844;

  private static readonly IP12MAX_WIDTH = 428;

  private static readonly IP12MAX_HEIGHT = 926;

  private statusBarHeight = ScaleManager.STATUSBAR_DEFAULT_HEIGHT;

  constructor() {
    this._checkHeight();
  }

  private _checkHeight() {
    if (Platform.OS === "ios" && !Platform.isPad) {
      if (ScaleManager.width === ScaleManager.X_WIDTH && ScaleManager.height === ScaleManager.X_HEIGHT) {
        this.statusBarHeight = ScaleManager.STATUSBAR_X_HEIGHT;
      } else if (ScaleManager.width === ScaleManager.XSMAX_WIDTH && ScaleManager.height === ScaleManager.XSMAX_HEIGHT) {
        this.statusBarHeight = ScaleManager.STATUSBAR_X_HEIGHT;
      } else if (ScaleManager.width === ScaleManager.IP12_WIDTH && ScaleManager.height === ScaleManager.IP12_HEIGHT) {
        this.statusBarHeight = ScaleManager.STATUSBAR_IP12_HEIGHT;
      } else if (
        ScaleManager.width === ScaleManager.IP12MAX_WIDTH &&
        ScaleManager.height === ScaleManager.IP12MAX_HEIGHT
      ) {
        this.statusBarHeight = ScaleManager.STATUSBAR_IP12MAX_HEIGHT;
      }
    }
  }

  public getStatusBarHeight() {
    return Platform.select({
      ios: this.statusBarHeight,
      android: StatusBar.currentHeight,
      default: 0,
    });
  }

  public static STATUSBAR_HEIGHT = new ScaleManager().getStatusBarHeight();

  private static guidelineBaseWidth = 810;

  private static guidelineBaseHeight = 1080;

  public static WINDOW_WIDTH = this.width < this.height ? this.width : this.height;

  public static WINDOW_HEIGHT = this.width > this.height ? this.width : this.height;

  private static fScale = (size: number) => size / this.fontScale;

  public static scaleSizeWidth = (size: number) => (this.WINDOW_WIDTH / this.guidelineBaseWidth) * size;

  public static PADDING_SIZE = ScaleManager.scaleSizeWidth(16);

  public static scaleSizeHeight = (size: number) => (this.WINDOW_HEIGHT / this.guidelineBaseHeight) * size;

  public static WIDTH_SCREEN_MINUS_PADDING = ScaleManager.WINDOW_WIDTH - this.scaleSizeHeight(24);

  public static BUTTON_HEIGHT = ScaleManager.scaleSizeHeight(44);

  public static TEXT_INPUT_HEIGHT = ScaleManager.scaleSizeHeight(48);

  public static HEADER_COMPONENT_HEIGHT = ScaleManager.scaleSizeHeight(50);

  public static BOTTOM_TAB_HEIGHT = ScaleManager.scaleSizeHeight(90);

  public static BACKGROUND_HEADER_HEIGHT = ScaleManager.scaleSizeHeight(110);

  public static MESSAGE_MARGIN_TOP = ScaleManager.scaleSizeHeight(10) + ScaleManager.STATUSBAR_HEIGHT;

  public static moderateScale = (size: number, factor = 0.5) =>
    (this.fScale(size) || 0) + (this.scaleSizeWidth(this.fScale(size)) - (this.fScale(size) || 0)) * factor;

  public static isIphoneX = () => {
    const dimension = Dimensions.get("window");
    return (
      Platform.OS === "ios" &&
      !Platform.isPad &&
      (dimension.height === 812 ||
        dimension.width === 812 ||
        dimension.height === 896 ||
        dimension.width === 896 ||
        dimension.height === 844 ||
        dimension.width === 844 ||
        dimension.height === 926 ||
        dimension.width === 926)
    );
  };

  public static ifIphoneX = <T, G>(iphoneXStyle: T, regularStyle: G) => {
    if (this.isIphoneX()) {
      return iphoneXStyle;
    }
    return regularStyle;
  };
}

export default ScaleManager;
