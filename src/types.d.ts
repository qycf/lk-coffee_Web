interface userInfo {
  id: number;
  username: string;
  tel: string;
  avatar:string;
  detail:string;
  roleName: string;
  roleCode: string;
  create_time: string;
}

interface goodsLike{
  goods_id: number;
  user_id: number;
}


interface goods {
  id: number;
  name: string;
  price: number;
  cup: string;
  temperature: string;
  originPrice: string;
  sugar: string;
}

interface goodsList {
  id: number;
  title: string;
  detail: string;
  price: number;
  originPrice: string;
  thumb: string;
}


// 键名	说明	类型
// id	每条地址的唯一标识	number | string
// name	姓名	string
// tel	手机号	number | string
// address	详细地址	string
// isDefault	是否为默认地址	boolean

interface address {
  id: number;
  name: string;
  tel: number | string;
  address: string;
  isDefault: boolean;
}


// name	姓名	string
// tel	手机号	string
// province	省份	string
// city	城市	string
// county	区县	string
// addressDetail	详细地址	string
// areaCode	地区编码，通过 省市区选择 获取（必填）	string
// isDefault	是否为默认地址	boolean

interface addressInfo{
  name:string;
  province:string;
  city:string;
  county:string;
  addressDetail:string;
  areaCode:string
  isDefault:boolean
}