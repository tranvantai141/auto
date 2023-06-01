import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { OnboardingComponent } from "@src/components";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("OnboardingComponent", () => {
  test("It should successfully complete onboarding with valid inputs", async () => {
    const { getByTestId, getAllByText } = render(<OnboardingComponent />);

    // Assume we start at step one
    expect(getByTestId("username-textinput")).toBeTruthy();
    expect(getByTestId("id-textinput")).toBeTruthy();

    // Input valid values
    fireEvent.changeText(getByTestId("username-textinput"), "Test User");
    fireEvent.changeText(getByTestId("id-textinput"), "123456789012");

    // Click next
    fireEvent.press(getAllByText("→")[0]);

    // Now we should be in step two
    expect(getByTestId("email-textinput")).toBeTruthy();
    expect(getByTestId("phoneNumber-textinput")).toBeTruthy();

    // Input valid values
    fireEvent.changeText(getByTestId("email-textinput"), "testuser@example.com");
    fireEvent.changeText(getByTestId("phoneNumber-textinput"), "1234567890");

    // Click next
    fireEvent.press(getAllByText("→")[0]);
  });
});
