import Bill from "../models/bills.js";
import Customer from "../models/Customer.js";
import Project from "../models/Project.js";
import mongoose from "mongoose"
import Business from "../models/business.js";



const addbill = async (req, res) => {
    try {
        const { ProjectName, CustomerName, Date, finishedDate, creatorID } = req.body.newRow;

        const project = await Project.findOne({ projectName: ProjectName });
        const hourlyPrice = project.hourlyWage;

        const totalMinutesWorked = await getTotalMinutesWorked(ProjectName, Date, finishedDate);

        const totalHoursWorked = totalMinutesWorked / 60; 
        const totalAmount = totalHoursWorked * hourlyPrice;

        console.log(totalHoursWorked, " toplam çalışma")
        console.log(totalAmount, " toplam ücret")

        const bill = await Bill.create({
            project: ProjectName,
            customer: CustomerName,
            date: formatDate(Date),
            finishdate: formatDate(finishedDate),
            totalHoursWorked: totalHoursWorked,
            hourlyPrice: hourlyPrice,
            amount: totalAmount,
            creatorID: creatorID
        });

        return res.status(201).json({ success: true, message: "Fatura başarıyla oluşturuldu.", data: bill });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Fatura oluşturulurken bir hata oluştu.", error: error.message });
    }
};

const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1;
    const year = formattedDate.getFullYear();
    return `${day}-${month}-${year}`; 
};

const getTotalMinutesWorked = async (projectName, startDate, endDate) => {
    const workRecords = await Business.find({ 
        projectName: projectName,
        $or: [
            { date: { $gte: startDate, $lte: endDate } },
            { finishdate: { $gte: startDate, $lte: endDate } }
        ]
    });

    let totalMinutes = 0;
    workRecords.forEach(record => {
        totalMinutes += parseFloat(record.hour); 
    });
    return totalMinutes;
};






const getBill =async (req,res)=>{
try {

const {creatorID}=req.query

    const bill=await Bill.find({creatorID:creatorID})

    res.status(200).json(bill);
} catch (error) {
  console.error("Error adding business:", error);
  res.status(500).json({ error: "Internal Server Error" });
}



}





export{addbill,getBill}