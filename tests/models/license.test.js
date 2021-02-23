const assert = require('assert');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const LicenseModel = require('../../models/license');
const { License } = LicenseModel;
describe("License Model test", async() => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(License, "findOne").resolves({ save: () => { return; } });
        findAll = sinon.stub(License, "findAll").resolves([{}]);
        create = sinon.stub(License, "create").resolves({ success: true });
    });
    afterEach(() => {
            findOne.restore();
            findAll.restore();
            create.restore();
        })
        //create testing step
    describe("create", async() => {
        let data = {
            userId: "1",
            licenseState: "state",
            licenseCode: "Code",
            issueDate: "issue date",
            expirationDate: "expiry date",
            verifiedOn: "verified on",
            verifiedBy: "verified by",
            verificationMessage: "verification message",
        }
        it("should license create", async() => {
            let license = await LicenseModel.create(data);
            license.should.be.an('object');
            license.should.have.property('license');
            license.success.should.be.equal(true);
        });
        it("should return success as false when license not created or error occurs", async() => {
            create.throws(new Error());
            let license = await LicenseModel.create(data);
            license.should.be.an('object');
            license.should.have.not.property('license');
            license.success.should.be.equal(false);
        });
    });

    //update testing step
    describe("update", async() => {
        let data = {
            userId: "1",
            licenseState: "state",
            licenseCode: "Code",
            issueDate: "issue date",
            expirationDate: "expiry date",
            verifiedOn: "verified on",
            verifiedBy: "verified by",
            verificationMessage: "verification message",
        }
        it("should license update", async() => {
            let license = await LicenseModel.update(data);
            license.should.be.an('object');
            license.should.have.property('license');
            license.success.should.be.equal(true);
        });
        it("should return success as false when license not update or error occurs", async() => {
            findOne.throws(new Error());
            let license = await LicenseModel.update(data);
            license.should.be.an('object');
            license.should.have.not.property('license');
            license.success.should.be.equal(false);
        });
    });
    //delete testing step
    describe("delete", async() => {
        let licenseId = "1";
        it("should license delete", async() => {
            let license = await LicenseModel.delete(licenseId);
            license.should.be.an('boolean');
            license.should.be.equal(true);
        });
        it("should return success as false when license not delete or error occurs", async() => {
            findOne.throws(new Error());
            let license = await LicenseModel.delete(licenseId);
            license.should.be.an('boolean');
            license.should.be.equal(false);
        });
    });
    //fetchByUserId
    describe("fetchAllByUserId", () => {
        let userId = "1";
        it("should fetchAllByUserId", async() => {
            let license = await LicenseModel.fetchAllByUserId(userId);
            license.should.be.an('array');
            license.length.should.not.be.equal(0);
        })
        it("should return 0 when license not found by fetchAllByUserId or error occurs", async() => {
            findAll.throws(new Error());
            let license = await LicenseModel.fetchAllByUserId(userId);
            license.should.be.equal(0);
        });
    });
    //fetchById testing step
    describe("fetchById", async() => {
        let licenseId = "1";
        it("should license fetchById", async() => {
            let license = await LicenseModel.fetchById(licenseId);
            license.should.be.an('object');

        });
        it("should return 0 when license not found by fetchById or error occurs", async() => {
            findOne.throws(new Error());
            let license = await LicenseModel.fetchById(licenseId);
            license.should.be.equal(0);
        });
    });
    //fetchAll
    describe("fetchAll", async() => {
        it("should license fetchAll", async() => {
            let license = await LicenseModel.fetchAll();
            license.should.be.an('array');
            license.length.should.be.not.equal(0);
        });
        it("should return 0 when license not found by fetchAll or error occurs",
            async() => {
                findAll.throws(new Error());
                let license = await LicenseModel.fetchAll();
                license.should.be.an('array');
                license.length.should.be.equal(0);
            })
    })
})