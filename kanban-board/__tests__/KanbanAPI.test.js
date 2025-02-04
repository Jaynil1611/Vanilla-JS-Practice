import { KanbanAPI } from "../KanbanAPI.js";
import { describe, expect, test, jest } from "@jest/globals";

global.crypto = { randomUUID: () => "1" };

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

describe("Kanban - Store API Tests", () => {
  beforeEach(() => {
    global.localStorage = localStorageMock;
  });
  test("should get data from local storage when read API is called", () => {
    const tasks = KanbanAPI.getTasks();

    expect(tasks).toHaveLength(0);
    expect(localStorageMock.getItem).toHaveBeenCalled();
  });

  test("should get data from local storage when read API is called", () => {
    const task = KanbanAPI.insertTask(1, "New note");

    expect(task).toMatchObject({ content: "New note" });
    expect(localStorageMock.getItem).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });
});
