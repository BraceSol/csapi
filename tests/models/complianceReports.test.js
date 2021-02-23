const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('assert');
const ComplianceReportsModel = require('../../models/complianceReports');
const { ComplianceReport } = ComplianceReportsModel;

describe('ComplianceReport model test', () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(ComplianceReport, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(ComplianceReport, "findAll").resolves([{}]);
        create = sinon.stub(ComplianceReport, "create").resolves({ success: true });
    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    });
    //first create test
    describe("create", () => {
        let data = {
            userId: "1",
            initialScore: "134",
            currentScore: "25",
            missingDocs: "asdf",
            totalDocs: "40",
            expiringDocs: "10",
            statusCode: "61060"
        }
        it("should create ComplianceReport", async() => {
            let ComplianceReport = await ComplianceReportsModel.create(data);
            ComplianceReport.should.be.an('object');
            ComplianceReport.should.have.property('complianceReports');
            ComplianceReport.success.should.be.equal(true);
        })
        it("should return success as false when ComplianceReport not created or error occurs", async() => {
            create.throws(new Error());
            let ComplianceReport = await ComplianceReportsModel.create(data);
            ComplianceReport.should.be.an('object');
            ComplianceReport.should.not.have.property('complianceReports');
            ComplianceReport.success.should.be.equal(false);
        });
    });
    //second update test
    let data = {
        userId: "1",
        initialScore: "134",
        currentScore: "25",
        missingDocs: "asdf",
        totalDocs: "40",
        expiringDocs: "10",
        statusCode: "61060"
    }
    it("should update ComplianceReports", async() => {
        let ComplianceReport = await ComplianceReportsModel.update(data);
        ComplianceReport.should.be.an('object');
        ComplianceReport.should.have.property('complianceReports');
        ComplianceReport.success.should.be.equal(true);
    })
    it("should return success as false when ComplianceReports not update or error occurs", async() => {
        findOne.throws(new Error());
        let ComplianceReport = await ComplianceReportsModel.update(data);
        ComplianceReport.should.be.an('object');
        ComplianceReport.should.not.have.property('complianceReports');
        ComplianceReport.success.should.be.equal(false);
    });
    //third delete test
    describe("delet", async() => {
        let complianceReportId = "1";
        it("should delete address", async() => {
            let ComplianceReport = await ComplianceReportsModel.delete(complianceReportId);
            ComplianceReport.should.be.an('boolean');
            ComplianceReport.should.be.equal(true);
        });
        it("should return success as false when ComplianceReports not delete or error occurs", async() => {
            findOne.throws(new Error());
            let ComplianceReport = await ComplianceReportsModel.delete(complianceReportId);
            ComplianceReport.should.be.an('boolean');
            ComplianceReport.should.be.equal(false);
        });
    });
    //four fetch by id test

    describe("fetchById ", () => {
        let ComplianceReportId = "1";
        it("should fetch by id ComplianceReports", async() => {
            let ComplianceReport = await ComplianceReportsModel.fetchById(ComplianceReportId);
            ComplianceReport.should.be.an('object');
            ComplianceReport.should.not.equal(0)
        });
        it("should return success as false when not  fetch by id ComplianceReports or error occurs", async() => {
            findOne.throws(new Error());
            let ComplianceReport = await ComplianceReportsModel.fetchById(ComplianceReportId);
            ComplianceReport.should.be.equal(0);
        });
    });
    //five fetchAll test

    describe("fetchAll", async() => {
        it("should fetchAll ComplianceReport", async() => {
            let ComplianceReport = await ComplianceReportsModel.fetchAll();
            ComplianceReport.should.be.an('array');
            ComplianceReport.length.should.be.not.equal(0);
        });
        it("should return empty array when ComplianceReport not found or error occurs", async() => {
            findAll.throws(new Error());
            let ComplianceReport = await ComplianceReportsModel.fetchAll();
            ComplianceReport.should.be.an('array');
            ComplianceReport.length.should.be.equal(0);
        });
    })


});