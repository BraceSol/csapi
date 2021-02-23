const assert = require('assert');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const Profession2specialtyModel = require('../../models/profession2specialty');
const { Profession2specialty } = Profession2specialtyModel;
describe("Profession model test", () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(Profession2specialty, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(Profession2specialty, "findAll").resolves([{}]);
        create = sinon.stub(Profession2specialty, "create").resolves({ success: true });
    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    })
    describe("create", () => {
        let data = {
            specialtyId: "1",

        }
        it("should Profession2specialty create", async() => {
            let profession2specialty = await Profession2specialtyModel.create(data);
            profession2specialty.should.be.an('object');
            profession2specialty.should.have.property('profession2specialty');
            profession2specialty.success.should.be.equal(true);
        });
        it("should return success as false when Profession2specialty no create or error an accurs", async() => {
            create.throws(new Error());
            let profession2specialty = await Profession2specialtyModel.create(data);
            profession2specialty.should.be.an('object');
            profession2specialty.should.not.have.property('profession2specialty');
            profession2specialty.success.should.be.equal(false);
        })
    })
    describe("update", () => {
        let data = {
            specialtyId: "1",

        }
        it("should Profession2specialty update", async() => {
            let profession2specialty = await Profession2specialtyModel.update(data);
            profession2specialty.should.be.an('object');
        });
        it("should return success as false when Profession2specialty no update or error an accurs", async() => {
            findOne.throws(new Error());
            let profession2specialty = await Profession2specialtyModel.update(data);
            profession2specialty.success.should.be.equal(false);
        })
    })
    describe("delete", async() => {
        let specialtyId = "1";
        it("should profession2specialty delete", async() => {
            let profession2specialty = await Profession2specialtyModel.delete(specialtyId);
            profession2specialty.should.be.an('boolean');
            profession2specialty.should.be.equal(true);
        });
        it("should return success as false when profession2specialty not delete or error an accurs", async() => {
            findOne.throws(new Error());
            let profession2specialty = await Profession2specialtyModel.delete(specialtyId);
            profession2specialty.should.be.an('boolean');
            profession2specialty.should.be.equal(false);
        })
    });
    describe("fetchByProfessionId", () => {
        let specialtyId = "1";
        it("should profession2specialty fetchByProfessionId", async() => {
            let profession2specialty = await Profession2specialtyModel.fetchByProfessionId(specialtyId);
            profession2specialty.should.be.an('object');
        });
        it("should return success false when profession2specialty not fetchByProfessionId or error an accurs", async() => {
            findOne.throws(new Error());
            let profession2specialty = await Profession2specialtyModel.fetchByProfessionId(specialtyId);
            profession2specialty.should.be.equal(0);
        })
    })
    describe("fetchById", () => {
        let specialtyId = "1";
        it("should profession2specialty fetchById", async() => {
            let profession2specialty = await Profession2specialtyModel.fetchById(specialtyId);
            profession2specialty.should.be.an('object');
        });
        it("should return success false when profession2specialty not fetchById or error an accurs", async() => {
            findOne.throws(new Error());
            let profession2specialty = await Profession2specialtyModel.fetchById(specialtyId);

            // profession2specialty.should.be.equal(0);
        })
    })
    describe("fetchAll", () => {
        it("should profession2specialty fetchAll", async() => {
            let profession2specialty = await Profession2specialtyModel.fetchAll();
            profession2specialty.should.be.an('array');
            profession2specialty.length.should.not.be.equal(0);
        });
        it("should return success as false when profession2specialty not fetchAll or error accurs", async() => {
            findAll.throws(new Error());
            let profession2specialty = await Profession2specialtyModel.fetchAll();
            profession2specialty.length.should.be.equal(0);
        })
    })


});