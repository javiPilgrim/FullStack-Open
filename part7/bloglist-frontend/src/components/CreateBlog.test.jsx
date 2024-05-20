import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CreateBlog from "./CreateBlog";
import userEvent from "@testing-library/user-event";

describe("<Blog />", () => {
  let container;
  const newBlog = jest.fn();

  beforeEach(() => {
    container = render(<CreateBlog createNewBlog={newBlog} />).container;
  });

  test(" The form calls the event handler it received as props with the correct details ", async () => {
    const user = userEvent.setup();

    const inputTitle = screen.getByPlaceholderText("title");
    const inputAuthor = screen.getByPlaceholderText("author");
    const inputUrl = screen.getByPlaceholderText("url");
    const sendButton = screen.getByText("Create");

    await user.type(inputTitle, "Test Title");
    await user.type(inputAuthor, "Test Author");
    await user.type(inputUrl, "Test Url");
    await user.click(sendButton);

    expect(newBlog.mock.calls).toHaveLength(1);
    expect(newBlog.mock.calls[0][0].title).toBe("Test Title");
    expect(newBlog.mock.calls[0][0].author).toBe("Test Author");
    expect(newBlog.mock.calls[0][0].url).toBe("Test Url");
  });
});
