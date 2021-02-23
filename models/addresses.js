const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');

const Addresses = sequelize.define('addresses', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    entityId: Sequelize.STRING,
    entityType: Sequelize.STRING,
    addressType: Sequelize.STRING,
    addressName: Sequelize.STRING,
    addressCompany: Sequelize.STRING,
    addressLine1: Sequelize.STRING,
    addressLine2: Sequelize.STRING,
    addressLine3: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    postalCode: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    statusCode: Sequelize.INTEGER,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    fetchAll: async() => {
        try {
            let addresses = await Addresses.findAll({
                where: {
                    isActive: true
                }
            });
            return addresses;
        } catch (error) {
            console.log('=============Addresses fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(addressId) => {
        try {
            let addresses = await Addresses.findOne({
                where: {
                    id: addressId,
                    isActive: true
                }
            });
            return addresses;
        } catch (error) {
            console.log('=============Addresses fetch by id error ==========', error);
            return 0;
        }
    },
    fetchByUserId: async(userId) => {
        try {
            let address = await Addresses.findOne({
                where: {
                    entityId: userId,
                    isActive: true
                }
            });
            return address;
        } catch (error) {
            console.log('=============Addresses fetch by user id error ==========', error);
            return 0;
        }
    },
    update: async(addressesData) => {
        let success = false;
        try {
            let addresses = await Addresses.findOne({
                where: {
                    id: addressesData.addressId,
                    isActive: true
                }
            });
            if (addresses) {
                console.log('================= Addresses found for update ============');
                addresses.entityType = addressesData.entityType;
                addresses.entityId = addressesData.entityId;
                addresses.addressType = addressesData.addressType;
                addresses.addressName = addressesData.addressName;
                addresses.addressCompany = addressesData.addressCompany;
                addresses.addressLine1 = addressesData.addressLine1;
                addresses.addressLine2 = addressesData.addressLine2 ? addressesData.addressLine2 : null;
                addresses.addressLine3 = addressesData.addressLine3 ? addressesData.addressLine3 : null;
                addresses.city = addressesData.city;
                addresses.state = addressesData.state;
                addresses.postalCode = addressesData.postalCode;
                addresses.phone = addressesData.phone;
                addresses.email = addressesData.email;
                addresses.statusCode = addressesData.statusCode ? addressesData.addressLine2 : null;
                addresses.updatedBy = addressesData.adminId;
                await addresses.save();
                success = true;
            }
            return { success, addresses };
        } catch (error) {
            console.log('=============Addresses update error ==========', error);
            return { success: false };
        }
    },
    delete: async(addressId) => {
        let success = false;
        try {
            let addresses = await Addresses.findOne({
                where: {
                    id: addressId,
                    isActive: true
                }
            });
            if (addresses) {
                console.log('================= Addresses found for delete ============');
                addresses.isActive = false;
                await addresses.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Addresses delete error ==========', error);
            return false;
        }
    },
    create: async(addressesData) => {
        let success = false;
        try {
            let addresses = await Addresses.create({
                id: uuid(),
                entityType: addressesData.entityType,
                entityId: addressesData.entityId,
                addressType: addressesData.addressType,
                addressName: addressesData.addressName,
                addressCompany: addressesData.addressCompany,
                addressLine1: addressesData.addressLine1,
                addressLine2: addressesData.addressLine2 ? addressesData.addressLine2 : null,
                addressLine3: addressesData.addressLine3 ? addressesData.addressLine2 : null,
                city: addressesData.city,
                state: addressesData.state,
                postalCode: addressesData.postalCode,
                phone: addressesData.phone,
                email: addressesData.email,
                statusCode: addressesData.statusCode ? addressesData.statusCode : null,
                createdBy: addressesData.adminId ? addressesData.adminId : addressesData.entityId,
                isActive: true
            });
            if (addresses) {
                console.log('================= Addresses created ============');
                success = true;
            }
            return {
                addresses,
                success
            };
        } catch (error) {
            console.log('=============Addresses created error ==========', error);
            return { success: false };
        }
    }
};