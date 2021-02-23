const assert = require("assert");
const sinon = require("sinon");
var should = require('chai').should();
var expect = require('chai').expect;
const UserModel = require("../../models/user");
const { User } = UserModel;

describe("Education model test", () => {
    let findOne, findAll, create;
    beforeEach(() => {
        findOne = sinon.stub(User, "findOne").resolves({ save: () => { return; } });
        findAll = sinon.stub(User, "findAll").resolves([{}]);
        create = sinon.stub(User, "create").resolves({ success: true });
    });
    afterEach(() => {
        findOne.restore();
        findAll.restore();
        create.restore();
    })
    describe("create", () => {
        let data = {
            userProfessionId: "1",
            email: "email@gmail.com",
            password: "asdf",
            profix: "profix",
            firstName: "sunny",
            middleName: "sunny",
            lastName: "tom",
            sufix: "sufix",
            twoFactorEnabled: "enabled",
            referralCode: "23324",
            resetToken: "reset token",
            pinCode: "pinCode",
            statusCode: "status code",
            professionId: "bds2222",
            specialtyIds: "specialtyids",
            createBy: "create by",
            updatedBy: "updated by",
            googleLoginId: "google login id",
            linkedinLoginId: "linkedin login id",
            facebookLoginId: "facebook login id"
        }
        it("should create User", async() => {
            let user = await UserModel.create(data);
            user.should.be.an('object');
        })
        it("should return success as false when User not created or error occurs", async() => {
            create.throws(new Error());
            let User = await UserModel.create(data);
            User.should.be.an('object');
            User.should.not.have.property('user');
            User.success.should.be.equal(false);
        })
    });
    describe("update", () => {
        let data = {
            userProfessionId: "1",
            email: "email@gmail.com",
            password: "asdf",
            profix: "profix",
            firstName: "sunny",
            middleName: "sunny",
            lastName: "tom",
            sufix: "sufix",
            twoFactorEnabled: "enabled",
            referralCode: "23324",
            resetToken: "reset token",
            pinCode: "pinCode",
            statusCode: "status code",
            professionId: "bds2222",
            specialtyIds: "specialtyids",
            createBy: "create by",
            updatedBy: "updated by",
            googleLoginId: "google login id",
            linkedinLoginId: "linkedin login id",
            facebookLoginId: "facebook login id"
        }
        it("should update User", async() => {
            let user = await UserModel.update(data);
            user.should.be.an('object');
        })
        it("should return success as false when User not updated or error occurs", async() => {
            findOne.throws(new Error());
            let User = await UserModel.update(data);
            User.should.be.an('object');
            User.should.not.have.property('user');
            User.success.should.be.equal(false);
        })
    });
    describe("updateCreatedBy", () => {
        let userProfessionId = "1";
        it("should user updateCreateBy", async() => {
            let user = await UserModel.updateCreatedBy(userProfessionId);
            user.should.be.equal(true)
        });
        it("should return success as false when user not updateCreateBy or error an accurs", async() => {
            findOne.throws(new Error());
            let user = await UserModel.updateCreatedBy(userProfessionId);
            user.should.be.equal(false)
        })
    })
    describe("updateProfessionalUser", () => {
        let data = {
            userProfessionId: "1",
            firstName: "sunny",
            email: "email@gmail.com",
            lastName: "tom",
            professionId: "bds2222",
            updatedBy: "updated by",
            specialtyIds: "specialtyids"
        }
        it("should user updateProfessionalUser", async() => {
            let user = await UserModel.updateProfessionalUser(data);
            user.should.be.equal(true);

        });
        it("should return success as false when user not updateProfessionalUser", async() => {
            findOne.throws(new Error());
            let user = await UserModel.updateProfessionalUser(data);
            user.should.not.be.an('object');
            user.should.be.equal(false);
        })
    })
    describe("updatePassword", () => {
        let data = {
            userProfessionId: "1",
            password: "asdf",
        }
        it("should user userPassword", async() => {
            let password = await UserModel.updatePassword(data);
            password.should.be.equal(true);
        });
        it("should return success as false when user not updatePassword or error an accurs", async() => {
            findOne.throws(new Error());
            let password = await UserModel.updatePassword(data);
            password.should.be.equal(false);
        })
    });
    describe("fetchNonProfessionalUser", async() => {
        let userProfessionId = "1";
        it("should user fetchNonProfessionalUser", async() => {
            let user = await UserModel.fetchNonProfessionalUser(userProfessionId);
            user.should.be.an('object');

        });
        it("should return success as false when user not fetchNonProfessionalUser", async() => {
            findOne.throws(new Error());
            let user = await UserModel.fetchNonProfessionalUser(userProfessionId);

            user.should.be.equal(0);
        })
    })
    describe("fetchUsersByProfession", async() => {

        it("should user fetchUsersByProfession", async() => {
            let user = await UserModel.fetchUsersByProfession();
            user.should.be.an('array');

        });
        it("should return success as false when user not fetchUsersByProfession", async() => {
            findAll.throws(new Error());
            let user = await UserModel.fetchUsersByProfession();

            user.should.be.equal(0);
        })
    })
    describe("fetchByUserAndPin", async() => {
        let userId = "1",
            pin = "1"
        it("should user fetchByUserAndPin", async() => {
            let user = await UserModel.fetchByUserAndPin(userId, pin);
            user.should.be.an('object');

        });
        it("should return success as false when user not fetchByUserAndPin", async() => {
            findOne.throws(new Error());
            let user = await UserModel.fetchByUserAndPin(userId, pin);

            user.should.be.equal(0);
        })
    })
    describe("fetchByEmail", async() => {
        let userId = "1";
        it("should user fetchByEmail", async() => {
            let user = await UserModel.fetchByEmail(userId);
            user.should.be.an('object');

        });
        it("should return success as false when user not fetchByEmail", async() => {
            findOne.throws(new Error());
            let user = await UserModel.fetchByEmail(userId);

            user.should.be.equal(0);
        })
    })
    describe("updateProfessionalUser", () => {
        let data = {
            userProfessionId: "1",
            pinCode: "12345"
        }
        it("should user updatePinCode", async() => {
            let user = await UserModel.updatePinCode(data);
            user.should.be.equal(true);

        });
        it("should return success as false when user not updatePinCode", async() => {
            findOne.throws(new Error());
            let user = await UserModel.updatePinCode(data);
            user.should.not.be.an('object');
            user.should.be.equal(false);
        })
    })
    describe("verifyPin", () => {
        let userId = "1",
            pin = "12345";
        it("should user verifyPin", async() => {
            let user = await UserModel.verifyPin(userId, pin);
            user.should.be.equal(true);
        });
        it("should return success as false when user not verify or error accurs", async() => {
            findOne.throws(new Error());
            let user = await UserModel.verifyPin(userId, pin);
            user.should.be.equal(false);
        })
    })
    describe("fetchAll", () => {
        it("should user fetchAll", async() => {
            let user = await UserModel.fetchAll();
            user.should.be.an('array');
            user.length.should.not.be.equal(0);
        });
        it("should return success as false when user not fetchAll or error accurs", async() => {
            findAll.throws(new Error());
            let user = await UserModel.fetchAll();
            user.should.be.an('array');
            user.length.should.be.equal(0);
        })
    })


})