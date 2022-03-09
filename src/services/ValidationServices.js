import * as Yup from 'yup';

// const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*./-]).{8,}$/;
// // eslint-disable-next-line no-useless-escape
// const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // has been disabled because we need escape characters
// const MOBILE_REG = /^[0-9]{10}$/; // Change this regex based on requirement
// const NAME_REG = /^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/;
// const WEBSITE_REG =
//   /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
// const HASHTAG = /^[a-z0-9\-&#\s]+$/i;

const schema = {
  login: Yup.object({
    email: Yup.string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required')
  }),

  warehouseForm: Yup.object({
    warehousename: Yup.string('Enter warehouse name').required('warehouse name is required'),
    address: Yup.string('Enter address').required('address is required'),
    preferredInventories: Yup.array('Enter inventory Type')
      .of(Yup.string())
      .required('inventory Type is required'),
    specs: Yup.string('Enter other attributes'),
    image: Yup.array()
  }),

  addNewItem: Yup.object({
    commonName: Yup.string('Enter details').required(),
    formalName: Yup.string('Enter details').required(),
    description: Yup.string('Enter details'),
    manufacturer: Yup.string('Enter details'),
    size: Yup.string('Enter details'),
    color: Yup.string('Enter details'),
    type: Yup.string('Enter details'),
    unitOfMaterial: Yup.string('Enter details'),
    unitCost: Yup.number().test((val) => val >= 0),
    packageCount: Yup.number().test((val) => val >= 0),
    countPerPallet: Yup.number().test((val) => val >= 0),
    countPerPalletPackage: Yup.number().test((val) => val >= 0),
    primaryWidgetFamilyId: Yup.string('Enter details'),
    secondaryWidgetFamilyId: Yup.string('Enter details'),
    policiesMetadata: Yup.object({
      underStockLevelCount: Yup.number().test((val) => val >= 0),
      overStockLevelCount: Yup.number().test((val) => val >= 0),
      alertStockLevelCount: Yup.number().test((val) => val >= 0),
      reorderStockLevelCount: Yup.number().test((val) => val >= 0)
    }),
    images: Yup.array()
  }),

  addInventory: Yup.object({
    name: Yup.string('Enter Inventory Name').required('Inventory Name is required'),
    widgetName: Yup.string('Enter Widget name').required('Widget Name is required'),
    policies: Yup.object({
      orderTracking: Yup.boolean(),
      alerting: Yup.boolean(),
      replenishment: Yup.boolean(),
      preferredLocations: Yup.boolean(),
      inventory_process: Yup.string()
    }),
    icons: Yup.string()
  }),

  createUser: Yup.object({
    fullName: Yup.string('Enter Full Name').required('User Name is required'),
    email: Yup.string('Enter Email').required('Email is required'),
    password: Yup.string('Enter Password').required('Password is required'),
    phoneNumber: Yup.string('Enter Phone Numbe').required('Phone Number is required'),
    roles: Yup.string('Please select at least one role').required('At least one role is required')
  })
};

export default schema;
