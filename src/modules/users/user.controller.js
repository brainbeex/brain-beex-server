import * as userService from "./user.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../shared/sendResponse.js";
import mongoose from "mongoose";


export const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  sendResponse(res, user, 201);
});

export const getUsers = asyncHandler(async (req, res) => {

  const users = await userService.getUsers();

  res.json({
    success: true,
    data: users
  });

});

export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId first
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("Invalid user id");
    err.status = 400;
    throw err;
  }

  const user = await userService.getUserById(id);

  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  sendResponse(res, user);
});