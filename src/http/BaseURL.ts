const URL_ENV = {
  DEV: {
    // 封装开发环境所需要的url前缀
    BMDURL: "http://127.0.0.1:12008",
    UPLOADURL: "http://127.0.0.1:12008",
  },
  PRO: {
    //封装生产环境所需要的url
    BMDURL: "https://oa.woyuxiaji.xyz",
    UPLOADURL: "https://oa.woyuxiaji.xyz",
  },
};

//在此选择导出开发环境或生产环境的URL前缀
// export default URL_ENV.DEV;
export default URL_ENV.PRO;
