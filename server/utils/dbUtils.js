/**
 * Generic helper to populate an array of ObjectIds with their corresponding documents.
 *
 * @param {Model} model - Mongoose model (e.g., Expertise, Category).
 * @param {Array} ids - Array of ObjectId values.
 * @param {Array|string} fields - Fields to select (e.g., ["_id", "name"] or "name _id").
 * @returns {Promise<Array>} Array of documents with selected fields.
 */
export const populateIdsWithDetails = async (model, ids, fields = ["_id"]) => {
  if (!Array.isArray(ids) || ids.length === 0) return [];

  const projection = Array.isArray(fields)
    ? Object.fromEntries(fields.map((f) => [f, 1]))
    : fields;

  const documents = await model.find({ _id: { $in: ids } }, projection).lean();
  return documents;
};

export const getDetailById = async (model, id, fields = ["_id"]) => {
  if (!id) return null;

  const projection = Array.isArray(fields)
    ? Object.fromEntries(fields.map((f) => [f, 1]))
    : fields;

  const doc = await model.findById(id, projection).lean();
  return doc;
};

export const getFileFieldData = (field) => {
  const uploaded = uploadedFiles[field] || [];
  const existing = [];

  const bodyField = req.body[field];
  if (Array.isArray(bodyField)) {
    bodyField.forEach((entry) => {
      try {
        const parsed = typeof entry === "string" ? JSON.parse(entry) : entry;
        if (parsed?.url) {
          existing.push(parsed.url);
        }
      } catch (err) {
        console.warn(`Failed to parse file entry for ${field}`, entry);
      }
    });
  }

  return [...existing, ...uploaded]; // Merge existing + new
};

export const getDocuments = async ({
  model,
  filter = {},
  fields = null,
  sort = null,
  limit = null,
  skip = null,
}) => {
  try {
    let query = model.find(filter);
    if (fields) query = query.select(fields);
    if (sort) query = query.sort(sort);
    if (limit) query = query.limit(limit);
    if (skip) query = query.skip(skip);
    return await query.exec();
  } catch (error) {
    console.error(`Error fetching documents from ${model.modelName}:`, error);
    throw error;
  }
};

export const countDocuments = async (Model, filter = {}) => {
  try {
    return await Model.countDocuments(filter);
  } catch (error) {
    console.error(`Error counting documents from ${Model.modelName}:`, error);
    throw error;
  }
};

export const createReferenceMap = async ({
  items,
  foreignKey,
  model,
  selectFields = "name",
}) => {
  const ids = [
    ...new Set(
      items
        .flatMap((item) => {
          const value = item?.[foreignKey];
          if (Array.isArray(value)) return value.map((v) => v?.toString());
          if (value) return [value.toString()];
          return [];
        })
        .filter(Boolean)
    ),
  ];

  if (ids.length === 0) return new Map();

  const docs = await model.find({ _id: { $in: ids } }).select(selectFields);
  return new Map(docs.map((doc) => [doc._id.toString(), doc]));
};
