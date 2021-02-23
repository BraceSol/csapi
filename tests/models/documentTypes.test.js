const sinon = require('sinon');
const should = require('chai').should();
const assert = require('assert');
const expect = require('chai').expect;
const DocumentTypeModel = require('../../models/documentTypes');
const { DocumentType } = DocumentTypeModel;
describe("DocumentType model test", async() => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(DocumentType, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(DocumentType, "findAll").resolves([{}]);
        create = sinon.stub(DocumentType, "create").resolves({ success: true });

    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    });
    //creating test step
    describe("create", async() => {
            let data = {
                docCategoryId: "any id",
                documentName: "document name",
                description: "some text",
                requirementLevel: "requirement level",
                prefix: "prifix",
                exampleDocuments: "any example of document",
                references: "refernces",
                statusCode: "status code",

            }
            it("should documentTypes create", async() => {
                let documentType = await DocumentTypeModel.create(data);
                documentType.should.be.an('object');
                documentType.should.have.property('documentTypes');
                documentType.success.should.be.equal(true);
            });
            it("should return success as false when documentTypes not create or error occurs", async() => {
                create.throws(new Error());
                let documentType = await DocumentTypeModel.create(data);
                documentType.should.have.not.property('documentTypes');
                documentType.success.should.be.equal(false);
            })
        })
        //updating test step
    describe("update", async() => {
        let data = {
            docCategoryId: "any id",
            documentName: "document name",
            description: "some text",
            requirementLevel: "requirement level",
            prefix: "prifix",
            exampleDocuments: "any example of document",
            references: "refernces",
            statusCode: "status code",

        }
        it("should documentTypes update", async() => {
            let documentType = await DocumentTypeModel.update(data);
            documentType.should.be.an('object');
            documentType.should.have.property('documentTypes');
            documentType.success.should.be.equal(true);
        });
        it("should return success as false when documentTypes not update or error occurs", async() => {
            findOne.throws(new Error());
            let documentType = await DocumentTypeModel.update(data);
            documentType.should.have.not.property('documentTypes');
            documentType.success.should.be.equal(false);
        })
    });
    //deleting testing step

    describe("delete", async() => {
        let docCategoryId = "1";
        it("should documentType delete", async() => {
            let documentType = await DocumentTypeModel.delete(docCategoryId);
            documentType.should.be.an('boolean');
            documentType.should.be.equal(true);
        });
        it("should return success as false when documentTypes not delete or error occurs", async() => {
            findOne.throws(new Error());
            let documentType = await DocumentTypeModel.delete(docCategoryId);
            documentType.should.be.equal(false);
        })

    });
    //fetchById testing step
    describe("fetchById", async() => {
        let docCategoryId = "1";
        it("should documentTypes fetchById", async() => {
            let documentType = await DocumentTypeModel.fetchById(docCategoryId);
            documentType.should.be.an('object');
        })
        it("should return success as false when documentTypes not delete or error occurs", async() => {
            findOne.throws(new Error());
            let documentType = await DocumentTypeModel.fetchById(docCategoryId)
        })
    });
    //fetchAll testing step
    describe("fetchAll", async() => {
        it("should documentType", async() => {
            let documentType = await DocumentTypeModel.fetchAll();
            documentType.should.be.an('array');
            documentType.length.should.be.not.equal(0);
        });
        it("should return success as false when documentTypes not fetchAll or error occurs", async() => {
            findAll.throws(new Error());
            let documentType = await DocumentTypeModel.fetchAll();
            documentType.length.should.be.equal(0);
        });

    });


});