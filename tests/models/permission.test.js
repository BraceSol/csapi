const assert = require('assert');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const PermissionModel = require('../../models/permission');
const { Permission } = PermissionModel;
describe('Permission model test', () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(Permission, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(Permission, "findAll").resolves([{}]);
        create = sinon.stub(Permission, "create").resolves({ success: true });
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
                category: "items",
                pemissionCode: "332",
                permissionName: "yes",
                description: "some text"
            }
            it("should Permission create", async() => {
                let permission = await PermissionModel.create(data);
                permission.should.be.an('object');
                permission.should.have.property('permission');
                permission.success.should.be.equal(true);
            });
            it("should return success as false when Permission not create or error accurs", async() => {
                create.throws(new Error());
                let permission = await PermissionModel.create(data);
                permission.should.be.an('object');
                permission.should.not.have.property('permission');
                permission.success.should.be.equal(false);
            })
        })
        //update
    describe("update", () => {
            let data = {
                userId: "1",
                category: "items",
                pemissionCode: "332",
                permissionName: "yes",
                description: "some text"
            }
            it("should Permission update", async() => {
                let permission = await PermissionModel.update(data);
                permission.should.be.an('object');
                permission.should.have.property('permission');
                permission.success.should.be.equal(true);
            });
            it("should return success as false when Permission not create or error accurs", async() => {
                findOne.throws(new Error());
                let permission = await PermissionModel.update(data);
                permission.should.be.an('object');
                permission.should.not.have.property('permission');
                permission.success.should.be.equal(false);
            })
        })
        //delete
    describe("delete", () => {
        let userId = "1";
        it("should Permission delete", async() => {
            let permission = await PermissionModel.delete(userId);
            permission.should.be.an("boolean");
            permission.should.be.equal(true);
        });
        it("should return success as false when Permission not delete or error accurs", async() => {
            findOne.throws(new Error());
            let permission = await PermissionModel.delete(userId);
            permission.should.be.an("boolean");
            permission.should.be.equal(false);
        })
    });
    //fetchById
    describe("fetchById", () => {
        let userId = "1";
        it("should Permission fetchById", async() => {
            let permission = await PermissionModel.fetchById(userId);
            permission.should.be.an('object');
        });
        it("should return success as false when Permission not fetchById or error accurs", async() => {
            findOne.throws(new Error());
            let permission = await PermissionModel.fetchById(userId);
            permission.should.be.equal(0);
        })
    });
    //fetchByName
    describe("fetchByName", () => {
        let userId = "";
        it("should Permission fetchByName", async() => {
            let permission = await PermissionModel.fetchByName(userId);
            permission.should.be.an('object');


        });
        it("should return success when Permission not fetchByName or error accurs", async() => {
            findOne.throws(new Error());
            let permission = await PermissionModel.fetchByName(userId);
            permission.should.be.equal(0);
        });
    });
    //fetchAll
    describe("fetchAll", () => {
        it("should Permission fetchAll", async() => {
            let permission = await PermissionModel.fetchAll();
            permission.should.be.an('array');
            permission.length.should.not.be.equal(0);
        });
        it("should return success as false when Permission not fetchAll or error accurs", async() => {
            findAll.throws(new Error());
            let permission = await PermissionModel.fetchAll();
            permission.length.should.be.equal(0);
        })
    })

})