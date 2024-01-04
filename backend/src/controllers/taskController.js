import Task from "../models/Task.js";



const addTask= async(req,res)=>{
    try {
        const {newTask}= req.body;

      

      const task = Task.create({
        taskId:newTask.id,
        taskName:newTask.content,
        status:newTask.columnId,
        project:newTask.projectId
          })
        //   await task.save();
          res.status(200).json({succeed:true,message:"task ekleme başarılı"})
    } catch (error) {
        res.status(500).json({succeed:false,message:"server error" + error.message})
    }
}
const updateTask= async(req,res)=>{
    try {
      
        const {newTasks}= req.body;
        // const updatedTask= await Task.findByIdAndUpdate(newTasks.taskId,{
        //     taskName:newTasks.content,
        //     status:newTasks.columnId
        // })
        // res.status(200).json({succeed:true,message:"task güncelleme başarılı"})
    } catch (error) {
        // res.status(500).json({succeed:false,message:"server error" + error.message})
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
const deleteTask= async(req,res)=>{
    try {
        const {id}= req.body;
    console.log("idddddddd",id)
        const deletedTask= await Task.findByIdAndDelete(id)
    } catch (error) {
        res.status(500).json({succeed:false,message:"task silinemedi"})
    }
}
export{addTask,getTask,updateTask,deleteTask}