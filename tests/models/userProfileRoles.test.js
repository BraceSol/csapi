const assert = require('assert');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const UserProfileRolesModel = require('../../models/userProfileRoles');
const { UserProfileRoles } = UserProfileRolesModel;
describe("userProfileRoles model test", async() => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(UserProfileRoles, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(UserProfileRoles, "findAll").resolves([{}]);
        create = sinon.stub(UserProfileRoles, "create").resolves({ success: true });
    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    });
    //create test steps
    describe("create", async() => {
            let data = {

                userProfileId: "1"
            };
            it("should userProfileRoles create", async() => {
                let user = await UserProfileRolesModel.create(data);
                user.should.be.an('object');
                user.should.have.property('userProfileRole');
                user.success.should.be.equal(true);
            })
            it("should return success as false when userProfileRoles are not create or error an accur's", async() => {
                create.throws(new Error());
                let user = await UserProfileRolesModel.create(data);
                user.should.be.an('object');
                user.should.not.have.property('userProfileRole');
                user.success.should.be.equal(false);
            })
        })
        //update test steps
    describe("update", async() => {
        let data = {

            userProfileId: "1"
        };
        it("should userProfileRoles update", async() => {
            let user = await UserProfileRolesModel.update(data);
            user.should.be.an('object');
            user.should.have.property('userProfileRole');
            user.success.should.be.equal(true);
        })
        it("should return success as false when userProfileRoles are not update or error an accur's", async() => {
            findOne.throws(new Error());
            let user = await UserProfileRolesModel.update(data);
            user.should.be.an('object');
            user.should.not.have.property('userProfileRole');
            user.success.should.be.equal(false);
        });
    });
    //delete testing step
    describe("delete", async() => {
        let userProfileId = "1";
        it("should userProfileRoles delete", async() => {
            let user = await UserProfileRolesModel.delete(userProfileId);
            user.should.be.an('boolean');
            user.should.be.equal(true);
        });
        it("should return success as false when userProfileRoles not delete or error an accur's", async() => {
            findOne.throws(new Error());
            let user = await UserProfileRolesModel.delete(userProfileId);
            user.should.be.an('boolean');
            user.should.be.equal(false);
        });

    });
    //fetchById
    describe("fetchById", async() => {
        let userProfileId = "1";
        it("should userProfileId fetchById", async() => {
            let user = await UserProfileRolesModel.fetchById(userProfileId);
            user.should.be.an('object');

        });
        it("should return success as false when userProfileRoles not fetchById or error an accur's", async() => {
            findOne.throws(new Error());
            let user = await UserProfileRolesModel.fetchById(userProfileId);

            user.should.be.equal(0);
        });
    });
    //fetchAll testing steps
    describe("fetchAll", async() => {
        it("should userProfileRoles fetchAll", async() => {
            let user = await UserProfileRolesModel.fetchAll();
            user.should.be.an('array');
            user.length.should.not.be.equal(0);
        });
        it("should return success as false when userProfileRoles not fetchAll or error an accur's", async() => {
            findAll.throws(new Error());
            let user = await UserProfileRolesModel.fetchAll();
            user.should.be.an('array');
            user.length.should.be.equal(0);
        })
    })


})