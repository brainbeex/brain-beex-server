import * as competitionService from "./competitions.service.js";

export const createCompetition = async (req, res) => {
  const data = req.body;

  const competition = await competitionService.createCompetition(data);

  res.json({
    success: true,
    data: competition,
  });
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