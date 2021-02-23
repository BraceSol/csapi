const assert = require('assert');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const ReferencesModel = require('../../models/references');
const { References } = ReferencesModel;
describe("References Model test", () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(References, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(References, "findAll").resolves([{}]);
        create = sinon.stub(References, "create").resolves({ success: true });
    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    });
    describe("create", () => {
        let data = {
            userId: "1",
            referenceName: "sharjeel",
            referencePhone: "1245410",
            referenceEmail: "asdf@gmail.com",
            contactMethod: "whatsApp"
        }
        it("should references model create", async() => {
            let reference = await ReferencesModel.create(data);
            reference.should.be.an('object');
            reference.should.have.property('references');
            reference.success.should.be.equal(true);
        });
        it("should return success as false when references not create or error accurs", async() => {
            create.throws(new Error());
            let reference = await ReferencesModel.create(data);
            reference.should.be.an('object');
            reference.should.not.have.property('references');
            reference.success.should.be.equal(false);
        })
    })


    //update testing
    describe("update", () => {
            let data = {
                referencesId: "1",
                userId: "1",
                referenceName: "name",
                referencePhone: "phone",
                referenceEmail: "email",
                contactMethod: "contact method"
            }
            it("should references model update", async() => {
                let ref = await ReferencesModel.update(data);
                ref.should.be.an('object');

            });
            it("should return success as false when references not update or error accurs", async() => {
                findOne.throws(new Error());
                let ref = await ReferencesModel.update(data);
                ref.should.be.an('object');
                ref.should.not.have.property('references');
                ref.success.should.be.equal(false)


            })
        })
        //delete testing step
    describe("delete", () => {
        let userId = "1";
        it("should role delete", async() => {
            let reference = await ReferencesModel.delete(userId);
            reference.should.be.an('boolean');
            reference.should.be.equal(true);
        })
        it("should return success as false when reference not delete or error accurs ", async() => {
            findOne.throws(new Error());
            let reference = await ReferencesModel.delete(userId);
            reference.should.be.an('boolean');
            reference.should.be.equal(false);
        });
    });
    //fetchAllByUserId
    describe("fetchAllByUserId", () => {
        let userId = "1";
        it("should delete references", async() => {
            let reference = await ReferencesModel.fetchAllByUserId(userId);
            reference.should.be.an('array');
            reference.length.should.not.be.equal(0);
        })
        it("should return 0 when references not found by userId or error occurs", async() => {
            findAll.throws(new Error());
            let reference = await ReferencesModel.fetchAllByUserId(userId);
            reference.should.be.equal(0);
        })
    })





    //fetchById
    describe("fetchById", () => {
            let userId = "1";
            it("should reference fetchById", async() => {
                let reference = await ReferencesModel.fetchById(userId);
                reference.should.be.an('object');
            })
            it("should return success as false when reference not fetchById or error accurs", async() => {
                findOne.throws(new Error());
                let reference = await ReferencesModel.fetchById(userId);
                reference.should.be.equal(0);
            })
        })
        //fetchAll testing steps
    describe("fetchAll", () => {
        it("should reference fetchAll", async() => {
            let reference = await ReferencesModel.fetchAll();
            reference.should.be.an('array');
            reference.length.should.not.be.equal(0);

        })
        it("should return success as false when reference not fetchAll or error accurs ", async() => {
            findAll.throws(new Error());
            let reference = await ReferencesModel.fetchAll();
            reference.should.be.an('array');
            reference.length.should.be.equal(0);
        })
    })




})