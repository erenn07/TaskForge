import Column from "../models/Column.js"
const addColumn= async(req,res)=>{
    try {
        const {newColumn}=req.body;

        const column =Column.create({
            columnId:newColumn.id,
            columnName:newColumn.title,
            project:newColumn.projectId

        })
        res.status(200).json({succeed:true,message:"Kolon ekleme başarılı"});


    } catch (error) {
        res.status(500).json({succeed:false,message:"sever error"+ error.message})

    }
}
const updateColumn=async(req,res)=>{
    try {
        const {newColumn} =req.body;
        const updateColumn = await Column.findByIdAndUpdate(
            {project:newColumn.projectId,title:newColumn.oldtitle},
            {oldtitle:newColumn.title},
            {new:true}
        );
        if (!updateColumn) {
            return res.status(404).json({succeed:false,message:"güncellenmiş kolon bulunanmadı"});

        }
        res.status(200).json({succeed:true,message:"Kolon güncelleme başarılı",updateColumn})

    } catch (error) {
        console.error("hata: ",error);
        res.status(500).json({succeed:false,message:"sunucu hatası",error});

    }
};

const UpdateColumnName = async (req,res)=>{
    try{
        const {columnName,projectId}=req.body;

        const updateColumn =await Column.findByIdAndUpdate(
            {project:projectId,columnName:columnName},
             {new:true}
        );
        if(!updateColumn){
            return res.status(404).json({succeed:false,message:"güncellenmiş kolon ismi bulunamadı"});
        }
        res.status(200).json({succeed:true,message:"kolon güncelleme başarılı",updateColumn});
    }catch(error){
        console.error("hata:",error);
        res.status(500).json({succeed:false,message:"Sunucu hatası",error})

    }
};
const getColumn = async(req,res)=>{
    const{projectId}=req.body;
    const columns=await Column.find({project:projectId})
    if(!columns){
        res.status(400).json({succeed:false,message:"Kolonlar bulunamadı"})

    }
    res.status(200).json(columns)
}

const DeleteColumn= async (req,res)=>{
    try {
        const {id} =req.body;
        const DeleteColumn = await Column.deleteOne({columnId:id});

        if (DeleteColumn.deletedCount>0) {
            return res.status(200).json({succeed:true,message:"Kolon başarıyla silindi."});

        }else{
            console.log('Silinecek Kolon yok');
            return res.status(404).send("Silinecek Kolon yok");
        }

    } catch (error) {
        console.error("Kolon silme sırasında hata oluştu",error.message);
        return res.status(500).json({succeed:false,message:"Kolon silme sırasında hata oluştu"})

    }
}


export{addColumn,updateColumn,getColumn,DeleteColumn,UpdateColumnName}