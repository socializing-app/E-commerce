const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Permission name is required."],
    },
  },
  {
    timestamps: true,
  }
);

const PermissionModel = mongoose.model("Permission", permissionSchema);

module.exports = PermissionModel;