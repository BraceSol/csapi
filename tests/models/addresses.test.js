const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('assert');
const AddressesModel = require('../../models/addresses');
const { Addresses } = AddressesModel;

describe('Address model test', () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(Addresses, "findOne").resolves({
            save: () => {
                return;
            }
        });
        findAll = sinon.stub(Addresses, "findAll").resolves([{}]);
        create = sinon.stub(Addresses, "create").resolves({ success: true });
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
            entityType: "Entity Type",
            addressType: "Address type",
            addressName: "The name of address",
            addressLine1: "First line ",
            addressLine2: "Second line",
            addressLine3: "Third line",
            city: "city",
            state: '14455',
            postalCode: "610610",
            phone: "03123000000",
            email: "some@gmail.com",
            statusCode: "3636"
        }
        it("should create addresses", async() => {
            let address = await AddressesModel.create(data);
            address.should.be.an('object');
            address.should.have.property('addresses');
            address.success.should.be.equal(true);
        })
        it("should return success as false when education not created or error occurs", async() => {
            create.throws(new Error());
            let address = await AddressesModel.create(data);
            address.should.be.an('object');
            address.should.have.not.property('addresses');
            address.success.should.be.equal(false);
        });
    });
    //second update test
    let data = {
        entityId: "1",
        entityType: "Entity Type",
        addressType: "Address type",
        addressName: "The name of address",
        addressLine1: "First line ",
        addressLine2: "Second line",
        addressLine3: "Third line",
        city: "city",
        state: '14455',
        postalCode: "610610",
        phone: "03123000000",
        email: "some@gmail.com",
        statusCode: "3636"
    }
    it("should update addresses", async() => {
        let address = await AddressesModel.update(data);
        address.should.be.an('object');
        address.should.have.property('addresses');
        address.success.should.be.equal(true);
    })
    it("should return success as false when address not update or error occurs", async() => {
        findOne.throws(new Error());
        let address = await AddressesModel.update(data);
        address.should.be.an('object');
        address.should.have.not.property('addresses');
        address.success.should.be.equal(false);
    });
    //third delete test
    describe("delet", async() => {
        let addressId = "1";
        it("should delete address", async() => {
            let address = await AddressesModel.delete(addressId);
            address.should.be.an('boolean');
            address.should.be.equal(true);
        });
        it("should return success as false when address not delete or error occurs", async() => {
            findOne.throws(new(Error));
            let address = await AddressesModel.delete(addressId);
            address.should.be.an('boolean');
            address.should.be.equal(false);
        });
    });
    //four fetch by id test

    describe("fetchById ", () => {
        let addressId = "1";
        it("should fetch by id address", async() => {
            let address = await AddressesModel.fetchById(addressId);
            address.should.be.an('object');

        });
        it("should return success as false when not  fetch by id address or error occurs", async() => {
            findOne.throws(new Error());
            let address = await AddressesModel.fetchById(addressId);

            address.should.be.equal(0);

        });
    });
    //five fetchAll test

    describe("fetchAll", async() => {
        it("should fetchAll address", async() => {
            let address = await AddressesModel.fetchAll();
            address.should.be.an('array');
            address.length.should.be.not.equal(0);
        });
        it("should return empty array when educations not found or error occurs", async() => {
            findAll.throws(new Error());
            let address = await AddressesModel.fetchAll();
            address.should.be.an('array');
            address.length.should.be.equal(0);
        });
    })


});