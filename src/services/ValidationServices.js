import * as Yup from 'yup';
import { Strings } from '../constants';

const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*./-]).{8,}$/;
// eslint-disable-next-line no-useless-escape
const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // has been disabled because we need escape characters
const MOBILE_REG = /^[0-9]{10}$/; // Change this regex based on requirement
const NAME_REG = /^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/;
const WEBSITE_REG =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
const HASHTAG = /^[a-z0-9\-&#\s]+$/i;

const schema = {
  login: Yup.object({
    email: Yup.string().email(Strings.invalidEmail).required(Strings.emptyEmail),
    password: Yup.string().required(Strings.emptyPassword)
  }),
  register: Yup.object({
    firstname: Yup.string()
      .min(2, Strings.validName)
      .max(75, Strings.inValidName)
      .matches(NAME_REG, Strings.valid)
      .required(Strings.emptyFirstName),
    lastname: Yup.string()
      .max(75, Strings.inValidName)
      .min(2, Strings.validName)
      .matches(NAME_REG, Strings.valid)
      .required(Strings.emptyLastName),
    email: Yup.string().email(Strings.invalidEmail).required(Strings.emptyEmail),
    mobile_no: Yup.string().min(14, Strings.invalidMobileNumber).required(Strings.emptyMobile_no),
    password: Yup.string()
      .matches(PASSWORD_REGEX, Strings.invalidPassword)
      .required(Strings.emptyPassword)
  }),
  forgotPassword: Yup.object({
    emailOrPhone: Yup.string(Strings.errorEmailPhone)
      .required(Strings.errorEmailPhone)
      .test('test-name', 'Enter Valid Phone/Email', (value) => {
        const isValidEmail = emailRegex.test(value);
        const isValidPhone = MOBILE_REG.test(value);
        if (!isValidEmail && !isValidPhone) {
          return false;
        }
        return true;
      })
  }),
  resetPassword: Yup.object({
    newPassword: Yup.string()
      .matches(PASSWORD_REGEX, Strings.invalidPassword)
      .required(Strings.emptyPassword),
    confirmPassword: Yup.string()
      .matches(PASSWORD_REGEX, Strings.invalidPassword)
      .required(Strings.emptyPassword)
  }),
  addCompany: Yup.object({
    companyName: Yup.string()
      .trim(Strings.extraSpace)
      .strict()
      .min(2, Strings.validName)
      .max(150, Strings.max150)
      .required(Strings.emptyCompanyName),
    companyType: Yup.number().strict().required(Strings.emptyCompanyType),
    companyWebsite: Yup.string()
      .required(Strings.emptywebsite)
      .matches(WEBSITE_REG, Strings.validCompanyWebSite)
      .max(150, Strings.max150)
  }),
  editProfile: Yup.object({
    firstname: Yup.string()
      .min(2, Strings.validName)
      .max(75, Strings.inValidName)
      .matches(NAME_REG, Strings.valid)
      .required(Strings.emptyFirstName),
    lastname: Yup.string()
      .min(2, Strings.validName)
      .max(75, Strings.inValidName)
      .matches(NAME_REG, Strings.valid)
      .required(Strings.emptyLastName),
    email: Yup.string().email(Strings.invalidEmail).required(Strings.emptyEmail),
    mobile_no: Yup.string()
      .min(10, Strings.invalidMobileNumber)
      .max(14, Strings.invalidMobileNumber)
      .required(Strings.emptyMobile_no),
    company_name: Yup.string()
      .trim(Strings.extraSpace)
      .strict()
      .min(2, Strings.validName)
      .max(150, Strings.max150)
      .required(Strings.emptyCompanyName),
    company_website: Yup.string()
      .required(Strings.emptywebsite)
      .max(150, Strings.max150)
      .matches(WEBSITE_REG, Strings.validCompanyWebSite),
    tagline: Yup.string().trim(Strings.extraSpace).strict().nullable().max(75, Strings.max75),
    interest: Yup.string().trim(Strings.extraSpace).strict().max(150, Strings.max150)
  }),
  directditProfile: Yup.object({
    firstname: Yup.string()
      .min(2, Strings.validName)
      .max(75, Strings.inValidName)
      .matches(NAME_REG, Strings.valid)
      .required(Strings.emptyFirstName),
    lastname: Yup.string()
      .min(2, Strings.validName)
      .max(75, Strings.inValidName)
      .matches(NAME_REG, Strings.valid)
      .required(Strings.emptyLastName),
    email: Yup.string().email(Strings.invalidEmail).required(Strings.emptyEmail),
    mobile_no: Yup.string()
      .min(10, Strings.invalidMobileNumber)
      .max(14, Strings.invalidMobileNumber)
      .required(Strings.emptyMobile_no),
    tagline: Yup.string().trim(Strings.extraSpace).strict().nullable().max(75, Strings.max75),
    interest: Yup.string().trim(Strings.extraSpace).strict().max(150, Strings.max150)
  }),
  changePassword: Yup.object({
    currentPassword: Yup.string()
      .matches(PASSWORD_REGEX, Strings.invalidPassword)
      .required(Strings.emptyPassword),
    newPassword: Yup.string()
      .matches(PASSWORD_REGEX, Strings.invalidPassword)
      .required(Strings.emptyPassword),
    confirmPassword: Yup.string()
      .matches(PASSWORD_REGEX, Strings.invalidPassword)
      .required(Strings.emptyPassword)
  }),
  editEducation: Yup.object({
    school: Yup.string()
      .trim(Strings.extraSpace)
      .strict()
      .min(2, Strings.validName)
      .max(250, Strings.maxSchool)
      .required(Strings.emptySchool),
    degree: Yup.string()
      .trim(Strings.extraSpace)
      .strict()
      .min(2, Strings.validName)
      .max(100, Strings.max100)
      .required(Strings.emptyDegree),
    field_of_study: Yup.string()
      .trim(Strings.extraSpace)
      .strict()
      .min(2, Strings.validName)
      .max(100, Strings.max100)
      .required(Strings.emptyField),
    start_year: Yup.string().required(Strings.emptyStartYear),
    end_year: Yup.string().required(Strings.emptyEndYear)
  }),
  editEmploy: Yup.object({
    hospital_name: Yup.string()
      .min(2, Strings.validName)
      .max(100, Strings.max100)
      .matches(NAME_REG, Strings.valid)
      .required(Strings.emptyCompany),
    location: Yup.string().required(Strings.emptyLocation)
  }),
  needHelp: Yup.object({
    subjectTextInput: Yup.string().required(Strings.inValidSubject).max(150, Strings.max150),
    subjectDescriptionTextInput: Yup.string()
      .required(Strings.inValidSubject)
      .max(1000, Strings.max1000)
  }),
  editAbout: Yup.object({
    about: Yup.string()
      .trim(Strings.extraSpace)
      .strict()
      .max(500, Strings.validAbout)
      .required(Strings.inValidSubject)
  }),
  createPost: Yup.object({
    description: Yup.string()
      .max(15000, Strings.validateDescriptionChar)
      .required(Strings.emptyDesc),
    hashtag: Yup.string().matches(HASHTAG, Strings.hashtagErr).max(1000, Strings.hashtagLimitErr),
    link: Yup.string()
      .matches(WEBSITE_REG, Strings.urlError)
      .max(15000, Strings.validateDescriptionChar)
  }),
  createPoll: Yup.object({
    description: Yup.string()
      .max(15000, Strings.validateDescriptionChar)
      .required(Strings.emptyDesc),
    link: Yup.string()
      .matches(WEBSITE_REG, Strings.urlError)
      .max(15000, Strings.validateDescriptionChar),
    question: Yup.string().max(70, Strings.validateQueChar).required(Strings.emptyQue),
    optionOne: Yup.string().max(50, Strings.validateAnsChar).required(Strings.emptyAns1),
    optionTwo: Yup.string().max(50, Strings.validateAnsChar).required(Strings.emptyAns2),
    Option3: Yup.string().max(50, Strings.validateAnsChar),
    Option4: Yup.string().max(50, Strings.validateAnsChar),
    Option5: Yup.string().max(50, Strings.validateAnsChar)
  }),
  shareStatus: Yup.object({
    shareStatus: Yup.string().max(15000, Strings.validateDescriptionChar)
  }),
  createEvent: Yup.object({
    eventName: Yup.string().required(Strings.eventNameError).max(75),
    location: Yup.string().required(Strings.emptyLocation),
    venue: Yup.string().required(Strings.emptyVenue).max(150),
    timezone: Yup.object().required(Strings.emptyTimezone),
    description: Yup.string().required(Strings.emptyDesc).max(1000)
  }),
  onlineEvent: Yup.object({
    eventName: Yup.string().required(Strings.eventNameError).max(75),
    broadcastLink: Yup.string()
      .matches(WEBSITE_REG, Strings.urlError)
      .max(15000, Strings.validateDescriptionChar)
      .required(Strings.emptyLink),
    timezone: Yup.object().required(Strings.emptyTimezone),
    description: Yup.string().required(Strings.emptyDesc).max(1000)
  }),
  orthoEvent: Yup.object({
    eventName: Yup.string().required(Strings.eventNameError).max(75),
    timezone: Yup.object().required(Strings.emptyTimezone),
    description: Yup.string().required(Strings.emptyDesc).max(1000)
  }),
  createLivePost: Yup.object({
    type: Yup.object().required(Strings.liveStreamTypeValidation),
    privacy: Yup.object().required(Strings.liveStreamPrivacyValidation),
    group: Yup.object().when('privacy', (privacy) => {
      if (privacy?.label?.toLowerCase()?.trim() === Strings.group?.toLowerCase()?.trim()) {
        return Yup.object().required(Strings.liveStreamGroupValidation);
      }
    }),
    title: Yup.string().required(Strings.liveStreamTitleValidation).max(100, Strings.max100),
    description: Yup.string().max(15000, Strings.max15000),
    allow_comments: Yup.bool()
  }),
  createGroup: Yup.object({
    groupName: Yup.string().required(Strings.groupNameErr).max(70, Strings.groupNameCharErr),
    description: Yup.string()
      .max(15000, Strings.validateDescriptionChar)
      .required(Strings.groupDescErr),
    groupType: Yup.string().required(Strings.groupTypeErr),
    groupAccess: Yup.string().required(Strings.groupAccessErr),
    speciality_ids: Yup.array().required(Strings.selectSpecialty)
  }),
  addEditEducation: Yup.object({
    selectedTyped: Yup.string().required(Strings.educationSelectSchool).max(250, Strings.maxSchool)
  }),
  addEditEmployer: Yup.object({
    selectedHospital: Yup.string()
      .required(Strings.employerSelectHospital)
      .max(250, Strings.maxSchool)
    /* @COMMENTED for future scope */
    /* selectedLocation: Yup.string()
      .required(Strings.emptyLocation)
      .max(250, Strings.maxSchool) */
  }),
  createPage: Yup.object({
    companyPageName: Yup.string()
      .required(Strings.companyNameErr)
      .max(100, Strings.companyNamelimitErr),
    publicUrl: Yup.string().required(Strings.publicUrlErr).max(50, Strings.publicUrllimitErr),
    website: Yup.string()
      .required(Strings.emptywebsite)
      .matches(WEBSITE_REG, Strings.validCompanyWebSite)
      .max(150, Strings.max150),
    companyType: Yup.string().required(Strings.emptyCompanyType),
    companySize: Yup.string().required(Strings.companySizeErr),
    tagline: Yup.string().max(100, Strings.companyNamelimitErr)
  }),
  inviteUsers: Yup.object({
    emailId: Yup.string().email(Strings.invalidEmail).required(Strings.emptyEmail)
  }),
  checkoutCard: Yup.object({
    name: Yup.string()
      .min(2, Strings.validName)
      .max(75, Strings.inValidName)
      .matches(NAME_REG, Strings.valid)
      .required(Strings.emptyName),
    email: Yup.string().email(Strings.invalidEmail).required(Strings.emptyEmail),
    phone: Yup.string().min(14, Strings.invalidMobileNumber).required(Strings.emptyMobile_no),
    card: Yup.object()
  })
};

export default schema;
