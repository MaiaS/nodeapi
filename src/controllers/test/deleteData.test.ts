// Testing controllers
import { deleteDataController } from "../deleteData";
import { storageService } from "../../services/accessStorage";
import { describe, expect, test, jest } from "@jest/globals";

describe("deleteDataController", () => {
  test("should return 200 if entry is deleted", () => {
    const mockRequest = {
      query: {
        id: "1",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // mock internal storageService
    const mockDelete = jest.fn().mockReturnValue({ message: "Success" });
    storageService.delete = mockDelete;

    deleteDataController(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "Success" });
  });

  test("should return 404 if entry is not found", () => {
    const mockRequest = {
      query: {
        id: "1",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // mock throw new Error("Could not find entry.")
    const mockDelete = jest.fn().mockImplementation(() => {
      throw new Error("Could not find entry.");
    });
    storageService.delete = mockDelete;

    deleteDataController(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Could not find entry.",
    });
  });

  test("should return 500 if error occurs while deleting entry", () => {
    const mockRequest = {
      query: {
        id: "1",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockDelete = jest.fn().mockImplementation(() => {
      throw new Error("Error occured while deleting entry.");
    });
    storageService.delete = mockDelete;

    deleteDataController(mockRequest as any, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Error occured while deleting entry.",
    });
  });
});
