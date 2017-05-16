/**
 * Created by admin on 22.02.17.
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskText: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: String, required: true },
});

const Task = mongoose.model('Task', TaskSchema);
