import Competition from "./competitions.model.js";

export const createCompetition = async (data) => {
  if (new Date(data.deadline) < new Date()) {
    throw new Error("Deadline cannot be in the past.");
  }

  return await Competition.create(data);
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



export const getCompetitionById = (id) => {
  return Competition.findById(id);
};

export const updateCompetition = (id, data) => {
  return Competition.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCompetition = (id) => {
  return Competition.findByIdAndDelete(id);
};