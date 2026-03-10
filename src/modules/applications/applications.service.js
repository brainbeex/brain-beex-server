import Application from "./applications.model.js";

export const createApplication = async (data) => {
  const { competitionId, userId } = data;

  // Prevent duplicate application
  const existingApplication = await Application.findOne({
    competitionId,
    userId,
  });

  if (existingApplication) {
    throw new Error("You already applied to this competition");
  }

  const application = await Application.create(data);

  return application;
};

export const getMyApplications = async (userId) => {
  const applications = await Application.find({ userId })
    .populate("competitionId", "title organizer deadline")
    .sort({ createdAt: -1 });

  return applications;
};

export const getAllApplications = async () => {
  const applications = await Application.find()
    .populate("competitionId", "title")
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  return applications;
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