const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('assert');
const DocumentsModel = require('../../models/documents');
const { Document } = DocumentsModel;

describe('Documents model test', () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(Document, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(Document, "findAll").resolves([{}]);
        create = sinon.stub(Document, "create").resolves({ success: true });
    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    });
    //first create test
    describe("create", () => {
        let data = {
            entityId: "1",
            userId: "1",
            uploadId: "upload id",
            documentTypesId: "document type id",
            storePath: "store path",
            filename: "filename",
            statusCode: "3636",
            createBy: "creaete by",
            updatedBy: "updated by"
        }
        it("should create Documents", async() => {
            let document = await DocumentsModel.create(data);
            document.should.be.an('object');
            document.should.have.property('document');
            document.success.should.be.equal(true);
        })
        it("should return success as false when Documents not created or error occurs", async() => {
            create.throws(new Error());
            let document = await DocumentsModel.create(data);
            document.should.be.an('object');
            document.should.have.not.property('document');
            document.success.should.be.equal(false);
        });
    });
    //second update test
    describe("update", () => {
        let data = {
            entityId: "1",
            userId: "1",
            uploadId: "upload id",
            documentTypesId: "document type id",
            storePath: "store path",
            filename: "filename",
            statusCode: "3636",
            createBy: "creaete by",
            updatedBy: "updated by"
        }
        it("should update Documents", async() => {
            let document = await DocumentsModel.update(data);
            document.should.be.an('object');
            document.should.have.property('document');
            document.success.should.be.equal(true)

        })
        it("should return success as false when Documents not update or error occurs", async() => {
            findOne.throws(new Error());
            let document = await DocumentsModel.update(data);
            document.should.be.an('object');
            document.should.have.not.property('document');
            document.success.should.be.equal(false);
        });
    });
    //third delete test
    describe("delet", async() => {
        let entityId = "1";
        it("should delete Documents", async() => {
            let document = await DocumentsModel.delete(entityId);
            document.should.be.an('boolean');
            document.should.be.equal(true);
        });
        it("should return success as false when Documents not delete or error occurs", async() => {
            findOne.throws(new Error());
            let document = await DocumentsModel.delete(entityId);
            document.should.be.an('boolean');
            document.should.be.equal(false);
        });
    });
    //four fetch by id test

    describe("fetchById ", () => {
        let entityId = "1";
        it("should fetch by id Documents", async() => {
            let documents = await DocumentsModel.fetchById(entityId);
            documents.should.be.an('object');

        });
        it("should return success as false when not  fetch by id Documents or error occurs", async() => {
            findOne.throws(new Error());
            let documents = await DocumentsModel.fetchById(entityId);
            documents.should.be.equal(0);

        });
    });
    //five fetchAll test
    describe("fetchAll", async() => {
        it("should Document fetchAll", async() => {
            let document = await DocumentsModel.fetchAll();
            document.should.be.an('array');
            document.length.should.not.be.equal(0);

        });
        it("should return success as false when Documents not fetchAll or error accurs", async() => {
            findAll.throws(new Error());
            let document = await DocumentsModel.fetchAll();
            document.should.be.an('array');
            document.length.should.be.equal(0);
        });
    })



});