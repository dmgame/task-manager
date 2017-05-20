import mongoose from "mongoose";

import '../models/userModel.js';
import '../models/taskModel.js';


const User = mongoose.model('User');
const Task = mongoose.model('Task');

export function setUpConnection() {
	mongoose.connect('mongodb://student:password@ds157158.mlab.com:57158/testdbeasycode')
}

//Поиск в БД юзера
export function searchUser(login) {
	return User.findOne({login});
}

//Поиск в БД все задачи
export function listTasks(){
	return Task.find();
}

//Создание новой задачи в БД
export function createTask(data) {
    var task = new Task({
        taskText: data.taskText,
        time: data.time,
        status: data.status,
        date: data.date,
    });
    return task.save();
}

//Getter of task
export function getTask() {
    return Task;
}