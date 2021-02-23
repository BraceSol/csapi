const sinon = require('sinon');

const assert = require('assert');

const should = require('chai').should();

const expect = require('chai').expect;


const ActivityLogModel = require('../../models/activityLog');

const { ActivityLog } = ActivityLogModel;

describe('Activity model test', () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(ActivityLog, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(ActivityLog, "findAll").resolves([{}]);
        create = sinon.stub(ActivityLog, "create").resolves({ success: true });
    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    });
    describe("create", () => {
        let data = {
            logId: "1",
            entityType: 'Entity type ',
            activityCategory: 'Activity Category',
            activityTitle: 'Activity Title',
            description: 'Description',
            ipAddress: '128.10.100.00'
        }
        it("should create Activity Log", async() => {
            let activity = await ActivityLogModel.create(data);
            activity.should.be.an('object');
            activity.should.have.property('activityLog');
            activity.success.should.be.equal(true);
        });
        it("should return success as false when activity log not created or error occurs", async() => {
            create.throws(new Error());
            let activity = await ActivityLogModel.create(data);
            activity.should.be.an('object');
            activity.should.have.not.property('activityLog');
            activity.success.should.be.equal(false);
        });

    });
    describe("update", () => {
        let data = {
            logId: "1",
            activityId: "1",
            entityLog: "Entity Log",
            activityTitle: "Activity Log Title",
            activityCategory: "Activity Category",
            description: "Activity Log Description",
            ipAddress: "Activity Log IP Address"
        };
        it("should update Activity Log", async() => {
            let activity = await ActivityLogModel.update(data);
            activity.should.be.an('object');
            activity.should.have.property('activityLog');
            activity.success.should.be.equal(true);
        });
        it("should return success as false when activity log not updated or error occurs", async() => {
            findOne.throws(new Error());
            let activity = await ActivityLogModel.update(data);
            activity.should.be.an('object');
            activity.should.have.not.property('activityLog');
            activity.success.should.be.equal(false);
        });
    });
    describe("delete", () => {
        let activityId = "1";
        it("should delete activity log", async() => {
            let activity = await ActivityLogModel.delete(activityId);
            activity.should.be.an('boolean');
            activity.should.be.equal(true);
        });
        it("should return success as false when activity log not delete or error occurs", async() => {

            findOne.throws(new Error());
            let activity = await ActivityLogModel.delete(activityId);
            activity.should.be.an('boolean');
            activity.should.be.equal(false);
        });
    });
    describe("fetchById", () => {
        let activityId = "1";
        it("should found activity log by logId", async() => {
            let activity = await ActivityLogModel.fetchById(activityId);
            activity.should.be.an('object');

        });
        it("should return success as false when activity log not fetch by id or error occurs", async() => {
            findOne.throws(new Error());
            let activity = await ActivityLogModel.fetchById(activityId);


        });
    });
    describe("fetchAll", () => {
        it("should  fetchAll activity log ", async() => {

            let activity = await ActivityLogModel.fetchAll();
            activity.should.be.an('array');
            activity.length.should.not.be.equal(0)

        })
        it("should return success as false when activity log not fetch all or error occurs", async() => {
            findAll.throws(new Error());
            let activity = await ActivityLogModel.fetchAll();
            activity.should.be.an('array');
            activity.length.should.be.equal(0);

        })
    })

})