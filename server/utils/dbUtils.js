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
  console.log("doc", doc);
  return doc;
};


   export const getFileFieldData = (field) => {
      const uploaded = uploadedFiles[field] || [];
      const existing = [];

      const bodyField = req.body[field];
      if (Array.isArray(bodyField)) {
        bodyField.forEach(entry => {
          try {
            const parsed = typeof entry === 'string' ? JSON.parse(entry) : entry;
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