import RoomsMenu from "../components/landing/Rooms/RoomsMenu";
import { render, screen } from "@testing-library/react";
import { store } from "../redux/store";
import { Provider } from "react-redux";

describe("Rooms Menu Testing", () => {
  test("should include room count > 0", async () => {
    render(
      <Provider store={store}>
        <RoomsMenu />
      </Provider>
    );
    const roomCountElement = screen.queryByTestId("room-count");
    expect(roomCountElement).not.toBeNull();
    if (roomCountElement) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(parseInt(roomCountElement.textContent || "0")).toBeGreaterThanOrEqual(1);
    }
  });
});
