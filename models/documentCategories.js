const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');

const DocumentCategories = sequelize.define('documentCategories', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    categoryName: Sequelize.STRING,
    description: Sequelize.STRING,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isEnabled: Sequelize.BOOLEAN,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    DocumentCategories,
    fetchAll: async() => {
        try {
            let documentCategory = await DocumentCategories.findAll({
                where: {
                    isActive: true
                }
            });
            return documentCategory;
        } catch (error) {
            console.log('=============Document Categories fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(docCategoryId) => {
        try {
            let documentCategory = await DocumentCategories.findOne({
                where: {
                    id: docCategoryId,
                    isActive: true
                }
            });
            return documentCategory;
        } catch (error) {
            console.log('=============Document Categories fetch by id error ==========', error);
        }
    },
    update: async(documentCategoryData) => {
        let success = false;
        try {
            let documentCategory = await DocumentCategories.findOne({
                where: {
                    id: documentCategoryData.documentCategoryId,
                    isActive: true
                }
            });
            if (documentCategory) {
                console.log('================= Document Categories found for update ============');
                documentCategory.industryId = documentCategoryData.industryId;
                documentCategory.categoryName = documentCategoryData.categoryName;
                documentCategory.description = documentCategoryData.description;
                documentCategory.updatedBy = documentCategoryData.adminId,
                    documentCategory.isEnabled = documentCategoryData.isEnabled,
                    await documentCategory.save();
                success = true;
            }
            return { success, documentCategory };
        } catch (error) {
            console.log('=============Document Categories update error ==========', error);
            return { success: false };
        }
    },
    delete: async(docCategoryId) => {
        let success = false;
        try {
            let documentCategory = await DocumentCategories.findOne({
                where: {
                    id: docCategoryId,
                    isActive: true
                }
            });
            if (documentCategory) {
                console.log('================= Document Categories found for delete ============');
                documentCategory.isActive = false;
                await documentCategory.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Document Categories delete error ==========', error);
            return false;
        }
    },
    create: async(documentCategoryData) => {
        let success = false;
        try {
            let documentCategory = await DocumentCategories.create({
                id: uuid(),
                industryId: documentCategoryData.industryId,
                categoryName: documentCategoryData.categoryName,
                description: documentCategoryData.description,
                createdBy: documentCategoryData.adminId,
                isEnabled: documentCategoryData.isEnabled,
                isActive: true
            });
            if (documentCategory) {
                console.log('================= Document Categories created ============');
                success = true;
            }
            return {
                documentCategory,
                success
            };
        } catch (error) {
            console.log('=============Document Categories created error ==========', error);
            return { success: false };
        }
    }
};