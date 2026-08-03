import Competition from "./competitions.model.js";
import BaseService from "../../shared/BaseService.js";
import ApiError from "../../shared/ApiError.js";

const baseService = new BaseService(Competition);

export const createCompetition = async (data) => {
  if (new Date(data.deadline) < new Date()) {
    // throw new Error("Deadline cannot be in the past.");
    throw new ApiError(400, "Deadline cannot be in the past.");
  }

  return await baseService.create(data);
};


export const getCompetitions = async (query) => {
  let { page = 1, limit = 10, search, category, status, sort = "newest" } = query;

  page = Number(page);
  limit = Number(limit);

  const filter = {};

  // search by title
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  // filter by category
  if (category) {
    filter.category = category;
  }

  // filter by deadline status
  if (status === "active") {
    filter.deadline = { $gte: new Date() };
  }

  if (status === "expired") {
    filter.deadline = { $lt: new Date() };
  }

  // sorting
  let sortOption = { createdAt: -1 };

  if (sort === "oldest") {
    sortOption = { createdAt: 1 };
  }

  if (sort === "deadline") {
    sortOption = { deadline: 1 };
  }

  const competitions = await Competition.find(filter)
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Competition.countDocuments(filter);

  return {
    competitions,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};



export const getCompetitionById = async (id) => {
  const competition = await baseService.findById(id);
  if (!competition) {
    throw new ApiError(404, "Competition not found");
  }
  return competition;
  // return Competition.findById(id);
};

export const updateCompetition = async (id, data) => {
  const updated = await baseService.update(id, data, { new: true });
  if (!updated) {
    throw new ApiError(404, "Competition not found to update");
  }
  return updated;
  // return Competition.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCompetition = async (id) => {
  const result = await baseService.delete(id);
  if (!result) {
    throw new ApiError(404, "Competition not found to delete");
  }
  return result;
  // return Competition.findByIdAndDelete(id);
};