import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: [ true, 'Project name must be unique' ],
    },
    description: {
        type: String,
        required: false,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    fileTree: [
        {
            filename: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            }
        }
    ],
    chats: [
        {
            email: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            timestamp: {
                type: String,
                require: true
            },
        }
    ]

},{ timestamps: true })

const Project = mongoose.model('project', projectSchema)

export default Project;