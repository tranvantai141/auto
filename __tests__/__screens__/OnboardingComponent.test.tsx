import { fireEvent, render } from "@testing-library/react-native";
import { OnboardingComponent } from "@src/components";
import styles from "@src/components/OnboardingComponent/Styles.OnboardingComponent";
import { PURPOSE_LIST } from "@src/components/OnboardingComponent/Model.OnboardingComponent";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("react-native-date-picker", () => "DatePicker");

describe("OnboardingComponent", () => {
  test("It should successfully complete onboarding with valid inputs", async () => {
    const { getByTestId, queryByTestId } = render(<OnboardingComponent />);
    const nextButton = getByTestId("nextButton");
    expect(nextButton).toBeDisabled();

    // Assume we start at step one
    expect(getByTestId("username-textinput")).toBeTruthy();
    expect(getByTestId("id-textinput")).toBeTruthy();

    // Input valid values
    fireEvent.changeText(getByTestId("username-textinput"), "Test User");
    fireEvent.changeText(getByTestId("id-textinput"), "123456789012");

    // Click next
    fireEvent.press(nextButton);

    // Now we should be in step two
    expect(getByTestId("email-textinput")).toBeTruthy();
    expect(getByTestId("phoneNumber-textinput")).toBeTruthy();

    // Input valid values
    fireEvent.changeText(getByTestId("email-textinput"), "testuser@example.com");
    fireEvent.changeText(getByTestId("phoneNumber-textinput"), "1234567890");

    fireEvent.press(getByTestId("setDateModalVisible"));

    const datePicker = getByTestId("DatePicker");
    expect(datePicker).toBeTruthy();

    fireEvent(datePicker, "onConfirm", new Date());

    const errorText = getByTestId("errorText");
    expect(errorText).toBeTruthy();

    fireEvent.press(getByTestId("setDateModalVisible"));

    fireEvent(datePicker, "onConfirm", styles.ASSUMED_ONLY_15_YEARS_OLD_TO_HAVE_E_BANK_ACCOUNT);
    expect(queryByTestId("errorText")).toBeNull();

    // Click next
    fireEvent.press(nextButton);

    // Now we should be in step three
    const moneyTransferPurpose = getByTestId(`purpose-option-${PURPOSE_LIST[0].valueCode}`);
    fireEvent.press(moneyTransferPurpose);

    // Click next
    expect(nextButton).toBeEnabled();
    fireEvent.press(nextButton);

    // Now we are in success
    const successText = getByTestId(`${styles.TEST_ID}-success-text`);
    expect(successText).toBeTruthy();
  });
});
