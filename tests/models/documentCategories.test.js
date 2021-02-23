const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('assert');
const DocumentCategoriesModel = require('../../models/documentCategories');
const { DocumentCategories } = DocumentCategoriesModel;

describe('DocumentCategories model test', () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(DocumentCategories, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(DocumentCategories, "findAll").resolves([{}]);
        create = sinon.stub(DocumentCategories, "create").resolves({ success: true });
    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    });
    //first create test
    describe("create", () => {
        let data = {
            industryId: "1",
            categoryName: "laptops",
            description: "some text"

        }
        it("should create DocumentCategories", async() => {
            let DocumentCategory = await DocumentCategoriesModel.create(data);
            DocumentCategory.should.be.an('object');

        })
        it("should return success as false when DocumentCategories not created or error occurs", async() => {
            create.throws(new Error());
            let documentCategory = await DocumentCategoriesModel.create(data);

            documentCategory.success.should.be.equal(false);
        });
    });
    //second update test
    let data = {
        industryId: "1",
        categoryName: "laptops",
        description: "some text"
    }
    it("should update DocumentCategories", async() => {
        let documentCategory = await DocumentCategoriesModel.update(data);
        documentCategory.should.be.an('object');

    })
    it("should return success as false when DocumentCategories not update or error occurs", async() => {
        findOne.throws(new Error());
        let documentCategory = await DocumentCategoriesModel.update(data);

        documentCategory.success.should.be.equal(false);
    });
    //third delete test
    describe("delet", async() => {
        let docCategoryId = "1";
        it("should delete DocumentCategories", async() => {
            let documentCategory = await DocumentCategoriesModel.delete(docCategoryId);
            documentCategory.should.be.an('boolean');
            documentCategory.should.be.equal(true);
        });
        it("should return success as false when documentCategory not delete or error occurs", async() => {
            findOne.throws(new(Error));
            let documentCategory = await DocumentCategoriesModel.delete(docCategoryId);
            documentCategory.should.be.an('boolean');
            documentCategory.should.be.equal(false);
        });
    });
    //four fetch by id test

    describe("fetchById ", () => {
        let docCategoryId = "1";
        it("should fetch by id documentCategory", async() => {
            let documentCategory = await DocumentCategoriesModel.fetchById(docCategoryId);
            documentCategory.should.be.an('object');

        });
        it("should return success as false when not  fetch by id documentCategory or error occurs", async() => {
            findOne.throws(new Error());
            let documentCategory = await DocumentCategoriesModel.fetchById(docCategoryId);

            documentCategory.should.be.equal(0);
        });
    });
    //five fetchAll test

    describe("fetchAll", () => {
        it("should fetchAll documentCategory", async() => {
            let documentCategory = await DocumentCategoriesModel.fetchAll();
            documentCategory.should.be.an('array');
            documentCategory.length.should.be.not.equal(0);
        });
        it("should return empty array when documentCategory not found or error occurs", async() => {
            findAll.throws(new Error());
            let documentCategory = await DocumentCategoriesModel.fetchAll();
            documentCategory.should.be.an('array');
            documentCategory.length.should.be.equal(0);
        });
    })


});