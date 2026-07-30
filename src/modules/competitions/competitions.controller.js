import * as competitionService from "./competitions.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import sendResponse from "../../shared/sendResponse.js";

// CREATE A COMPETITION
export const createCompetition = asyncHandler(async (req, res) => {
  const data = {
    ...req.body,
    createdBy: req.user.email,
  };

  // Delegating database operations directly to the service layer
  const competition = await competitionService.createCompetition(data);

  // res.status(201).json({
  //   success: true,
  //   data: competition,
  // });
  sendResponse(res, {
    statusCode: 201,
    message: "Competition created successfully",
    data: competition,
  });
}); 

// GET ALL COMPETITIONS WITH PAGINATION/FILTERS
export const getCompetitions = asyncHandler(async (req, res) => {
  const result = await competitionService.getCompetitions(req.query);

  // res.json({
  //   success: true,
  //   data: result.competitions,
  //   pagination: result.pagination,
  // });
  sendResponse(res, {
    statusCode: 200,
    data: result.competitions,
    pagination: result.pagination,
  });
});

// GET A SINGLE COMPETITION BY ID
export const getCompetition = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // const competition = await competitionService.getCompetitionById(id);
  const competition = await competitionService.getCompetitionById(req.params.id);

  // res.json({
  //   success: true,
  //   data: competition,
  // });
  sendResponse(res, {
    statusCode: 200,
    data: competition,
  });
});

// UPDATE AN EXISTING COMPETITION
export const updateCompetition = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // const updated = await competitionService.updateCompetition(id, req.body);
  const updated = await competitionService.updateCompetition(req.params.id, req.body);

  // res.json({
  //   success: true,
  //   data: updated,
  // });
  sendResponse(res, {
    statusCode: 200,
    message: "Competition updated successfully",
    data: updated,
  });
});

// DELETE A COMPETITION
export const deleteCompetition = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // await competitionService.deleteCompetition(id);
  await competitionService.deleteCompetition(req.params.id);

  // res.json({
  //   success: true,
  //   message: "Competition deleted",
  // });
  sendResponse(res, {
    statusCode: 200,
    message: "Competition deleted successfully",
  });
});
