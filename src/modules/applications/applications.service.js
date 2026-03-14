import Application from "./applications.model.js";
import Competition from "../competitions/competitions.model.js";


export const createApplication = async (data) => {
  const { competitionId, userId } = data;

  // Check if competition exists
  const competition = await Competition.findById(competitionId);

  if (!competition) {
    throw new Error("Competition not found");
  }

  // Check deadline
  const now = new Date();

  if (new Date(competition.deadline) < now) {
    throw new Error("Application deadline has passed");
  }

  // Prevent duplicate application
  const existingApplication = await Application.findOne({
    competitionId,
    userId,
  });

  if (existingApplication) {
    throw new Error("You already applied to this competition");
  }

  // Create application
  return await Application.create(data);
};


export const getMyApplications = async (userId) => {
  const applications = await Application.find({ userId })
    .populate("competitionId", "title organizer deadline")
    .sort({ createdAt: -1 });

  return applications;
};

export const getAllApplications = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

  const skip = (page - 1) * limit;

  const filter = {};

  if (query.status) {
    filter.status = query.status;
  }

  if (query.competitionId) {
    filter.competitionId = query.competitionId;
  }

  const total = await Application.countDocuments(filter);

  const applications = await Application.find(filter)
    .populate("competitionId", "title")
    .populate("userId", "name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    applications,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateApplicationStatus = async (id, data) => {
  const application = await Application.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  return application;
};

export const deleteApplication = async (id) => {
  const result = await Application.findByIdAndDelete(id);

  return result;
};