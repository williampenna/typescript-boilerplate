const configuration = {
  ENVIRONMENT: process.env.STAGE ? process.env.STAGE : 'dev',
  REGION: process.env.REGION ? process.env.REGION : 'us-east-2',
  TENANT: process.env.TENANT ? process.env.TENANT : 'zappts',
};

export default configuration;
