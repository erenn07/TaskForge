import Task from "../models/Task.js";



const addTask= async(req,res)=>{
    try {
        const {taskName,status,projectId}= req.body;

        if(!taskName){
            res.status(400).json({succeed:false,message:"Task ismi bulunamadı"})
        }
        const task= await Task.create({
            taskName:taskName,
            status:status,
            projects:projectId
        })
        await task.save();
        res.status(200).json({succeed:true,message:"Task ekleme başarılı."})
    } catch (error) {
        res.status(500).json({succeed:false,message:"server error" + error.message})
    }
}
const getTask= async(req,res)=>{
    const{projectId}= req.body;
    const tasks= await Task.find({projects:projectId})
    if(!tasks){
        res.status(400).json({succeed:false,message:"tasklar bulunamadı"})
    }

    res.status(200).json(tasks)
}
export{addTask,getTask}