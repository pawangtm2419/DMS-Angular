export class User {
  subscribe(arg0: (user: any) => void) {
    throw new Error('Method not implemented.');
  }
  role: { type: String; required: 'Please select role'; } | undefined;
  useType: { type: String; required: "Please Select type"; enum: ["ALL", "MARKET", "ZONE", "STATE", "DEPOT", "DEALER", "CUSTOMER"]; } | undefined;
  userMarket:{ type: String; } | undefined;
  userZone:{ type: String; } | undefined;
  userState:{ type: String; } | undefined;
  code:{ type: String; } | undefined;
  empID: { type: String; required: 'Please enter the Employee ID'; unique: true; } | undefined;
  companyName: { type: String; required: 'Please enter company name'; } | undefined;
  firstName: { type: String; required: 'Please enter first name'; } | undefined;
  lastName: { type: String; } | undefined;
  email: { type: String; lowercase: true; required: 'Please enter the email'; unique: true; } | undefined;
  mobile: { type: String; } | undefined;
  appDetails:{
    pushToken: { type: String; };
    deviceType: { type: String; };
    udid: { type: String; };
  } | undefined;
  id: { type: String; } | undefined;
  password: { type: String; required: 'Please enter the password'; } | undefined;
  address: {
    country: { type: String; default: "IND"; };
    state: { type: String; };
    city: { type: String; };
    location: { type: String; };
    zipcode: { type: String; };
  } | undefined;
  alert :{
    EMAIL: { type: Boolean; default: false; };
    SMS: { type: Boolean; default: false; };
    PUSH: { type: Boolean; default: false; };
  } | undefined;
  services : { type: String; } | undefined;
  isTemporaryPass: { type: Boolean; default: false; } | undefined;
  status: { type: String; } | undefined;
  isDeleted: { type: Boolean; default: false; } | undefined;
  createdBy: { type: String; } | undefined;
  createdDate: { type: Date; } | undefined;
  activationDate: { type: Date; } | undefined;
  deactivateDate: { type: Date; default: null; } | undefined;
  forgetPassword: { type: Boolean; default: false; } | undefined;
  userToken:{ type: String; } | undefined
}
