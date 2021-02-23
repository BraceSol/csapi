const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('assert');
const DeviceModel = require('../../models/device');
const { Device } = DeviceModel;

describe('Device model test', () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(Device, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(Device, "findAll").resolves([{}]);
        create = sinon.stub(Device, "create").resolves({ success: true });
    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    });
    // create test
    describe("create", () => {
        let data = {
            userId: "1",
            deviceName: 'bolt',
            deviceCode: '1232',
            enabled: 'true',
            lastActivity: '411',
            lastLocation: 'bure',
            statusCode: '1122'
        }
        it("should create Device", async() => {
            let Device = await DeviceModel.create(data);
            Device.should.be.an('object');
            Device.should.have.property('device')


        })
        it("should return success as false when Device not created or error occurs", async() => {
            create.throws(new Error());
            let Device = await DeviceModel.create(data);
            Device.should.have.not.property('device');
            Device.success.should.be.equal(false);
        });
    });
    // update test
    describe("update", () => {
        let data = {
            userId: "1",
            deviceName: 'bolt',
            deviceCode: '1232',
            enabled: 'true',
            lastActivity: '411',
            lastLocation: 'bure',
            statusCode: '1122'
        }
        it("should update Device", async() => {
            let Device = await DeviceModel.update(data);
            Device.should.be.an('object');


        })
        it("should return success as false when Device not update or error occurs", async() => {
            findOne.throws(new Error());
            let Device = await DeviceModel.update(data);


            Device.success.should.be.equal(false);
        });
    });

    // updateActivity test
    describe("updateActivity", () => {
        let data = {
            userId: "1",
            lastActivity: 'activity'
        }
        it("should updateActivity Device", async() => {
            let Device = await DeviceModel.updateActivity(data);
            Device.should.be.equal(false);

        })
        it("should return success as false when Device not updateActivity or error occurs", async() => {
            findOne.throws(new Error());
            let Device = await DeviceModel.updateActivity(data);

            Device.should.be.equal(false);
        });
    })



    // delete test
    describe("delet", () => {
        let deviceId = "1";
        it("should delete address", async() => {
            let Device = await DeviceModel.delete(deviceId);
            Device.should.be.an('boolean');
            Device.should.be.equal(true);

        });
        it("should return success as false when Device not delete or error occurs", async() => {
            findOne.throws(new Error());
            let Device = await DeviceModel.delete(deviceId);
            Device.should.be.an('boolean');
            Device.should.be.equal(false);
        });
    });
    //checkEnabled
    describe("checkEnabled", () => {
        let userId = "1",
            deviceCode = "1";
        it("should be checkEnabled", async() => {
            let checkEnabled = await DeviceModel.checkEnable(userId, deviceCode);

            checkEnabled.should.be.equal(true);
        });
        it("should return success as false when Device not be checkEnabled or error occurs", async() => {
            findOne.throws(new Error());
            let checkEnabled = await DeviceModel.checkEnable(userId, deviceCode);
            checkEnabled.should.be.equal(false);
        });
    });
    //Enabled Device 

    describe("EnabledDevice", () => {
        let userId = "1",
            deviceCode = "1";
        it("should enabled device", async() => {
            let enableDevice = await DeviceModel.enableDevice(userId, deviceCode);

            enableDevice.should.be.equal(true);
        });
        it("should return success as false when Device not be checkEnabled or error occurs", async() => {
            findOne.throws(new Error());
            let EnabledDevice = await DeviceModel.enableDevice(userId, deviceCode);

            EnabledDevice.should.be.equal(false);
        })
    })


    // fetchByUserId test

    describe("fetchByUserId ", () => {
        let deviceId = "1";
        it("should fetchByUserId Device", async() => {
            let Device = await DeviceModel.fetchByUserId(deviceId);
            Device.should.be.an('object');
        });
        it("should return success as false when not  fetchByUserId Device or error occurs", async() => {
            findOne.throws(new Error());
            let Device = await DeviceModel.fetchByUserId(deviceId);

            Device.should.be.equal(0);
        });
    });

    // fetchByUserAndDeviceId test

    describe("fetchByUserAndDeviceId ", () => {
        let deviceCode = "1",
            userId = 1;
        it("should fetchByUserAndDeviceId Device", async() => {
            let Device = await DeviceModel.fetchByUserAndDeviceId(userId, deviceCode);
            Device.should.be.an('object');
        });
        it("should return success as false when not  fetchByUserAndDeviceId Device or error occurs", async() => {
            findOne.throws(new Error());
            let Device = await DeviceModel.fetchByUserAndDeviceId(userId, deviceCode);
            Device.should.be.equal(0);
        });
    });




    // fetchAll test

    describe("fetchAll", () => {
        it("should fetchAll Device", async() => {
            let Device = await DeviceModel.fetchAll();
            Device.should.be.an('array');

        });
        it("should return empty array when Device not found or error occurs", async() => {
            findAll.throws(new Error());
            let Device = await DeviceModel.fetchAll();
            Device.length.should.be.equal(0);
        });
    })


});