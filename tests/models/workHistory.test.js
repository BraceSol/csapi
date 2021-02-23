const assert = require('assert');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const WorkHistoryModel = require('../../models/workHistory');
const { WorkHistory } = WorkHistoryModel;
describe("WorkHistory Model test", async() => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(WorkHistory, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(WorkHistory, "findAll").resolves([{}]);
        create = sinon.stub(WorkHistory, "create").resolves({ success: true });
    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    });
    describe("create", async() => {
        let data = {
            userId: "1",
            employerName: "any name",
            position: "position",
            facilityName: "facility name",
            startDate: "start date",
            endDate: "end date",
            employerCity: "city",
            employerState: "state",
            employerPostalCode: "postal code",
            bedCount: "bed count",
            shift: "shift",
            chargeExp: "charge exp",
            jobTypeCode: "job type code",
            nurseToPatientRatio: "ratio",
            bedsInFacility: "bed facility",
            reasonForLeaving: "reason",
            reference: "references"
        }
        it("should workHistory create", async() => {
            let work = await WorkHistoryModel.create(data);
            work.should.be.an('object');
            work.should.have.property('workHistory');
            work.success.should.be.equal(true);
        })
        it("should return success as false when work history not create or error accurs", async() => {
            create.throws(new Error());
            let work = await WorkHistoryModel.create(data);
            work.should.be.an('object');
            work.should.not.have.property('workHistory');
            work.success.should.be.equal(false);
        });
    });
    //update testing steps
    describe("update", async() => {
        let data = {
            userId: "1",
            employerName: "any name",
            position: "position",
            facilityName: "facility name",
            startDate: "start date",
            endDate: "end date",
            employerCity: "city",
            employerState: "state",
            employerPostalCode: "postal code",
            bedCount: "bed count",
            shift: "shift",
            chargeExp: "charge exp",
            jobTypeCode: "job type code",
            nurseToPatientRatio: "ratio",
            bedsInFacility: "bed facility",
            reasonForLeaving: "reason",
            reference: "references"
        }
        it("should workHistory update", async() => {
            let work = await WorkHistoryModel.update(data);
            work.should.be.an('object');
            work.should.have.property('workHistory');
            work.success.should.be.equal(true);
        })
        it("should return success as false when work history not update or error accurs", async() => {
            findOne.throws(new Error());
            let work = await WorkHistoryModel.update(data);
            work.should.be.an('object');
            work.should.not.have.property('workHistory');
            work.success.should.be.equal(false);
        });
    });
    //delete testing steps
    describe("delete", async() => {
        let userId = "1";
        it("should workHistory delete", async() => {
            let work = await WorkHistoryModel.delete(userId);
            work.should.be.an('boolean');
            work.should.be.eq(true);
        });
        it("should return success as false when work history not delete or error accurs", async() => {
            findOne.throws(new Error());
            let work = await WorkHistoryModel.delete(userId);
            work.should.be.eq(false);
        });

    });
    //fetchAllByUserId
    describe("fetchAllByUserId", async() => {
        let userId = "1";
        it("should workHistory fetchAllByUserId", async() => {
            let work = await WorkHistoryModel.fetchAllByUserId(userId);
            work.should.not.be.eq(0);
        });
        it("should return success as false when work history not userId or error accurs", async() => {
            findAll.throws(new Error());
            let work = await WorkHistoryModel.fetchAllByUserId(userId);
            work.should.be.eq(0);
        });
        //fetchById
        describe("fetchById", async() => {
            let userId = "1";
            it("should work history fetchById", async() => {
                let work = await WorkHistoryModel.fetchById(userId);
                work.should.be.an('object');

            });
            it("should return success as false when work history not fetchById or error accurs", async() => {
                findOne.throws(new Error());
                let work = await WorkHistoryModel.fetchById(userId);
                work.should.be.equal(0);
            });
        });
        //fetchAll testing steps
        describe("fetchAll", async() => {
            it("should work history fetchAll", async() => {
                let work = await WorkHistoryModel.fetchAll();
                work.should.be.an('array');
                work.length.should.be.not.equal(0);
            });
            it("should return success as false when work history not fetchAll or error accurs", async() => {
                findAll.throws(new Error());
                let work = await WorkHistoryModel.fetchAll();
                work.length.should.be.equal(0);
            })
        })



    })




})