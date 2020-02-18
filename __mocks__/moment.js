export default jest.mock("moment", () => ({
  moment: () => {return ""}
}));