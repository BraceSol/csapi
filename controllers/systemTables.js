const SystemTable = require("../models/systemTables");


exports.getSystemTables = async(req, res, next) => {
    try {
        let systemTables = await SystemTable.fetchAll(req.query);
        if (systemTables) {
            return res.status(200).json({
                message: "System Tables fetched successfully...!",
                "items": systemTables,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "System Tables fetching failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("============== fetch all systemTables controller error ==================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.postSystemTable = async(req, res, next) => {
    try {
        let data = req.body;
        let systemTable = await SystemTable.create(data);
        if (systemTable.success) {
            let systemTables = await SystemTable.fetchAll();
            return res.status(200).json({
                message: "SystemTable created successfully",
                "items": systemTables,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "SystemTable creation failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("============== create systemTables controller error ====================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.postUpdateSystemTable = async(req, res, next) => {
    try {
        let data = req.body;
        let systemTable = await SystemTable.update(data);
        if (systemTable.success) {
            let systemTables = await SystemTable.fetchAll();
            return res.status(200).json({
                message: "SystemTable updated successfully",
                "items": systemTables,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "SystemTable updation failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("============== update systemTables controller error ====================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getSystemTable = async(req, res, next) => {
    try {
        let systemTableId = req.query.systemTableId;
        let systemTable = await SystemTable.fetchById(systemTableId);
        if (systemTable) {
            return res.status(200).json({
                message: "SystemTable found successfully...!",
                systemTable,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "SystemTable not found please try later...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log('================ SystemTable get by id error ================', error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getDeleteSystemTable = async(req, res, next) => {
    try {
        let systemTableId = req.query.systemTableId;
        let systemTable = await SystemTable.delete(systemTableId);
        if (systemTable) {
            return res.status(200).json({
                message: "SystemTable deleted successfully...!",
                systemTable,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "SystemTable not deleted please try later...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log('================ SystemTable delete by id error ================', error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}