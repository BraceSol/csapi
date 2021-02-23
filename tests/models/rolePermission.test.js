const assert = require('assert');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const RolePermissionModel = require('../../models/rolePermission');
const { RolePermission } = RolePermissionModel;
describe("RolePermission Model", async() => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(RolePermission, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(RolePermission, "findAll").resolves([{}]);
        create = sinon.stub(RolePermission, "create").resolves({ success: true });
    });
    afterEach(() => {
            findOne.restore();
            findAll.restore();
            create.restore();
        })
        //create testing step
    describe("create", async() => {
            let data = {
                permissionId: "1",
                accessLevel: "level"
            }
            it("should rolePermission create", async() => {
                let rolePermission = await RolePermissionModel.create(data);
                rolePermission.should.be.an('object');
                rolePermission.should.have.property('rolePermission');
                rolePermission.success.should.be.equal(true);
            });
            it("should return success as false when rolePermission not create or error an accurs", async() => {
                create.throws(new Error());
                let rolePermission = await RolePermissionModel.create(data);
                rolePermission.should.be.an('object');
                rolePermission.should.not.have.property('rolePermission');
                rolePermission.success.should.be.equal(false);
            })
        })
        //update testing step
    describe("update", async() => {
            let data = {
                permissionId: "1",
                accessLevel: "level"
            }
            it("should rolePermission update", async() => {
                let rolePermission = await RolePermissionModel.update(data);
                rolePermission.should.be.an('object');
                rolePermission.should.have.property('rolePermission');
                rolePermission.success.should.be.equal(true);
            });
            it("should return success as false when rolePermission not update or error an accurs", async() => {
                findOne.throws(new Error());
                let rolePermission = await RolePermissionModel.update(data);
                rolePermission.should.be.an('object');
                rolePermission.should.not.have.property('rolePermission');
                rolePermission.success.should.be.equal(false);
            })
        })
        //delete testing step
    describe("delete", async() => {
        let rolePermissionId = "1";
        it("should rolePermission delete", async() => {
            let rolePermission = await RolePermissionModel.delete(rolePermissionId);
            rolePermission.should.be.an('boolean');
            rolePermission.should.be.equal(true);
        })
        it("should return success as false when rolePermission not delete or error accurs ", async() => {
            findOne.throws(new Error());
            let rolePermission = await RolePermissionModel.delete(rolePermissionId);
            rolePermission.should.be.an('boolean');
            rolePermission.should.be.equal(false);
        });
    });
    //fetchById
    describe("fetchById", async() => {
            let rolePermissionId = "1";
            it("should rolePermission fetchById", async() => {
                let rolePermission = await RolePermissionModel.fetchById(rolePermissionId);
                rolePermission.should.be.an('object');
            })
            it("should return success as false when rolePermission not fetchById or error accurs", async() => {
                findOne.throws(new Error());
                let rolePermission = await RolePermissionModel.fetchById(rolePermissionId);
                rolePermission.should.be.equal(0);
            })
        })
        //fetchAll testing steps
    describe("fetchAll", async() => {
        it("should rolePermission fetchAll", async() => {
            let rolePermission = await RolePermissionModel.fetchAll();
            rolePermission.should.be.an('array');
            rolePermission.length.should.not.be.equal(0);

        })
        it("should return success as false when rolePermission not fetchAll or error accurs ", async() => {
            findAll.throws(new Error());
            let rolePermission = await RolePermissionModel.fetchAll();
            rolePermission.should.be.an('array');
            rolePermission.length.should.be.equal(0);
        })
    })


})