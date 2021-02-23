const assert = require('assert');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const SpecialtyModel = require('../../models/specialty');
const { Specialty } = SpecialtyModel;
describe('Specialty model test', () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(Specialty, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(Specialty, "findAll").resolves([{}]);
        create = sinon.stub(Specialty, "create").resolves({ success: true });
    });
    afterEach(() => {
            findOne.restore();
            findAll.restore();
            create.restore();
        })
        //create
    describe("create", () => {
            let data = {
                industryId: "1",
                specialtyName: "tom",
                description: "any text"

            }
            it("should Specialty create", async() => {
                let Specialty = await SpecialtyModel.create(data);
                Specialty.should.be.an('object');
                Specialty.should.have.property('specialty');
                Specialty.success.should.be.equal(true);
            });
            it("should return success as false when Specialty not create or error accurs", async() => {
                create.throws(new Error());
                let Specialty = await SpecialtyModel.create(data);
                Specialty.should.be.an('object');
                Specialty.should.not.have.property('specialty');
                Specialty.success.should.be.equal(false);
            })
        })
        //update
    describe("update", () => {
            let data = {
                industryId: "1",
                specialtyName: "tom",
                description: "any text"

            }
            it("should Specialty update", async() => {
                let Specialty = await SpecialtyModel.update(data);
                Specialty.should.be.an('object');
                Specialty.should.have.property('specialty');
                Specialty.success.should.be.equal(true);
            });
            it("should return success as false when Specialty not update or error accurs", async() => {
                findOne.throws(new Error());
                let Specialty = await SpecialtyModel.update(data);
                Specialty.should.be.an('object');
                Specialty.should.not.have.property('specialty');
                Specialty.success.should.be.equal(false);
            })
        })
        //delete
    describe("delete", () => {
        let userId = "1";
        it("should Specialty delete", async() => {
            let Specialty = await SpecialtyModel.delete(userId);
            Specialty.should.be.an("boolean");
            Specialty.should.be.equal(true);
        });
        it("should return success as false when Specialty not delete or error accurs", async() => {
            findOne.throws(new Error());
            let Specialty = await SpecialtyModel.delete(userId);
            Specialty.should.be.an("boolean");
            Specialty.should.be.equal(false);
        })
    });
    //fetchById
    describe("fetchById", () => {
        let userId = "1";
        it("should Specialty fetchById", async() => {
            let Specialty = await SpecialtyModel.fetchById(userId);
            Specialty.should.be.an('object');
        });
        it("should return success as false when Specialty not fetchById or error accurs", async() => {
            findOne.throws(new Error());
            let Specialty = await SpecialtyModel.fetchById(userId);
            Specialty.should.be.equal(0);
        })
    });
    //fetchByName
    describe("fetchByName", () => {
        let userId = "";
        it("should Specialty fetchByName", async() => {
            let Specialty = await SpecialtyModel.fetchByName(userId);
            Specialty.should.be.an('object');


        });
        it("should return success when Specialty not fetchByName or error accurs", async() => {
            findOne.throws(new Error());
            let Specialty = await SpecialtyModel.fetchByName(userId);
            Specialty.should.be.equal(0);
        });
    });
    describe("fetchByIndustry", () => {
        let industryId = "1";
        it("should found Specialty by fetchByIndustry ", async() => {
            let Specialty = await SpecialtyModel.fetchByIndustry(industryId);
            Specialty.should.be.an('array');


        })
        it("should return 0 when Specialty not found fetchByIndustry or error occurs", async() => {
            findAll.throws(new Error());
            let Specialty = await SpecialtyModel.fetchByIndustry(industryId);
            Specialty.should.be.equal(0);
        })
    });



    //fetchAll
    describe("fetchAll", () => {
        it("should Specialty fetchAll", async() => {
            let Specialty = await SpecialtyModel.fetchAll();
            Specialty.should.be.an('array');
            Specialty.length.should.not.be.equal(0);
        });
        it("should return success as false when Specialty not fetchAll or error accurs", async() => {
            findAll.throws(new Error());
            let Specialty = await SpecialtyModel.fetchAll();
            Specialty.length.should.be.equal(0);
        })
    })

})