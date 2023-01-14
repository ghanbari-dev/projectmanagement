exports.schemaOptions = {
  toJSON: {
    virttuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
  toObject: { virttuals: true },
  timestamps: true,
  id: true,
  versionKey: false,
};
