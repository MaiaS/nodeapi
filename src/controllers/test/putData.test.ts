import { Request, Response } from "express";
import { storageService } from "../../services/accessStorage";
import { putDataController } from "../putData";
import { describe, expect, jest, test } from "@jest/globals";
import { PutRecordRequest } from "../../utils/types";

describe("putDataController", () => {
  test("should return 200 if entry is updated", () => {
    // mock request
    const mockRequest = {
      body: {
        id: "1",
        entry: "test",
      },
    } as Request<Record<string, any>, any, PutRecordRequest>;

    // mock response
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const expectedResponse = {
      id: "1",
      entry: "test",
    };
    const mockUpdate = jest
      .fn()
      .mockReturnValue(expectedResponse) as typeof storageService.write;

    storageService.write = mockUpdate;

    // call controller function
    putDataController(mockRequest, mockResponse);

    // assert response
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Success",
      data: expectedResponse,
    });
  });

  test("should return 404 if entry is not found", () => {
    const mockRequest = {
      body: {
        id: "1",
        entry: "test",
      },
    } as Request<Record<string, any>, any, PutRecordRequest>;

    // mock response
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockWrite = jest.fn().mockImplementation(() => {
      throw new Error("Could not find entry.");
    });
    storageService.write = mockWrite as typeof storageService.write;

    putDataController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Could not find entry.",
    });
  });

  test("should return 500 if error occurs while updating entry", () => {
    const mockRequest = {
      body: {
        id: "1",
        entry: "test",
      },
    } as Request<Record<string, any>, any, PutRecordRequest>;

    // mock response
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockWrite = jest.fn().mockImplementation(() => {
      throw new Error("any error");
    });

    storageService.write = mockWrite as typeof storageService.write;

    putDataController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Error occured while updating entry.",
    });
  });
});
