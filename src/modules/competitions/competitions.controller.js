import * as competitionService from "./competitions.service.js";

import Competition from "../../models/competitions.model.js";

export const createCompetition = async (req, res) => {
  try {
    const data = req.body;

    const competition = await Competition.create(data);

    res.status(201).json({
      success: true,
      data: competition,
    });
  } catch (error) {
    console.error("CREATE COMP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create competition",
    });
  }
};


export const getCompetitions = async (req, res) => {
  const result = await competitionService.getCompetitions(req.query);

  res.json({
    success: true,
    data: result.competitions,
    pagination: result.pagination,
  });
};


export const getCompetition = async (req, res) => {
  const { id } = req.params;

  const competition = await competitionService.getCompetitionById(id);

  res.json({
    success: true,
    data: competition,
  });
};

export const updateCompetition = async (req, res) => {
  const { id } = req.params;

  const updated = await competitionService.updateCompetition(
    id,
    req.body
  );

  res.json({
    success: true,
    data: updated,
  });
};

export const deleteCompetition = async (req, res) => {
  const { id } = req.params;

  await competitionService.deleteCompetition(id);

  res.json({
    success: true,
    message: "Competition deleted",
  });
};