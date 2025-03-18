export type Session = {
  _id: string;
  username: string;
  email: string;
  password: string;
};

export type ButtonModel = {
  id: number;
  type: string;
  category: string;
  label: string;
  command: string;
  deviceId: string;
};

export type DeviceModel = {
  _id: string;
  deviceId: string;
  name: string;
  topic: string;
  type: string;
  userId: string;
  productId: string;
  status: string;
  wifiId: string;
  wifiConnect: string;
};

export type ExternalDeviceModel = {
  _id: string;
  deviceId: string;
  userId: string;
  name: string;
  topic: string;
  broker: string;
  endPiont: string;
  username: string;
  password: string;
  status: string;
  wifiId: string;
  wifiConnect: string;
  connectPath:string;
};

export type WifiModel = {
  _id: string;
  wifiId: string;
  wifiName: string;
  wifiPassword: string;
  status: string;
};

export type CustomizeButtonModel = {
  transmitter: {
    press: {
      label: any[];
    };
    toggle: {
      label: any[];
    };
    joy: {
      label: any[];
    };
  };
  reciever: {
    chart: any[];
  };
};

export type ChartModel = {
  id: any;
  deviceId: string;
  type: string;
  label: string;
  bgcolor: string;
  fgcolor: string;
  unit: string;
};

export type CustomizeChartPumpModel = {
  donut: string;
  circlemonitor: string;
};
// export type CustomizeChartPumpModel = {
//   donut: {
//     value: string;
//   };
//   circlemonitor: {
//     bgcolor: any[];
//     ftcolor: any[];
//     value: any[];
//     unit: any[];
//   };
// };
