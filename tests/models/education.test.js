const assert = require("assert");
const sinon = require("sinon");
var should = require('chai').should();
var expect = require('chai').expect;
const EducationModel = require("../../models/education");
const { Education } = EducationModel;

describe("Education model test", () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(Education, "findOne").resolves({ save: () => { return; } });
        findAll = sinon.stub(Education, "findAll").resolves([{}]);
        create = sinon.stub(Education, "create").resolves({ success: true });
    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    })
    describe("create", () => {
        let data = {
            userId: "1",
            schoolName: "new school name",
            city: "city",
            state: "state",
            postalCode: "123212",
            graduationDate: "2021-01-01"
        }
        it("should create education", async() => {
            let result = await EducationModel.create(data);
            result.should.be.an('object');
            result.should.have.property('education');
            result.success.should.be.equal(true);
        })
        it("should return success as false when education not created or error occurs", async() => {
            create.throws(new Error());
            let result = await EducationModel.create(data);
            result.should.be.an('object');
            result.should.not.have.property('education');
            result.success.should.be.equal(false);
        })
    });
    describe("update", () => {
        let data = {
            educationId: "1",
            userId: "1",
            schoolName: "new school name",
            city: "city",
            state: "state",
            postalCode: "123212",
            graduationDate: "2021-01-01"
        };

        it("should update education", async() => {
            let result = await EducationModel.update(data);
            result.should.be.an('object');
            result.should.have.property('education');
            result.success.should.be.equal(true);
        })
        it("should return success as false when education not updated or error occurs", async() => {
            findOne.throws(new Error());
            let result = await EducationModel.update(data);
            result.should.be.an('object');
            result.should.not.have.property('education');
            result.success.should.be.equal(false);
        })
    })
    describe("delete", () => {
        let educationId = "1";
        it("should delete education", async() => {
            let result = await EducationModel.delete(educationId);
            result.should.be.an('boolean');
            result.should.be.equal(true);
        })
        it("should return success as false when education not deleted or error occurs", async() => {
            findOne.throws(new Error());
            let result = await EducationModel.delete(educationId);
            result.should.be.an('boolean');
            result.should.be.equal(false);
        })
    })
    describe("fetchAllByUserId", () => {
        let userId = "1";
        it("should delete education", async() => {
            let result = await EducationModel.fetchAllByUserId(userId);
            result.should.be.an('array');
            result.length.should.not.be.equal(0);
        })
        it("should return 0 when educations not found by userId or error occurs", async() => {
            findAll.throws(new Error());
            let result = await EducationModel.fetchAllByUserId(userId);
            result.should.be.equal(0);
        })
    })
    describe("fetchById", () => {
        let educationId = "1";
        it("should found education by educationId", async() => {
            let result = await EducationModel.fetchById(educationId);
            result.should.be.an('object');
        })
        it("should return 0 when education not found or error occurs", async() => {
            findOne.throws(new Error());
            let result = await EducationModel.fetchById(educationId);
            result.should.be.equal(0);
        })
    })
    describe("fetchAll", () => {
        it("should fetch all educations", async() => {
            let result = await EducationModel.fetchAll();
            result.should.be.an('array');
            result.length.should.not.be.equal(0);
        })
        it("should return empty array when educations not found or error occurs", async() => {
            findAll.throws(new Error());
            let result = await EducationModel.fetchAll();
            result.should.be.an('array');
            result.length.should.be.equal(0);
        });
    });


})