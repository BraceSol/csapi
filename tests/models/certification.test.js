const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('assert');
const CertificationModel = require('../../models/certification');
const { Certification } = CertificationModel;

describe('Certification model test', () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(Certification, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(Certification, "findAll").resolves([{}]);
        create = sinon.stub(Certification, "create").resolves({ success: true });
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
            certificationName: "Name",
            issuingBody: "body",
            issueDate: "date",
            expirationDate: "expiry date"
        }
        it("should create certification", async() => {
            let certification = await CertificationModel.create(data);
            certification.should.be.an('object');
            certification.should.have.property('certification');
            certification.success.should.be.equal(true);
        })
        it("should return success as false when  not create or error occurs", async() => {
            create.throws(new Error());
            let certification = await CertificationModel.create(data);
            certification.should.be.an('object');
            certification.should.not.have.property('certification');
            certification.success.should.be.equal(false);
        });
    });
    // update test
    describe("update", () => {
        let data = {
            userId: "1",
            certificationName: "Name",
            issuingBody: "body",
            issueDate: "date",
            expirationDate: "expiry date"
        }
        it("should certification update", async() => {
            let certification = await CertificationModel.update(data);
            certification.should.be.an('object');
            certification.should.have.property('certification');
            certification.success.should.be.equal(true);
        });
        it("should return success as false when  not create or error occurs", async() => {
            findOne.throws(new Error());
            let certification = await CertificationModel.update(data);
            certification.should.be.an('object');
            certification.should.not.have.property('certification');
            certification.success.should.be.equal(false);
        });
    });
    // delete test
    describe("delet", async() => {
        let userId = "1";
        it("should delete certification", async() => {
            let certification = await CertificationModel.delete(userId);
            certification.should.be.an('boolean');
            certification.should.be.equal(true);
        });
        it("should return success as false when certification not delete or error occurs", async() => {
            findOne.throws(new(Error));
            let certification = await CertificationModel.delete(userId);
            certification.should.be.an('boolean');
            certification.should.be.equal(false);
        });
    });
    // fetchAllByUserId

    describe("fetchAllByUserId", () => {
        let userId = "1";
        it("should delete certification", async() => {
            let certification = await CertificationModel.fetchAllByUserId(userId);
            certification.should.be.an('array');
            certification.length.should.not.be.equal(0);
        });
        it("should return 0 when certification not found by userId or error occurs", async() => {
            findAll.throws(new Error());
            let result = await CertificationModel.fetchAllByUserId(userId);
            result.should.be.equal(0);
        });
    });
    // fetch by id test

    describe("fetchById ", () => {
        let userId = "1";
        it("should fetch by id certification", async() => {
            let certification = await CertificationModel.fetchById(userId);
            certification.should.be.an('object');
            certification.should.not.equal(0);
        });
        it("should return success as false when not  fetch by id certification or error occurs", async() => {
            findOne.throws(new Error());
            let certification = await CertificationModel.fetchById(userId);
            certification.should.be.equal(0);
        });
    });
    // fetchAll test

    describe("fetchAll", async() => {
        it("should fetchAll certification", async() => {
            let certification = await CertificationModel.fetchAll();
            certification.should.be.an('array');
            certification.length.should.be.not.equal(0);
        });
        it("should return empty array when certification not found or error occurs", async() => {
            findAll.throws(new Error());
            let certification = await CertificationModel.fetchAll();
            certification.should.be.an('array');
            certification.length.should.be.equal(0);
        });
    })




});