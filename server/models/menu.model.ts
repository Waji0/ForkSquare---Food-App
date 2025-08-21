import mongoose, { Document, Model } from "mongoose";

export interface IMenu {
    // _id: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    // image: string;
    imageUrl: string;
    imageId: string;
}

export interface IMenuDocument extends IMenu, Document {
    createdAt: Date;
    updatedAt: Date;
}

const menuSchema = new mongoose.Schema<IMenuDocument>({
  
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  imageUrl: {
    type: String,
    required: true
  },

  imageId: {
    type: String,
    required: true
  },

},{timestamps: true});

// export const Menu = mongoose.model("Menu", menuSchema);
export const Menu : Model<IMenuDocument> = mongoose.model<IMenuDocument>("Menu", menuSchema);