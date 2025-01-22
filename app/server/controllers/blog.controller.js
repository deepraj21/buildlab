import Blog from '../models/blog.model.js';

export const addBlog = async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        return res.status(201).json(blog);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const removeBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        return res.status(200).json({ message: 'Blog removed successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        return res.status(200).json(blogs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}; 