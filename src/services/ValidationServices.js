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
    inventorytype: Yup.array('Enter inventory Type')
      .of(Yup.string())
      .required('inventory Type is required'),
    attributes: Yup.string('Enter other attributes').required('attributes is required')
  }),

  addNewProduct: Yup.object({
    warehousename: Yup.string('Enter warehouse name').required('warehouse name is required'),
    description: Yup.string('Enter Description').required('description is required'),
    manufacturer: Yup.string('Enter manufacturer').required('manufacturer is required'),
    type: Yup.string('Enter type').required('type is required'),
    unitofmaterial: Yup.string('Enter unitofmaterial').required('Unit of material is required'),
    packagecount: Yup.number('Enter packagecount').required('Package Count is required'),
    formalname: Yup.string('Enter formal name').required('Formal Name is required'),
    size: Yup.string('Enter Size').required('Size is required'),
    color: Yup.string('Enter Color').required('Color is required'),
    unitcost: Yup.number('Enter UnitCost').required('Unit Cost is required'),
    countperpallet: Yup.number('Enter countperpallet').required('Count per pallet is required'),
    countperpalletpackage: Yup.number('Enter countperpalletpackage').required(
      'count per pallet package is required'
    ),
    productfamilyassociation: Yup.string('Enter productfamilyassociation').required(
      'product Family Association is required'
    ),
    under: Yup.number().required('required'),
    over: Yup.number().required('required'),
    alert: Yup.number().required('required')
  }),

  addInventory: Yup.object({
    inventoryname: Yup.string('Enter Inventory name').required('Inventory name is required'),
    inventorytype: Yup.string('Enter inventory Type').required('inventory Type is required'),
    widgetname: Yup.string('Enter Widget Name').required('Widget Name is required')
  })
};

export default schema;
