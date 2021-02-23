const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('assert');
const DocumentTypeAttributeModel = require('../../models/documentTypeAttributes');
const { DocumentTypeAttribute } = DocumentTypeAttributeModel;

describe('DocumentTypeAttribute model test', () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(DocumentTypeAttribute, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(DocumentTypeAttribute, "findAll").resolves([{}]);
        create = sinon.stub(DocumentTypeAttribute, "create").resolves({ success: true });
    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    });
    //first create test
    describe("create", () => {
        let data = {
            documentTypeId: "1",
            attributeName: "some",
            descripition: "some text",
            statusCode: "1122"
        }
        it("should create DocumentTypeAttribute", async() => {
            let DocumentTypeAttribute = await DocumentTypeAttributeModel.create(data);
            DocumentTypeAttribute.should.be.an('object');
            DocumentTypeAttribute.should.have.property('documentTypeAttributes');
            DocumentTypeAttribute.success.should.be.equal(true);
        })
        it("should return success as false when DocumentTypeAttribute not created or error occurs", async() => {
            create.throws(new Error());
            let DocumentTypeAttribute = await DocumentTypeAttributeModel.create(data);
            DocumentTypeAttribute.should.be.an('object');
            DocumentTypeAttribute.should.not.have.property('documentTypeAttribute');
            DocumentTypeAttribute.success.should.be.equal(false);
        });
    });
    //second update test
    let data = {
        documentTypeId: "1",
        attributeName: "some",
        descripition: "some text",
        statusCode: "1122"
    }
    it("should update DocumentTypeAttribute", async() => {
        let DocumentTypeAttribute = await DocumentTypeAttributeModel.update(data);
        DocumentTypeAttribute.should.be.an('object');
        DocumentTypeAttribute.should.have.property('documentTypeAttributes');
        DocumentTypeAttribute.success.should.be.equal(true);
    })
    it("should return success as false when DocumentTypeAttribute not update or error occurs", async() => {
        findOne.throws(new Error());
        let DocumentTypeAttribute = await DocumentTypeAttributeModel.update(data);
        DocumentTypeAttribute.should.be.an('object');
        DocumentTypeAttribute.should.not.have.property('documentTypeAttributes');
        DocumentTypeAttribute.success.should.be.equal(false);
    });
    //third delete test
    describe("delet", async() => {
        let documentTypeId = "1";
        it("should delete DocumentTypeAttribute", async() => {
            let DocumentTypeAttribute = await DocumentTypeAttributeModel.delete(documentTypeId);
            DocumentTypeAttribute.should.be.an('boolean');
            DocumentTypeAttribute.should.be.equal(true);
        });
        it("should return success as false when DocumentTypeAttribute not delete or error occurs", async() => {
            findOne.throws(new(Error));
            let DocumentTypeAttribute = await DocumentTypeAttributeModel.delete(documentTypeId);
            DocumentTypeAttribute.should.be.an('boolean');
            DocumentTypeAttribute.should.be.equal(false);
        });
    });
    //four fetch by id test

    describe("fetchById ", () => {
        let documentTypeId = "1";
        it("should fetch by id DocumentTypeAttribute", async() => {
            let DocumentTypeAttribute = await DocumentTypeAttributeModel.fetchById(documentTypeId);
            DocumentTypeAttribute.should.be.an('object');

        });
        it("should return success as false when not  fetch by id DocumentTypeAttribute or error occurs", async() => {
            findOne.throws(new Error());
            let DocumentTypeAttribute = await DocumentTypeAttributeModel.fetchById(documentTypeId);

            DocumentTypeAttribute.should.be.equal(0);
        });
    });
    //five fetchAll test

    describe("fetchAll", async() => {
        it("should fetchAll DocumentTypeAttribute", async() => {
            let DocumentTypeAttribute = await DocumentTypeAttributeModel.fetchAll();
            DocumentTypeAttribute.should.be.an('array');
            DocumentTypeAttribute.length.should.be.not.equal(0);
        });
        it("should return empty array when DocumentTypeAttribute not found or error occurs", async() => {
            findAll.throws(new Error());
            let DocumentTypeAttribute = await DocumentTypeAttributeModel.fetchAll();
            DocumentTypeAttribute.should.be.an('array');
            DocumentTypeAttribute.length.should.be.equal(0);
        });
    })


});