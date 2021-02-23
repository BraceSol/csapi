const { query } = require('express-validator');
const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');

const SystemTable = sequelize.define('systemTable', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    tableGroup: Sequelize.STRING,
    tableName: Sequelize.STRING,
    optionText: Sequelize.STRING,
    optionValue: Sequelize.STRING,
    optionSequence: Sequelize.INTEGER,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    SystemTable,
    fetchAll: async(filterData) => {
        try {
            let queryObject = {};
            queryObject.where = {};
            queryObject.where.isActive = true;
            if (filterData.tableName) {
                queryObject.where.tableName = filterData.tableName;
            }
            if (filterData.tableGroup) {
                queryObject.where.tableGroup = filterData.tableGroup;
            }
            let systemTable = await SystemTable.findAll({
                where: queryObject.where
            });
            return systemTable;
        } catch (error) {
            console.log('=============SystemTable fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(systemTableId) => {
        try {
            let systemTable = await SystemTable.findOne({
                where: {
                    id: systemTableId,
                    isActive: true
                }
            });
            return systemTable;
        } catch (error) {
            console.log('=============SystemTable fetch by id error ==========', error);
        }
    },
    update: async(systemTableData) => {
        let success = false;
        try {
            let systemTable = await SystemTable.findOne({
                where: {
                    id: systemTableData.systemTableId,
                    isActive: true
                }
            });
            if (systemTable) {
                console.log('================= SystemTable found for update ============');
                systemTable.tableGroup = systemTableData.tableGroup;
                systemTable.tableName = systemTableData.tableName;
                systemTable.optionText = systemTableData.optionText;
                systemTable.optionValue = systemTableData.optionValue;
                systemTable.optionSequence = systemTableData.optionSequence;
                await systemTable.save();
                success = true;
            }
            return { success, systemTable };
        } catch (error) {
            console.log('=============SystemTable update error ==========', error);
            return { success: false };
        }
    },
    delete: async(systemTableId) => {
        let success = false;
        try {
            let systemTable = await SystemTable.findOne({
                where: {
                    id: systemTableId,
                    isActive: true
                }
            });
            if (systemTable) {
                console.log('================= SystemTable found for delete ============');
                systemTable.isActive = false;
                await systemTable.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============SystemTable delete error ==========', error);
            return false;
        }
    },
    create: async(systemTableData) => {
        let success = false;
        try {
            let systemTable = await SystemTable.create({
                id: uuid(),
                tableGroup: systemTableData.tableGroup,
                tableName: systemTableData.tableName,
                optionText: systemTableData.optionText,
                optionValue: systemTableData.optionValue,
                optionSequence: systemTableData.optionSequence,
                isActive: true
            });
            if (systemTable) {
                console.log('================= SystemTable created ============');
                success = true;
            }
            return {
                systemTable,
                success
            };
        } catch (error) {
            console.log('=============SystemTable created error ==========', error);
            return { success: false };
        }
    }
};