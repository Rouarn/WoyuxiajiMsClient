import WorkApi from "./apis/WorkApi";
import InfoApi from "./apis/InfoApi";

//当前index.js,整合apis文件夹中的所有接口
const httpApi = {
  WorkApi,
  InfoApi,
};

export default httpApi;
