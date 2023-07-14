import { by, device, element, expect, waitFor } from "detox";
import { PURPOSE_LIST } from "@src/components/OnboardingComponent/Model.OnboardingComponent";
import styles from "@src/components/OnboardingComponent/Styles.OnboardingComponent";

describe("OnboardingComponent", () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it("It should successfully complete onboarding with valid inputs", async () => {
    // Assume we start at step one
    await waitFor(element(by.id("username-textinput")))
      .toBeVisible()
      .withTimeout(100);
    await waitFor(element(by.id("id-textinput")))
      .toBeVisible()
      .withTimeout(100);

    // Input valid values
    await element(by.id("username-textinput")).typeText("Test User");
    await element(by.id("id-textinput")).typeText("123456789012");

    // Close the keyboard
    if (device.getPlatform() === "ios") {
      await element(by.id("id-textinput")).typeText("\n");
    } else {
      await device.pressBack();
    }

    // Wait for the keyboard to be closed
    await waitFor(element(by.id("nextButton")))
      .toBeVisible()
      .withTimeout(2000);
    await element(by.id("nextButton")).tap();

    await waitFor(element(by.id("email-textinput")))
      .toBeVisible()
      .withTimeout(100);
    await waitFor(element(by.id("phoneNumber-textinput")))
      .toBeVisible()
      .withTimeout(100);

    await element(by.id("email-textinput")).typeText("testuser@example.com");
    await element(by.id("phoneNumber-textinput")).typeText("1234567890");

    if (device.getPlatform() === "ios") {
      await element(by.id("phoneNumber-textinput")).typeText("\n");
    } else {
      await device.pressBack();
    }

    // Click next
    await waitFor(element(by.id("nextButton")))
      .toBeVisible()
      .withTimeout(300);
    await element(by.id("nextButton")).tap();

    // Assume the date picker is visible
    await waitFor(element(by.id("DatePicker"))).toBeVisible();

    // The interaction with the DatePicker has to be done in the application code

    // Click next
    await element(by.id("nextButton")).tap();

    // Now we should be in step three
    const purposeOptionId = `OnboardingComponent-${PURPOSE_LIST[0].name}`;
    await waitFor(element(by.id(purposeOptionId)))
      .toBeVisible()
      .withTimeout(100);
    await element(by.id(purposeOptionId)).tap();

    // Click next
    await element(by.id("nextButton")).tap();

    // Now we are in success
    const successTextId = `${styles.TEST_ID}-success-text`;
    await waitFor(element(by.id(successTextId)))
      .toBeVisible()
      .withTimeout(100);
  });
});
