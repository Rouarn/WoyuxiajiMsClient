import MyAxios from "@/http/MyAxios";
import BASEURL from "@/http/BaseURL";

const BMDURL = BASEURL.BMDURL;

const WorkApi = {
  /**
   * 查询所有作品
   * @returns Promise<Response>
   */
  queryAllWork() {
    let url =
      BMDURL + "/api/system/DataInterface/595336491303961221/Actions/Response";
    return MyAxios.get(url);
  },
};

export default WorkApi;
