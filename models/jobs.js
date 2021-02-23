const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../utils/database');
const { Employer } = require('./employer');
const Jobs = sequelize.define('jobs', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    jobTitle: Sequelize.STRING,
    shortDescription: Sequelize.STRING,
    locationId: Sequelize.STRING,
    description: Sequelize.STRING,
    startDate: Sequelize.DATE,
    internalOnly: Sequelize.BOOLEAN,
    createBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    Jobs,
    fetchAll: async() => {
        try {
            let job = await Jobs.findAll({
                where: {
                    isActive: true
                },
                include: [{
                    model: Employer,
                    attributes: ["employerName"],
                    where: {
                        isActive: true
                    }
                }]
            });
            return job;
        } catch (error) {
            console.log("========Job findAll Error was accurs=====", error);
            return [];
        };
    },
    fetchById: async(jobId) => {
        try {
            let job = await Jobs.findOne({
                where: {
                    id: jobId,
                    isActive: true
                },
                include: [{
                    model: Employer,
                    attributes: ["employerName"],
                    where: {
                        isActive: true
                    }
                }]
            })
            return job;
        } catch (error) {
            console.log("========Job findOne was error accurs====", error);
            return 0;
        }
    },
    fetchAllByEmployerId: async(employerId) => {
        try {
            let jobs = await Jobs.findAll({
                where: {
                    isActive: true
                },
                include: [{
                    model: Employer,
                    attributes: ["employerName"],
                    where: {
                        isActive: true,
                        id: employerId
                    }
                }]
            });
            return jobs;
        } catch (error) {
            console.log("========Job findAll Error was accurs=====", error);
            return [];
        };
    },
    update: async(jobData) => {
        let success = false;
        try {
            let job = await Jobs.update({
                where: {
                    id: jobData.jobId,
                    isActive: true
                },
                include: [{
                    model: Employer,
                    attributes: ["employerName"],
                    where: {
                        isActive: true,
                        id: jobData.employerId
                    }
                }]
            });
            if (job) {
                console.log("=========Job found for update========");
                job.employerId = jobData.employerId;
                job.jobTitle = jobData.jobTitle;
                job.shortDescription = jobData.shortDescription;
                job.description = jobData.description;
                job.startDate = jobData.startDate;
                job.internalOnly = jobData.internalOnly;
                job.locationId = jobData.locationId;
                job.updatedBy = jobData.adminId;
                await job.save();
                success = true;
            }
            return { job, success }
        } catch (error) {
            console.log("=======Job for updating error was accurs", error);
            return { success: false };
        }
    },
    delete: async(jobId, employerId) => {
        let success = false;
        try {
            let job = await Jobs.findOne({
                where: {
                    id: jobId,
                    isActive: true
                },
                include: [{
                    model: Employer,
                    attributes: ["employerName"],
                    where: {
                        isActive: true,
                        id: employerId
                    }
                }]
            });
            if (job) {
                console.log('================= Job found for delete ============');
                job.isActive = false;
                await job.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Job delete error ==========', error);
            return false;
        }
    },
    create: async(jobData) => {
        let success = false;
        try {
            let job = await Jobs.create({
                id: uuid(),
                employerId: jobData.employerId,
                jobTitle: jobData.jobTitle,
                shortDescription: jobData.shortDescription,
                description: jobData.description,
                startDate: jobData.startDate,
                locationId: jobData.locationId,
                internalOnly: jobData.internalOnly,
                createBy: jobData.adminId,
                isActive: true
            });
            if (job) {
                console.log('================= Job created ============');
                success = true;
            }
            return {
                job,
                success
            };
        } catch (error) {
            console.log('=============Job created error ==========', error);
            return { success: false };
        }
    }

}