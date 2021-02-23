const assert = require('assert');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const RoleModel = require('../../models/role');
const { Role } = RoleModel;
describe("Role Model", async() => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(Role, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(Role, "findAll").resolves([{}]);
        create = sinon.stub(Role, "create").resolves({ success: true });
    });
    afterEach(() => {
            findOne.restore();
            findAll.restore();
            create.restore();
        })
        //create testing step
    describe("create", async() => {
            let data = {
                profileTypeId: "1",
                roleName: "name",
                description: "some text",
                isEnabled: "enabled"
            }
            it("should role create", async() => {
                let role = await RoleModel.create(data);
                role.should.be.an('object');
                role.should.have.property('role');
                role.success.should.be.equal(true);
            });
            it("should return success as false when role not create or error an accurs", async() => {
                create.throws(new Error());
                let role = await RoleModel.create(data);
                role.should.be.an('object');
                role.should.not.have.property('role');
                role.success.should.be.equal(false);
            })
        })
        //update testing step
    describe("update", () => {
            let data = {
                profileTypeId: "1",
                roleName: "name",
                description: "some text",
                isEnabled: "enabled"
            }
            it("should role update", async() => {
                let role = await RoleModel.update(data);
                role.should.be.an('object');
                role.should.have.property('role');
                role.success.should.be.equal(true);
            });
            it("should return success as false when role not update or error an accurs", async() => {
                findOne.throws(new Error());
                let role = await RoleModel.update(data);
                role.should.be.an('object');
                role.should.not.have.property('role');
                role.success.should.be.equal(false);
            })
        })
        //delete testing step
    describe("delete", () => {
        let profileTypeId = "1";
        it("should role delete", async() => {
            let role = await RoleModel.delete(profileTypeId);
            role.should.be.an('boolean');
            role.should.be.equal(true);
        })
        it("should return success as false when role not delete or error accurs ", async() => {
            findOne.throws(new Error());
            let role = await RoleModel.delete(profileTypeId);
            role.should.be.an('boolean');
            role.should.be.equal(false);
        });
    });
    //fetchById
    describe("fetchById", () => {
            let profileTypeId = "1";
            it("should role fetchById", async() => {
                let role = await RoleModel.fetchById(profileTypeId);
                role.should.be.an('object');
            })
            it("should return success as false when role not fetchById or error accurs", async() => {
                findOne.throws(new Error());
                let role = await RoleModel.fetchById(profileTypeId);
                role.should.be.equal(0);
            })
        })
        //fetchAll testing steps
    describe("fetchAll", () => {
        it("should role fetchAll", async() => {
            let role = await RoleModel.fetchAll();
            role.should.be.an('array');
            role.length.should.not.be.equal(0);

        })
        it("should return success as false when role not fetchAll or error accurs ", async() => {
            findAll.throws(new Error());
            let role = await RoleModel.fetchAll();
            role.should.be.an('array');
            role.length.should.be.equal(0);
        })
    })


})