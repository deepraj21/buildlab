import projectModel from '../models/project.model.js';

export const getChats = async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await projectModel.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json({ chats: project.chats });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
}; 