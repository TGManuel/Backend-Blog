import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    author: {
      type: String,
      default: "Anonymous",
    },
    content: {
      type: String,
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

commentSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Comment = model("Comment", commentSchema);

export default Comment;