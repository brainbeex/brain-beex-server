import * as applicationService from "./applications.service.js";
import asyncHandler from "../../utils/asyncHandler.js"; // Handled default import correctly

// CREATE APPLICATION
export const createApplication = asyncHandler(async (req, res) => {
  const data = {
    ...req.body,
    userId: req.user.uid,
    userEmail: req.user.email,
  };

  // Fixed bug: Routed data through service layer to trigger deadline and duplicate validations
  const application = await applicationService.createApplication(data);

  res.status(201).json({
    success: true,
    data: application,
  });
});

// GET CURRENT USER'S APPLICATIONS
export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await applicationService.getMyApplications(
    req.user.uid
  );

  res.json({
    success: true,
    data: applications,
  });
});

// GET ALL SYSTEM APPLICATIONS
export const getAllApplications = asyncHandler(async (req, res) => {
  const result = await applicationService.getAllApplications(req.query);

  res.json({
    success: true,
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

  res.json({
    success: true,
    message: "Application updated successfully",
    data: application,
  });
});

// DELETE APPLICATION
export const deleteApplication = asyncHandler(async (req, res) => {
  await applicationService.deleteApplication(req.params.id);

  res.json({
    success: true,
    message: "Application deleted successfully",
  });
});
