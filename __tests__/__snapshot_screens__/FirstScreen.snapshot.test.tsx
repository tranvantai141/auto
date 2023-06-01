import { FirstScreen } from "@src/screens";
import renderer from "react-test-renderer";

it("FirstScreen renders correctly", () => {
  const tree = renderer.create(<FirstScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
