import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Modal } from "./Modal";

describe("Modal Component", () => {
   it("renders the modal with title and children", () => {
      render(
         <Modal title="Test Title">
            <p>Test Content</p>
         </Modal>
      );

      expect(screen.getByTestId("modal")).toBeInTheDocument();
      expect(screen.getByTestId("modal-title")).toHaveTextContent("Test Title");
      expect(screen.getByTestId("modal-content")).toHaveTextContent("Test Content");
   });

   it("renders the modal without title", () => {
      render(
         <Modal title="">
            <p>Test Content</p>
         </Modal>
      );

      expect(screen.getByTestId("modal")).toBeInTheDocument();
      expect(screen.queryByTestId("modal-title")).toBeNull();
      expect(screen.getByTestId("modal-content")).toHaveTextContent("Test Content");
   });

   it("renders the modal with only children", () => {
      render(
         <Modal title="">
            <p>Only Content</p>
         </Modal>
      );

      expect(screen.getByTestId("modal")).toBeInTheDocument();
      expect(screen.queryByTestId("modal-title")).toBeNull();
      expect(screen.getByTestId("modal-content")).toHaveTextContent("Only Content");
   });

   it("renders the modal without children", () => {
      render(<Modal title="Title Only" />);

      expect(screen.getByTestId("modal")).toBeInTheDocument();
      expect(screen.getByTestId("modal-title")).toHaveTextContent("Title Only");
      expect(screen.getByTestId("modal-content")).toBeEmptyDOMElement();
   });
});