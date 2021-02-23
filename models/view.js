const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../utils/database');

const View = sequelize.define('view', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    userId: Sequelize.STRING, 
    searchType: Sequelize.STRING, 
    title: Sequelize.STRING, 
    viewQuery: Sequelize.JSON, 
    isActive: Sequelize.BOOLEAN, 
    isSystem: Sequelize.INTEGER, 
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
});
module.exports = {
    View,
    fetchAll: async() => {
        try {
            let view = await View.findAll({
                where: {
                    isActive: true
                }
            });
            return view;
        } catch (error) {
            console.log('=============View fetch all error ==========', error);
            return [];
        }
    },
    fetch: async(filterData) => {
        try {
            let queryObject = {};
            queryObject.where = {};
            if (filterData.searchType) {
                queryObject.where.searchType = filterData.searchType;
            }
            if (filterData.userId) {
                queryObject.where.userId = filterData.userId;
            }
            let view = await View.findAll({
                where: queryObject.where
            });
            return view;
        } catch (error) {
            console.log('=============View fetch by id error ==========', error);
        }
    },
    fetchById: async(viewId) => {
        try {
            let view = await View.findOne({
                where: {
                    id: viewId,
                    isActive: true
                }
            });
            return view;
        } catch (error) {
            console.log('=============View fetch by id error ==========', error);
        }
    },
    update: async(viewData) => {
        let success = false;
        try {
            let view = await View.findOne({
                where: {
                    id: viewData.id,
                    isActive: true
                }
            });
            if (view) {
                console.log('================= View found for update ============');
                view.userId = viewData.userId;
                view.searchType = viewData.searchType;
                view.title = viewData.title;
                view.userId = viewData.userId;
                view.viewQuery = viewData.viewQuery;
                view.isSystem = viewData.isSystem;
                view.createdOn = viewData.createdOn;
                view.createdBy = viewData.createdBy;
                view.updatedOn = viewData.updatedOn;
                view.updatedBy = viewData.updatedBy;
                await view.save();
                success = true;
            }
            return { success, view };
        } catch (error) {
            console.log('=============view update error ==========', error);
            return { success: false };
        }
    },
    delete: async(viewId) => {
        let success = false;
        try {
            let view = await View.findOne({
                where: {
                    id: viewId,
                    isActive: true
                }
            });
            if (view) {
                console.log('================= view found for delete ============');
                view.isActive = false;
                await view.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============view delete error ==========', error);
            return false;
        }
    },
    create: async(viewData) => {
        let success = false;
        try {
            let view = await View.create({
                id: uuid(),
                userId: viewData.userId,
                searchType: viewData.searchType,
                title: viewData.title,
                viewQuery: viewData.viewQuery,
                isSystem: viewData.isSystem,
                createdBy: viewData.createdBy,
                updatedBy: viewData.updatedBy,
            });
            if (view) {
                console.log('================= view created ============');
                success = true;
            }
            return {
                view,
                success
            };
        } catch (error) {
            console.log('=============view created error ==========', error);
            return { success: false };
        }
    }
};