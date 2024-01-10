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
const updateTask = async (req, res) => {
    try {
        const { newTasks } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { project: newTasks.projectId, taskName: newTasks.oldContent },
            { taskName: newTasks.content },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ succeed: false, message: "Güncellenmiş görev bulunamadı" });
        }

        res.status(200).json({ succeed: true, message: "Görev güncelleme başarılı", updatedTask });
    } catch (error) {
        console.error("Hata:", error);
        res.status(500).json({ succeed: false, message: "Sunucu hatası", error });
    }
};
const taskStatusUpdate = async (req, res) => {
    try {
        const { taskName,status,projectId } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { project:projectId,taskName :taskName},
            { status:status},
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ succeed: false, message: "Güncellenmiş görev bulunamadı" });
        }

        res.status(200).json({ succeed: true, message: "Görev güncelleme başarılı", updatedTask });
    } catch (error) {
        console.error("Hata:", error);
        res.status(500).json({ succeed: false, message: "Sunucu hatası", error });
    }
};




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
      const { deletedTask } = req.body;
  
      const taskToDelete = await Task.findOne({
        project: deletedTask.projectId,
        taskName: deletedTask.content
      });
  
      if (!taskToDelete) {
        return res.status(404).json({ succeed: false, message: "Silinecek görev bulunamadı" });
      }
      await Task.findByIdAndDelete(taskToDelete._id);
      return res.status(200).json({ succeed: true, message: "Görev başarıyla silindi" });
    } catch (error) {
      console.error("Hata:", error);
      return res.status(500).json({ succeed: false, message: "Sunucu hatası", error });
    }
  };
  
export{addTask,getTask,updateTask,deleteTask,taskStatusUpdate}