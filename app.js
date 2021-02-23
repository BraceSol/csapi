const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
// import passport and passport-jwt modules
const passport = require('passport');
const passportJWT = require('passport-jwt');
const cookieParser = require('cookie-parser');
const uuid = require('uuid/v4');
const multer = require('multer');
const fs = require('fs');

const sequelize = require('./utils/database');
const { User } = require('./models/user');
const { Permission } = require('./models/permission');
const { Role } = require("./models/role");
const { RolePermission } = require("./models/rolePermission");
const { UserProfileRoles } = require("./models/userProfileRoles");
const { Industry } = require('./models/industry');
const { Profession } = require('./models/profession');
const { Specialty } = require('./models/specialty');
const { Profession2specialty } = require('./models/profession2specialty');
const { ProfileType } = require('./models/profileType');
const { UserProfile } = require('./models/userProfile');
const { Device } = require('./models/device');
const { WorkHistory } = require('./models/workHistory');
const { License } = require("./models/license");
const { Certification } = require("./models/certification");
const { Education } = require("./models/education");
const { DocumentCategories } = require("./models/documentCategories");
const { DocumentType } = require("./models/documentTypes");
const { DocumentTypeAttribute } = require("./models/documentTypeAttributes");
const { DocumentTypeRule } = require("./models/documentTypeRules");
const { References } = require("./models/references");
const { Address } = require("./models/addresses");
const { Upload } = require("./models/uploads");
const { Document } = require("./models/documents");
const { Queues } = require("./models/queue");
const { Audits } = require("./models/audit");
const { Employer } = require("./models/employer");
const { EmployerContracts } = require("./models/employerContracts");
const { EmployerLocations } = require("./models/employerLocations");
const { EmployerDocTypes } = require("./models/employerDocTypes");
const { EmployerDepartments } = require("./models/employerDepartments");
const { Employees } = require("./models/employees");
const { SystemTable } = require('./models/systemTables');
const { View } = require("./models/view");
const { EmployerDocTypeRules } = require("./models/employerDocTypeRules");
const { Jobs } = require("./models/jobs");
const { ActivityLog } = require("./models/activityLog");
const { ComplianceReport } = require("./models/complianceReports");
//========================================Routes=========================
const permissionRoutes = require('./routes/permission');
const industryRoutes = require('./routes/industry');
const professionRoutes = require('./routes/profession');
const specialtyRoutes = require('./routes/specialty');
const profession2specialtyRoutes = require('./routes/profession2specialty');
const userRoutes = require('./routes/user');
const profileTypeRoutes = require('./routes/profileType');
const workHistoryRoutes = require('./routes/workHistory');
const licenseRoutes = require('./routes/license');
const certificationRoutes = require('./routes/certification');
const educationRoutes = require("./routes/education");
const roleRoutes = require("./routes/role");
const documentCategoryRoutes = require("./routes/documentCategories");
const deviceRoutes = require("./routes/devices");
const documentTypeRoutes = require("./routes/documentTypes");
const documentTypeAttributeRoutes = require("./routes/documentTypeAttributes");
const documentTypeRuleRoutes = require("./routes/documentTypeRules");
const uploadRoutes = require('./routes/uploads');
const employerRoutes = require("./routes/employer");
const employerContractsRoutes = require("./routes/employerContracts");
const employerLocationsRoutes = require("./routes/employerLocations");
const employerDocTypesRoutes = require("./routes/employerDocTypes");
const employerDepartmentsRoutes = require("./routes/employerDepartments");
const employerEmployeesRoutes = require("./routes/employees.js");
const systemTableRoutes = require('./routes/systemTables.js');
const referencesRoutes = require("./routes/references");
const viewRoutes = require("./routes/view");
const employerDocTypeRulesRoutes = require("./routes/employerDocTypeRules");
const queueRoutes = require("./routes/queue");
const auditRoutes = require("./routes/audit");
const jobsRoutes = require("./routes/jobs");
const complianceReportRoutes = require("./routes/complianceReports");
const uploads = require('./models/uploads');
const employer = require('./models/employer');
const activityLogs = require('./routes/activityLog');
const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
//======================================================================

//======================================================================
// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};
// jwtOptions.jwtFromRequest = cookieExtractor;

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';
// lets create our strategy for web token
// let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {

//   User.findOne({ where: { id: jwt_payload.id, isActive: true }, include: [{ model: UserType }] })
//     .then(user => {
//       if (user) {
//         jwtOptions.user = user;
//         next(null, user);
//       } else {
//         next(null, false);
//       }
//     })
//     .catch(err => console.log(err));
// });
// // use the strategy
// passport.use(strategy);

app.use(passport.initialize());

// app.set('view engine', 'ejs');
// app.set('views', 'views');
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("here-======");
        fs.mkdirSync('files');
        cb(null, 'files');
    },
    filename: (req, file, cb) => {
        console.log('file is here you see that========================================', file);
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


app.use(bodyparser.json({ limit: '150mb' }));
app.use(multer({ storage: fileStorage }).single('file'));
app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', express.static(path.join(__dirname, 'files')));


app.use((req, res, next) => {
    req.jwtOptions = jwtOptions;
    next();
});


//  ====================== Routes ======================
app.use(permissionRoutes);
app.use(industryRoutes);
app.use(professionRoutes);
app.use(specialtyRoutes);
app.use(profession2specialtyRoutes);
app.use(userRoutes);
app.use(profileTypeRoutes);
app.use(workHistoryRoutes);
app.use(licenseRoutes);
app.use(certificationRoutes);
app.use(educationRoutes);
app.use(roleRoutes);
app.use(documentCategoryRoutes);
app.use(deviceRoutes);
app.use(documentTypeRoutes);
app.use(documentTypeAttributeRoutes);
app.use(documentTypeRuleRoutes);
app.use(employerRoutes);
app.use(uploadRoutes);
app.use(employerContractsRoutes);
app.use(employerLocationsRoutes);
app.use(employerDocTypesRoutes);
app.use(employerDepartmentsRoutes);
app.use(employerEmployeesRoutes);
app.use(systemTableRoutes);
app.use(referencesRoutes);
app.use(viewRoutes);
app.use(employerDocTypeRulesRoutes);
app.use(queueRoutes);
app.use(auditRoutes);
app.use(jobsRoutes);
app.use(complianceReportRoutes);
app.use(activityLogs);
//If Page not found
app.use((req, res, next) => {
    res.status(404).json('404 api not found');
});


// Relationships
Industry.hasMany(Profession);
Profession.belongsTo(Industry);

Industry.hasMany(Specialty);
Specialty.belongsTo(Industry);

Industry.hasMany(DocumentCategories);
DocumentCategories.belongsTo(Industry);

Profession.hasMany(Profession2specialty);
Specialty.hasMany(Profession2specialty);
Profession2specialty.belongsTo(Profession);
Profession2specialty.belongsTo(Specialty);

User.hasMany(Device);
Device.belongsTo(User);

User.hasMany(View);
View.belongsTo(User);

ProfileType.hasMany(UserProfile);
User.hasMany(UserProfile);

UserProfile.belongsTo(ProfileType);
UserProfile.belongsTo(User);

ProfileType.hasMany(Role);
Role.belongsTo(ProfileType), { foreignKey: 'profileTypeId' };

Role.hasMany(RolePermission);
RolePermission.belongsTo(Role, { foreignKey: 'roleId' });

Permission.hasMany(RolePermission);
RolePermission.belongsTo(Permission, { foreignKey: 'permissionId' });

Role.hasMany(UserProfileRoles);
UserProfileRoles.belongsTo(Role, { foreignKey: 'roleId' });

UserProfile.hasMany(UserProfileRoles);
UserProfileRoles.belongsTo(UserProfile, { foreignKey: 'userProfileId' });

User.hasMany(WorkHistory);
WorkHistory.belongsTo(User);

Profession.hasMany(WorkHistory);
WorkHistory.belongsTo(Profession);

Specialty.hasMany(WorkHistory);
WorkHistory.belongsTo(Specialty);

Employer.hasMany(WorkHistory);
WorkHistory.belongsTo(Employer);

User.hasMany(License);
License.belongsTo(User);

User.hasMany(Certification);
Certification.belongsTo(User);

User.hasMany(Education);
Education.belongsTo(User);

DocumentCategories.hasMany(DocumentType);
DocumentType.belongsTo(DocumentCategories);

DocumentType.hasMany(DocumentTypeAttribute);
DocumentTypeAttribute.belongsTo(DocumentType);

DocumentType.hasMany(EmployerDocTypes);
EmployerDocTypes.belongsTo(DocumentType);

DocumentType.hasMany(DocumentTypeRule);
DocumentTypeRule.belongsTo(DocumentType);

Profession.hasMany(DocumentTypeRule);
DocumentTypeRule.belongsTo(Profession);

Specialty.hasMany(DocumentTypeRule);
DocumentTypeRule.belongsTo(Specialty);

User.hasMany(References);
References.belongsTo(User);

User.hasMany(Upload);
Upload.belongsTo(User);

Queues.hasMany(Upload);
Upload.belongsTo(Queues);

Upload.hasMany(Document);
Document.belongsTo(Upload);

Employer.hasMany(Queues);
Queues.belongsTo(Employer);

Employer.hasMany(Audits);
Audits.belongsTo(Employer);

DocumentType.hasMany(Document);
Document.belongsTo(DocumentType);

Employer.hasMany(EmployerContracts);
EmployerContracts.belongsTo(Employer);

Employer.hasMany(EmployerDocTypes);
EmployerDocTypes.belongsTo(Employer);

Employer.hasMany(EmployerLocations);
EmployerLocations.belongsTo(Employer);

Employer.hasMany(EmployerDepartments);
EmployerDepartments.belongsTo(Employer);

Employer.hasMany(Employees);
Employees.belongsTo(Employer);

EmployerDocTypes.hasMany(EmployerDocTypeRules);
EmployerDocTypeRules.belongsTo(EmployerDocTypes);

User.hasMany(References);
References.belongsTo(User);

Employer.hasMany(Jobs);
Jobs.belongsTo(Employer);

Employer.hasMany(ComplianceReport);
ComplianceReport.belongsTo(Employer);

Profession.hasMany(ComplianceReport);
ComplianceReport.belongsTo(Profession);

Specialty.hasMany(ComplianceReport);
ComplianceReport.belongsTo(Specialty);

User.hasMany(ComplianceReport);
ComplianceReport.belongsTo(User);
// Role.belongsTo(User);
// User.hasMany(Role);
// User.belongsToMany(Role, { through: UserRole });
// Role.belongsToMany(User, { through: UserRole });


// User.hasMany(Catagory, { foreignKey: 'createdBy', foreignKeyConstraint: true });
// User.hasMany(Catagory, { foreignKey: 'modifiedBy', foreignKeyConstraint: true });
//Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// Country.hasMany(User);
// User.belongsTo(Country);
// Country.hasMany(Catagory);
// Catagory.belongsTo(Country);
//==============rank relation
// User.hasMany(LoginRecord);
// LoginRecord.belongsTo(User);


//==========issue
// UserType.hasMany(User);
// User.belongsTo(UserType, { constraints: true, onDelete: 'CASCADE' });

// Catagory.hasMany(Issue);
// Issue.belongsTo(Catagory, { constraints: true, onDelete: 'CASCADE' })





sequelize
//.sync({ force: true })
    .sync()
    .then(result => {

        console.log('Connection has been established successfully port 3200.');
        const server = app.listen(process.env.PORT || 3200);

        const io = require('./socket').init(server);
        io.on('connected', socket => {
            console.log('User Connected');
            socket.on('disconnected', () => console.log('User Disconnected'));
        });

    })
    .catch(err => console.log(err));