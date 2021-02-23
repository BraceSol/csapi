const assert = require('assert');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const UserProfileModel = require('../../models/userProfile');
const { UserProfile } = UserProfileModel;
describe("userProfile model test", async() => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(UserProfile, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(UserProfile, "findAll").resolves([{}]);
        create = sinon.stub(UserProfile, "create").resolves({ success: true });

    })
    afterEach(() => {
            findOne.restore();
            findAll.restore();
            create.restore();
        })
        //create testing step
    describe("create", async() => {
        let data = {
            userProfileId: "1"
        }
        it("should userProfile create", async() => {
            let user = await UserProfileModel.create(data);
            user.should.be.an('object');
            user.should.have.property('userProfile');
            user.success.should.be.equal(true);
        });
        it("should return success as false when userProfile not create or error an accurs", async() => {
            create.throws(new Error());
            let user = await UserProfileModel.create(data);
            user.should.be.an('object');
            user.should.not.have.property('userProfile');
            user.success.should.be.equal(false);
        });
    });
    //update testing step
    describe("update", async() => {
        let data = {
            userProfileId: "1"
        }
        it("should userProfile update", async() => {
            let user = await UserProfileModel.update(data);
            user.should.be.an('object');
            user.should.have.property('userProfile');
            user.success.should.be.equal(true);
        });
        it("should return success as false when userProfile not update or error an accurs", async() => {
            findOne.throws(new Error());
            let user = await UserProfileModel.update(data);
            user.should.be.an('object');
            user.should.not.have.property('userProfile');
            user.success.should.be.equal(false);
        });
    });
    //delete testing steps
    describe("delete", async() => {
        let userProfileId = "1";
        it("should userProfile delete", async() => {
            let user = await UserProfileModel.delete(userProfileId);
            user.should.be.an('boolean');
            user.should.be.equal(true);
        });
        it("should return success as false when userProfile not delete or error an accur's", async() => {
            findOne.throws(new Error());
            let user = await UserProfileModel.delete(userProfileId);
            user.should.be.an('boolean');
            user.should.be.equal(false);
        });
    });
    //fetchById
    describe("fetchById", async() => {
        let userProfileId = "1";
        it("should userProfile fetchById", async() => {
            let user = await UserProfileModel.fetchById(userProfileId);
            user.should.be.an('object');
        });
        it("should return success as false when userProfile not fetchById or error an accur's", async() => {
            findOne.throws(new Error());
            let user = await UserProfileModel.fetchById(userProfileId);
            user.should.be.equal(0);
        });
    });
    //fetchAllByUserId
    describe("fetchAllByUserId", async() => {
        let userProfileId = "1";
        it("should userProfile fetchAllByUserId", async() => {
            let user = await UserProfileModel.fetchAllByUserId(userProfileId);
            user.should.be.an('array');
            user.length.should.be.not.equal(0);
        });
        it("should return success as false when userProfile not fetchAllByUserId or error an accur's", async() => {
            findAll.throws(new Error());
            let user = await UserProfileModel.fetchAllByUserId(userProfileId);
            user.should.be.equal(0);
        });
    });
    //fetchByUserId
    describe("fetchByUserId", async() => {
        let userProfileId = "1";
        it("should userProfile fetchByUserId", async() => {
            let user = await UserProfileModel.fetchByUserId(userProfileId);
            user.should.be.an('object');
        });
        it("should return success as false when userProfile not fetchByUserId or error an accur's", async() => {
            findOne.throws(new Error());
            let user = await UserProfileModel.fetchByUserId(userProfileId);
            user.should.be.equal(0);
        });
    });
    //fetchAll testing steps
    describe("fetchAll", async() => {
        it("should userProfile fetchAll", async() => {
            let user = await UserProfileModel.fetchAll();
            user.should.be.an('array');
            user.length.should.not.be.equal(0);
        });
        it("should return success as false when userProfile not fetchAll or error an accurrs", async() => {
            findAll.throws(new Error());
            let user = await UserProfileModel.fetchAll();
            user.should.be.an('array');
            user.length.should.be.equal(0);
        })
    })


})