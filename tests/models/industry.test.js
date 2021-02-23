const assert = require('assert');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const IndustryModel = require('../../models/industry');
const { Industry } = IndustryModel;

describe("Industry Model test", async() => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(Industry, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(Industry, "findAll").resolves([{}]);
        create = sinon.stub(Industry, "create").resolves({ success: true });
    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    });
    //creating testing step
    describe("create", async() => {
        let data = {
            industryName: 'Industry Name',
            description: 'some text'
        }
        it("should industry create", async() => {
            let industry = await IndustryModel.create(data);
            industry.should.be.an('object');
            industry.should.have.property('industry');
            industry.success.should.be.equal(true);
        });
        it("should return empty array when industry not found for delete sor error occurs", async() => {
            create.throws(new Error());
            let industry = await IndustryModel.create(data);
            industry.should.be.an('object');
            industry.should.have.not.property('industry');
            industry.success.should.be.equal(false);
        });
    });
    //updating testing step
    describe("update", async() => {
        let data = {
            industryName: 'Industry Name',
            description: 'some text'
        }
        it("should industry update", async() => {
            let industry = await IndustryModel.update(data);
            industry.should.be.an('object');
            industry.should.have.property('industry');
            industry.success.should.be.equal(true);
        });
        it("should return empty array when industry not found for update sor error occurs", async() => {
            findOne.throws(new Error());
            let industry = await IndustryModel.update(data);
            industry.should.be.an('object');
            industry.should.have.not.property('industry');
            industry.success.should.be.equal(false);
        });
    });
    //deleting testing step
    describe("deleting", async() => {
        let industryId = "1";
        it("should industry delete", async() => {
            let industry = await IndustryModel.delete(industryId);
            industry.should.be.an('boolean');
            industry.should.be.equal(true);
        })
        it("should return empty array when industry not found for delete sor error occurs", async() => {
            findOne.throws(new Error());
            let industry = await IndustryModel.delete(industryId);

            industry.should.be.equal(false);
        });
    });
    //fetchById
    describe("fetchById", async() => {
        let industryId = "1";
        it("should industry fetchById", async() => {
            let industry = await IndustryModel.fetchById(industryId);
            industry.should.be.an('object');

        });
        it("should return empty array when industry not found for fetchById sor error occurs", async() => {
            findOne.throws(new Error());
            let industry = await IndustryModel.fetchById(industryId);
            industry.should.be.equal(0);
        });
    });
    //fetchAll
    describe("fetchAll", async() => {
        it("should industry fetchAll", async() => {
            let industry = await IndustryModel.fetchAll();
            industry.should.be.an('array');
            industry.length.should.not.be.equal(0);
        });
        it("should return empty array when industry not found for fetchAll sor error occurs", async() => {
            findAll.throws(new Error());
            let industry = await IndustryModel.fetchAll();
            industry.should.be.an('array');
            industry.length.should.be.equal(0);
        });
    });


});