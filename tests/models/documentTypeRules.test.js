const sinon = require('sinon');
const should = require('chai').should();
const asser = require('assert');
const expect = require('chai').expect;

const DocumentTypeRuleModel = require('../../models/documentTypeRules');
const { DocumentTypeRule } = DocumentTypeRuleModel;
describe('DocumentTypeRules model test', () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(DocumentTypeRule, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(DocumentTypeRule, "findAll").resolves([{}]);
        create = sinon.stub(DocumentTypeRule, "create").resolves({ success: true });

    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    });
    describe("create", async() => {
        let data = {
            docTypeId: "1",
            docRuleName: "some name of rules",
            description: "some text",
            ruleQuery: "rules queries",
            statusCode: "Status Code"
        }
        it("should documentTypeRules create", async() => {

            let documentTypeRule = await DocumentTypeRuleModel.create(data);
            documentTypeRule.should.be.an('object');
            documentTypeRule.should.have.property('documentTypeRule');
            documentTypeRule.success.should.be.equal(true);
        });
        it("should return success as false when documentTypeRules not created or error occurs", async() => {
            create.throws(new Error());
            let documentTypeRule = await DocumentTypeRuleModel.create(data);
            documentTypeRule.should.have.not.property('documentTypeRule');
            documentTypeRule.success.should.be.equal(false);
        })
    });
    //update testing step
    describe("create", async() => {
        let data = {
            docTypeId: "1",
            docRuleName: "some name of rules",
            description: "some text",
            ruleQuery: "rules queries",
            statusCode: "Status Code"
        }
        it("should documentTypeRules update", async() => {

            let documentTypeRule = await DocumentTypeRuleModel.update(data);
            documentTypeRule.should.be.an('object');
            documentTypeRule.should.have.property('documentTypeRule');
            documentTypeRule.success.should.be.equal(true);
        });
        it("should return success as false when documentTypeRules not update or error occurs", async() => {
            findOne.throws(new Error());
            let documentTypeRule = await DocumentTypeRuleModel.update(data);
            documentTypeRule.should.have.not.property('documentTypeRule');
            documentTypeRule.success.should.be.equal(false);
        })
    });
    //deleting testing step
    describe("delete", async() => {
        let docTypeId = "1";
        it("should documentTypeRule delete", async() => {
            let documentTypeRule = await DocumentTypeRuleModel.delete(docTypeId);
            documentTypeRule.should.be.an('boolean');
            documentTypeRule.should.be.equal(true);

        });
        it("should return success as false when documentTypeRules not update or error occurs", async() => {
            findOne.throws(new Error());
            let documentTypeRule = await DocumentTypeRuleModel.delete(docTypeId);
            documentTypeRule.should.be.an('boolean');
            documentTypeRule.should.be.equal(false);
        });
    });
    //fetchById step

    describe("fetchById", async() => {
        let docRuleId = "1";
        it("should documentTypeRule fetchById", async() => {
            let documentTypeRule = await DocumentTypeRuleModel.fetchById(docRuleId);
            documentTypeRule.should.be.an('object');
        });
        it("should return success as false when documentTypeRules not update or error occurs", async() => {
            findOne.throws(new Error());
            let documentTypeRule = await DocumentTypeRuleModel.fetchById(docRuleId);
            documentTypeRule.should.be.equal(0);
        })
    });
    //fetchAll testing step

    describe("fetchAll", async() => {
        it("should fetchAll test", async() => {
            let documentTypeRule = await DocumentTypeRuleModel.fetchAll();
            documentTypeRule.should.be.an('array');
            documentTypeRule.length.should.be.not.equal(0);
        });
        it("should return success as false when documentTypeRules not update or error occurs", async() => {
            findAll.throws(new Error());
            let documentTypeRule = await DocumentTypeRuleModel.fetchAll();
            documentTypeRule.length.should.be.equal(0);
        })
    })


});