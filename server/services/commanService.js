export const commanService = {
  create: async (model, payload) => {
    try {
      // Dynamically create a new instance using the provided model
      const newEntity = new model(payload);

      // Save the data to the database
      const savedEntity = await newEntity.save();

      // Return a generalized response with the auto-generated _id and the entire payload
      return {
        message: `${model.modelName} successfully created`, // model.modelName provides the model's name
        data: {
          id: savedEntity._id, // MongoDB-generated _id
          ...payload, // Keep all other fields intact
        },
      };
    } catch (error) {
      console.error("Error creating record:", error);
      throw new Error("Internal server error");
    }
  },
  getAll: async (model, queryParams = {}) => {
    try {
      let {
        search_data,
        search_fields,
        sortBy,
        order,
        filter,
        fields,
        limit,
        page,
        ...filters
      } = queryParams;

      // Default sorting & pagination
      sortBy = sortBy || "createdAt";
      order = order === "desc" ? -1 : 1;
      limit = limit ? parseInt(limit) : 10;
      page = page ? parseInt(page) : 1;
      const skip = (page - 1) * limit;

      let query = { ...filters };

      // Handle JSON-based filter (if provided)
      if (filter) {
        try {
          query = { ...query, ...JSON.parse(filter) };
        } catch (error) {
          throw new Error(
            "Invalid filter format. It must be a valid JSON object."
          );
        }
      }

      // Search logic
      if (search_data && search_fields) {
        const fieldsArray = search_fields.split(",");
        query["$or"] = fieldsArray.map((field) => ({
          [field]: { $regex: search_data, $options: "i" }, // Case-insensitive search
        }));
      }
      // Select fields (projection)
      let projection = {};
      if (fields) {
        projection = fields.split(",").reduce((acc, field) => {
          acc[field] = 1;
          return acc;
        }, {});
      }

      // Fetch records
      const allRecords = await model
        .find(query, projection)
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit);

      // Count total records
      const totalRecords = await model.countDocuments(query);

      return {
        message: `${model.modelName} records fetched successfully`,
        totalRecords,
        page,
        totalPages: Math.ceil(totalRecords / limit),
        data: allRecords,
      };
    } catch (error) {
      console.error("Error fetching records:", error);
      throw new Error("Internal server error");
    }
  },

  getCount: async (model, filter) => {
    try {
      const count = await model.countDocuments(filter);
      const total = await model.countDocuments();
      return { total, count };
    } catch (error) {
      console.error("Error in getCount:", error);
      throw new Error("Error counting documents");
    }
  },

  getItemById: async (model, id) => {
    try {
      // Fetch the record by ID from the model
      const record = await model.findById(id);

      // If no record is found, return an appropriate message
      if (!record) {
        return {
          message: `${model.modelName} with ID not found`,
          data: null,
        };
      }

      // Return the found record
      return {
        message: `${model.modelName} data fetched successfully`,
        data: record,
      };
    } catch (error) {
      console.error("Error fetching record by ID:", error);
      throw new Error("Internal server error");
    }
  },
  deleteById: async (model, id) => {
    try {
      const document = await model.findById(id);
      if (!document) {
        throw new Error(`${model.modelName} not found`);
      }
      // Step 3: Delete the document
      await model.findByIdAndDelete(id);
      return {
        message: `${model.modelName} deleted successfully`,
        data: { id },
      };
    } catch (error) {
      console.error(`Error deleting ${model.modelName}:`, error);
      throw error; // Re-throw the error for the controller to handle
    }
  },
  deleteAll: async (model) => {
    try {
      // Step 3: Delete the document
      await model.deleteMany();
      return {
        message: `${model.modelName} deleted successfully`,
        // data: { id },
      };
    } catch (error) {
      console.error(`Error deleting ${model.modelName}:`, error);
      throw error; // Re-throw the error for the controller to handle
    }
  },
  update: async (model, id, payload) => {
    try {
      // Find the entity by ID and update it with the provided payload
      const updatedEntity = await model.findByIdAndUpdate(
        id,
        payload,
        { new: true } // Return the updated document
      );

      // If the entity is not found, throw an error
      if (!updatedEntity) {
        throw new Error(`${model.modelName} not found`);
      }

      // Return a generalized response with the updated data
      return {
        message: `${model.modelName} successfully updated`,
        data: updatedEntity,
      };
    } catch (error) {
      console.error("Error updating record:", error);
      throw new Error("Internal server error");
    }
  },
};
