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
      
        const updatedTask =await Task.updateOne({taskId:newTasks[0].id},{
            $set: {

                taskName:newTasks[0].content,
                status:newTasks[0].columnId,
                project:newTasks[0].projectId
           
            }
        }) 

        if (!updatedTask) {
            return res.status(404).json({ succeed: false, message: "Güncellenmiş görev bulunamadı" });
        }

        res.status(200).json({succeed:true,message:"task güncelleme başarılı"})
    } catch (error) {
        res.status(500).json({succeed:false,message:"server error" + error.message})
    }
}

const getTask= async(req,res)=>{
    const{projectId}= req.body;
    const tasks= await Task.find({project:projectId})
    if(!tasks){
        res.status(400).json({succeed:false,message:"tasklar bulunamadı"})
    }

    res.status(200).json(tasks)
}
const deleteTask = async (req, res) => {
    try {
        const { id } = req.body;

        const deletedTask = await Task.deleteOne({ taskId: id });

        if (deletedTask.deletedCount > 0) {
            return res.status(200).json({ succeed: true, message: "Task deletion successful." });
        } else {
            console.log('No data to delete was found');
            return res.status(404).send('No data to delete was found');
        }
    } catch (error) {
        console.error('Error deleting task:', error.message);
        return res.status(500).json({ succeed: false, message: "Task deletion failed" });
    }
}
export{addTask,getTask,updateTask,deleteTask}