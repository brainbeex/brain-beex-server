export default class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async find(filter = {}) {
    return await this.model.find(filter);
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}
