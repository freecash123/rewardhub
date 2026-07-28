const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 500,
    },
    content: {
      type: String,
      required: true,
    },
    featuredImage: String,
    category: {
      type: String,
      required: true,
      enum: ['announcements', 'guides', 'crypto', 'rewards', 'updates', 'general'],
    },
    tags: [String],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    publishedAt: Date,
    seoMetadata: {
      metaTitle: String,
      metaDescription: String,
      ogImage: String,
      canonicalUrl: String,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    readTime: Number,
  },
  {
    timestamps: true,
  }
);

blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ status: 1 });
blogPostSchema.index({ publishedAt: -1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);
