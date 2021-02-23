const assert = require('assert');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const ProfessionModel = require('../../models/profession');
const { Profession } = ProfessionModel;
describe("Profession model test", () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(Profession, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(Profession, "findAll").resolves([{}]);
        create = sinon.stub(Profession, "create").resolves({ success: true });
    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    })
    describe("create", () => {
        let data = {
            userId: "1",
            professionName: "tom",
            description: "some text",
            sortOder: "order sort"
        }
        it("should profession create", async() => {
            let profession = await ProfessionModel.create(data);
            profession.should.be.an('object');
            profession.should.have.property('profession');
            profession.success.should.be.equal(true);
        });
        it("should return success as false when profession no create or error an accurs", async() => {
            create.throws(new Error());
            let profession = await ProfessionModel.create(data);
            profession.should.be.an('object');
            profession.should.not.have.property('profession');
            profession.success.should.be.equal(false);
        })
    })
    describe("update", () => {
        let data = {
            userId: "1",
            professionName: "tom",
            description: "some text",
            sortOder: "order sort"
        }
        it("should profession update", async() => {
            let profession = await ProfessionModel.update(data);
            profession.should.be.an('object');
            profession.should.have.property('profession');
            profession.success.should.be.equal(true);
        });
        it("should return success as false when profession no update or error an accurs", async() => {
            findOne.throws(new Error());
            let profession = await ProfessionModel.update(data);
            profession.should.be.an('object');
            profession.should.not.have.property('profession');
            profession.success.should.be.equal(false);
        })
    })
    describe("delete", async() => {
        let userId = "1";
        it("should profession delete", async() => {
            let profession = await ProfessionModel.delete(userId);
            profession.should.be.an('boolean');
            profession.should.be.equal(true);
        });
        it("should return success as false when profession not delete or error an accurs", async() => {
            findOne.throws(new Error());
            let profession = await ProfessionModel.delete(userId);
            profession.should.be.an('boolean');
            profession.should.be.equal(false);
        })
    });
    describe("fetchById", () => {
        let userId = "1";
        it("should found profession ", async() => {
            let profession = await ProfessionModel.fetchById(userId);
            profession.should.be.an('object');
        })
        it("should return 0 when profession not found fetchById or error occurs", async() => {
            findOne.throws(new Error());
            let profession = await ProfessionModel.fetchById(userId);
            profession.should.be.equal(0);
        })
    });
    describe("fetchByIndustry", () => {
        let industryId = "1";
        it("should found profession by fetchByIndustry ", async() => {
            let profession = await ProfessionModel.fetchByIndustry(industryId);
            profession.should.be.an('array');


        })
        it("should return 0 when profession not found fetchByIndustry or error occurs", async() => {
            findAll.throws(new Error());
            let profession = await ProfessionModel.fetchByIndustry(industryId);
            profession.should.be.equal(0);
        })
    });
    describe("fetchByName", () => {
        let userId = "";
        it("should profession fetchByName", async() => {
            let profession = await ProfessionModel.fetchByName(userId);
            profession.should.be.an('object');


        });
        it("should return success when profession not fetchByName or error accurs", async() => {
            findOne.throws(new Error());
            let profession = await ProfessionModel.fetchByName(userId);
            profession.should.be.equal(0);

        });
    });
    describe("fetchAll", () => {
        it("should profession fetchAll", async() => {
            let profession = await ProfessionModel.fetchAll();
            profession.should.be.an('array');
            profession.length.should.not.be.equal(0);
        });
        it("should return success as false when profession not fetchAll or error accurs", async() => {
            findAll.throws(new Error());
            let profession = await ProfessionModel.fetchAll();
            profession.length.should.be.equal(0);
        })
    })
})