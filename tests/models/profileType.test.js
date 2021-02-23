const assert = require('assert');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const ProfileTypeModel = require('../../models/profileType');
const { ProfileType } = ProfileTypeModel;
describe('ProfileType model test', () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(ProfileType, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(ProfileType, "findAll").resolves([{}]);
        create = sinon.stub(ProfileType, "create").resolves({ success: true });
    });
    afterEach(() => {
            findOne.restore();
            findAll.restore();
            create.restore();
        })
        //create
    describe("create", () => {
            let data = {
                userId: "1",
                profileName: "tom",
                description: "any text"

            }
            it("should profileType create", async() => {
                let profile = await ProfileTypeModel.create(data);
                profile.should.be.an('object');
                profile.should.have.property('profileType');
                profile.success.should.be.equal(true);
            });
            it("should return success as false when profileType not create or error accurs", async() => {
                create.throws(new Error());
                let profile = await ProfileTypeModel.create(data);
                profile.should.be.an('object');
                profile.should.not.have.property('profileType');
                profile.success.should.be.equal(false);
            })
        })
        //update
    describe("update", () => {
            let data = {
                userId: "1",
                profileName: "tom",
                description: "any text"

            }
            it("should profileType update", async() => {
                let profile = await ProfileTypeModel.update(data);
                profile.should.be.an('object');
                profile.should.have.property('profileType');
                profile.success.should.be.equal(true);
            });
            it("should return success as false when profileType not update or error accurs", async() => {
                findOne.throws(new Error());
                let profile = await ProfileTypeModel.update(data);
                profile.should.be.an('object');
                profile.should.not.have.property('profileType');
                profile.success.should.be.equal(false);
            })
        })
        //delete
    describe("delete", () => {
        let userId = "1";
        it("should profileType delete", async() => {
            let profile = await ProfileTypeModel.delete(userId);
            profile.should.be.an("boolean");
            profile.should.be.equal(true);
        });
        it("should return success as false when profileType not delete or error accurs", async() => {
            findOne.throws(new Error());
            let profile = await ProfileTypeModel.delete(userId);
            profile.should.be.an("boolean");
            profile.should.be.equal(false);
        })
    });
    //fetchById
    describe("fetchById", () => {
        let userId = "1";
        it("should profileType fetchById", async() => {
            let profile = await ProfileTypeModel.fetchById(userId);
            profile.should.be.an('object');
        });
        it("should return success as false when profileType not fetchById or error accurs", async() => {
            findOne.throws(new Error());
            let profile = await ProfileTypeModel.fetchById(userId);
            profile.should.be.equal(0);
        })
    });
    //fetchByName
    describe("fetchByName", () => {
        let userId = "";
        it("should profileType fetchByName", async() => {
            let profile = await ProfileTypeModel.fetchByName(userId);
            profile.should.be.an('object');


        });
        it("should return success when profileType not fetchByName or error accurs", async() => {
            findOne.throws(new Error());
            let profile = await ProfileTypeModel.fetchByName(userId);
            profile.should.be.equal(0);
        });
    });
    //fetchAll
    describe("fetchAll", () => {
        it("should profileType fetchAll", async() => {
            let profile = await ProfileTypeModel.fetchAll();
            profile.should.be.an('array');
            profile.length.should.not.be.equal(0);
        });
        it("should return success as false when profileType not fetchAll or error accurs", async() => {
            findAll.throws(new Error());
            let profile = await ProfileTypeModel.fetchAll();
            profile.length.should.be.equal(0);
        })
    })

})