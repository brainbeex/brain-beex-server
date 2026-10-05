import Application from "./applications.model.js";
import BaseService from "../../shared/BaseService.js";
import { getCompetitionById } from "../competitions/competitions.service.js"; // Centralized service import
import ApiError from "../../shared/ApiError.js";

const baseService = new BaseService(Application);

export const createApplication = async (data, authenticatedUser) => {
  const { competitionId } = data;
  
  // Enforce values derived directly from the authenticated session context
  const userId = authenticatedUser.uid;
  const userEmail = authenticatedUser.email;

  // Verify that the target competition exists
  const competition = await getCompetitionById(competitionId);
  if (!competition) {
    throw new ApiError(404, "Competition not found");
  }

  // Enforce application deadline checks
  const now = new Date();
  if (new Date(competition.deadline) < now) {
    throw new ApiError(400, "Application deadline has passed");
  }

  // Prevent duplicate submissions
  const existingApplication = await Application.findOne({ competitionId, userId });
  if (existingApplication) {
    throw new ApiError(409, "You already applied to this competition");
  }

  // Write record safely using baseService wrapper configurations
  return await baseService.create({
    ...data,
    userId,
    userEmail,
  });
};

export const getMyApplications = async (userId) => {
  return await Application.find({ userId })
    .populate("competitionId", "title organizer deadline")
    .sort({ createdAt: -1 });
};

export const getAllApplications = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.competitionId) filter.competitionId = query.competitionId;

  const total = await Application.countDocuments(filter);
  const applications = await Application.find(filter)
    .populate({ path: "competitionId", select: "title category organizer deadline" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    applications,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
};

export const updateApplicationStatus = async (id, data) => {
  const application = await baseService.update(id, data);
  if (!application) {
    throw new ApiError(404, "Application not found");
  }
  return application;
};

export const deleteApplication = async (id) => {
  const result = await baseService.delete(id);
  if (!result) {
    throw new ApiError(404, "Application not found");
  }
  return result;
};
