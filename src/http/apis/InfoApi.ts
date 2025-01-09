import MyAxios from "@/http/MyAxios";
import BASEURL from "@/http/BaseURL";

const BMDURL = BASEURL.BMDURL;

const InfoApi = {
  /**
   * 查询所有日志
   * @returns Promise<Response>
   */
  queryAllInfo() {
    let url =
      BMDURL + "/api/system/DataInterface/595992025053004677/Actions/Response";
    return MyAxios.get(url);
  },
};

export default InfoApi;
