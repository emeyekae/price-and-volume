import React from "react";
import Profile from "./ProfileForm";
import { UserProvider } from "../testUtils";

// TODO: woefully under-tested!

it("matches snapshot", function () {
  const { asFragment } = render(
        <Profile />
  );
  expect(asFragment()).toMatchSnapshot();
});
