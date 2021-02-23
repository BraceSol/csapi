const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../utils/database');
const { Employer } = require('./employer');
const EmployerLocations = sequelize.define('employerLocation', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    locationName: Sequelize.STRING,
    idNumber: Sequelize.STRING,
    description: Sequelize.STRING,
    addressLine1: Sequelize.STRING,
    addressLine2: Sequelize.STRING,
    addressLine3: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    postalCode: Sequelize.STRING,
    county: Sequelize.STRING,
    country: Sequelize.STRING,
    phone: Sequelize.STRING,
    webiste: Sequelize.STRING,
    bedCount: Sequelize.INTEGER,
    totalFTE: Sequelize.FLOAT,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    EmployerLocations,
    fetchAll: async() => {
        try {
            let location = await EmployerLocations.findAll({
                where: {
                    isActive: true
                },
                include: [{
                    model: Employer,
                    attributes: ['employerName'],
                    where: {
                        isActive: true
                    }
                }]
            });
            return location;
        } catch (error) {
            console.log("===========EmployerLocations fetchAll error", error);
            return [];
        }
    },
    fetchAllByEmployerId: async(employerId) => {
        try {
            let location = await EmployerLocations.findAll({
                where: {
                    isActive: true,
                    employerId: employerId
                },
                include: [{
                    model: Employer,
                    attributes: ['employerName'],
                    where: {
                        isActive: true
                    }
                }]
            });
            return location;
        } catch (error) {
            console.log("===========EmployerLocations fetchAll error", error);
            return [];
        }
    },
    fetchById: async(employerLocationId) => {
        try {
            let location = await EmployerLocations.findOne({
                where: {
                    id: employerLocationId,
                    isActive: true
                },
                include: [{
                    model: Employer,
                    attributes: ['employerName'],
                    where: {
                        isActive: true
                    }
                }]
            });
            return location;
        } catch (error) {
            console.log("==========EmployerLocations fetchById error", error);
            return 0;
        }
    },
    fetchByEmployerId: async(employerLocationId, employerId) => {
        try {
            let location = await EmployerLocations.findOne({
                where: {
                    id: employerLocationId,
                    employerId: employerId,
                    isActive: true
                },
                include: [{
                    model: Employer,
                    attributes: ['employerName'],
                    where: {
                        isActive: true
                    }
                }]
            });
            return location;
        } catch (error) {
            console.log("==========EmployerLocations fetchById error", error);
            return 0;
        }
    },
    update: async(employerLocationData) => {
        let success = false;
        try {
            let location = await EmployerLocations.findOne({
                where: {
                    id: employerLocationData.employerLocationId,
                    isActive: true
                },
                include: [{
                    model: Employer,
                    attributes: ['employerName'],
                    where: {
                        isActive: true
                    }
                }]
            });
            if (location) {
                console.log("===========EmployerLocations found for update");
                location.employerId = employerLocationData.employerId;
                location.locationName = employerLocationData.locationName;
                location.idNumber = employerLocationData.idNumber;
                location.description = employerLocationData.description;
                location.addressLine1 = employerLocationData.addressLine1;
                location.addressLine2 = employerLocationData.addressLine2 ? employerLocationData.addressLine2 : null;
                location.addressLine3 = employerLocationData.addressLine3 ? employerLocationData.addressLine3 : null;
                location.city = employerLocationData.city;
                location.state = employerLocationData.state;
                location.postalCode = employerLocationData.postalCode;
                location.county = employerLocationData.county;
                location.country = employerLocationData.country;
                location.phone = employerLocationData.phone;
                location.webiste = employerLocationData.website;
                location.bedCount = employerLocationData.bedCount;
                location.totalFTE = employerLocationData.totalFTE;
                location.updatedBy = employerLocationData.adminId;
                await location.save();
                success = true;
            }
            return { location, success };
        } catch (error) {
            console.log("===========EmployerLocations update error", error);
            return { success: false };
        }
    },
    delete: async(employId) => {
        let success = false;
        try {
            let location = await EmployerLocations.findOne({
                where: {
                    id: employId,
                    isActive: true
                },
                include: [{
                    model: Employer,
                    attributes: ['employerName'],
                    where: {
                        isActive: true
                    }
                }]
            });
            if (location) {
                console.log("===========EmployerLocations found for delete=======");
                location.isActive = false;
                await location.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log("===========EmployerLocations delete Error", error);
            return false;
        }
    },
    create: async(employerLocationData) => {
        let success = false;
        try {
            let location = await EmployerLocations.create({
                id: uuid(),
                employerId: employerLocationData.employerId,
                locationName: employerLocationData.locationName,
                idNumber: employerLocationData.idNumber,
                description: employerLocationData.descripition,
                addressLine1: employerLocationData.addressLine1,
                addressLine2: employerLocationData.addressLine2 ? employerLocationData.addressLine2 : null,
                addressLine3: employerLocationData.addressLine3 ? employerLocationData.addressLine3 : null,
                city: employerLocationData.city,
                state: employerLocationData.state,
                postalCode: employerLocationData.postalCode,
                county: employerLocationData.county,
                country: employerLocationData.country,
                phone: employerLocationData.phone,
                website: employerLocationData.webiste,
                bedCount: employerLocationData.bedCount,
                totalFTE: employerLocationData.totalFTE,
                createdBy: employerLocationData.adminId,
                isActive: true
            });
            if (location) {
                console.log("===========EmployerLocations found for create ============");
                success = true;
            }
            return { location, success }
        } catch (error) {
            console.log("=========EmployerLocations created error ", error);
            return { success: false };
        }
    }

}