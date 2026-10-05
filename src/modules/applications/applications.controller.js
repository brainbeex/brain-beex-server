import * as applicationService from "./applications.service.js";
import asyncHandler from "../../utils/asyncHandler.js"; // Handled default import correctly
import sendResponse from "../../shared/sendResponse.js"; // Single source of truth response

// CREATE APPLICATION
export const createApplication = asyncHandler(async (req, res) => {
  // Controller simply extracts the body array parameters directly
  const data = {
    ...req.body,
  };

  // 🛠️ FIXED: Passes req.user forward to offload parameter mapping rules to the service
  const application = await applicationService.createApplication(data, req.user);

  sendResponse(res, {
    statusCode: 201,
    message: "Application submitted successfully",
    data: application,
  });
});

// GET CURRENT USER'S APPLICATIONS
export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await applicationService.getMyApplications(
    req.user.uid
  );
  sendResponse(res, {
    statusCode: 200,
    data: applications,
  });
});

// GET ALL SYSTEM APPLICATIONS
export const getAllApplications = asyncHandler(async (req, res) => {
  const result = await applicationService.getAllApplications(req.query);

  sendResponse(res, {
    statusCode: 200,
    data: result.applications,
    pagination: result.pagination,
  });
});

// UPDATE APPLICATION STATUS
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await applicationService.updateApplicationStatus(
    req.params.id,
    req.body
  );

  
  sendResponse(res, {
    statusCode: 200,
    message: "Application updated successfully",
    data: application,
  });
});

// DELETE APPLICATION
export const deleteApplication = asyncHandler(async (req, res) => {
  await applicationService.deleteApplication(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    message: "Application deleted successfully",
  });
});
