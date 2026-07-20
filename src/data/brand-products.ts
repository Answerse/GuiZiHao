export interface BrandProduct {
  id: number
  name: string
  company: string
  fullName: string
  description: string
  logo: string
  category: string
  region: string
  mainProduct: string
  updateDate: string
  contact?: string
  detailImages?: string[]
  salesLink?: string
}

export const brandProducts: BrandProduct[] = [
  {
    id: 21,
    name: '陈皮通',
    company: '广西浦北陈皮通有限公司',
    fullName: '广西浦北陈皮通有限公司"陈皮通"陈皮',
    description: '陈皮通专注于广西浦北优质陈皮的生产与销售，产品选用十年以上陈化的正宗陈皮，具有独特的香气和药用价值。浦北陈皮历史悠久，品质优良，是广西特色农产品中的珍品。',
    logo: '/images/brand-product/logo-21.webp',
    category: '桂字号好果',
    region: '钦州市',
    mainProduct: '陈皮',
    updateDate: '2024-12-08',
    salesLink: '/chenpitong'
  },
  {
    id: 1,
    name: '"故乡"有机茶',
    company: '广西昭平县故乡茶业有限公司',
    fullName: '广西昭平县故乡茶业有限公司"故乡"有机茶',
    description: '广西昭平县故乡茶业有限公司是广西将军峰茶业集团有限公司全资子公司，"故乡"有机茶创立以来，产品有有机红茶、有机绿茶，产品采用种植、生产、加工一体化，严格按照国家有机产品标准GB/T19630组织生产，经专业认证机构严格审查，产品品质优。较好的实现茶产业与旅游业的产业融合。',
    logo: '/images/brand-product/logo-1.webp',
    category: '桂字号好茶',
    region: '贺州市',
    mainProduct: '有机红茶、有机绿茶',
    updateDate: '2024-12-08',
    contact: '安** 17877507583',
    detailImages: [
      'https://aka.doubaocdn.com/s/yU0w1wnBAB',
      'https://aka.doubaocdn.com/s/jK7y1wnBAB',
      'https://aka.doubaocdn.com/s/nyau1wnBAB',
      'https://aka.doubaocdn.com/s/motE1wnBAB'
    ],
    salesLink: 'https://nynct.gxzf.gov.cn/gxfb/products/details?id=ef30a5f5-b72e-4eb7-8b37-51c2cd13d033'
  },
  {
    id: 2,
    name: '"天成"有机茶',
    company: '广西昭平县天成生态农业有限公司',
    fullName: '广西昭平县天成生态农业有限公司"天成"有机茶',
    description: '广西昭平县天成生态农业有限公司成立于2011年10月，注册资金500万，公司类型为有限责任公司（自然人投资或控股），是一家集茶叶种植、加工、销售、研发及生态农业观光为一体的综合性现代农业企业。公司坚持以"绿色、生态、健康、可持续发展"为经营理念，致力于有机茶种植与加工，已获得有机产品认证。',
    logo: '/images/brand-product/logo-2.webp',
    category: '桂字号好茶',
    region: '贺州市',
    mainProduct: '有机茶叶',
    updateDate: '2024-12-08'
  },
  {
    id: 3,
    name: '"开山"白毛茶',
    company: '贺州市八步区开山镇东南开山白毛茶叶专业合作社',
    fullName: '贺州市八步区开山镇东南开山白毛茶叶专业合作社 "开山"白毛茶',
    description: '开山白毛茶汤青叶绿、回味甘甜，全国唯一的苹果香型茶，乾隆皇帝品尝此茶，并赞之为"一品开山茶，天下无佳茗"。开山白毛茶历史悠久，品质独特，以其独特的苹果香型在众多茶叶中独树一帜，深受消费者喜爱。',
    logo: '/images/brand-product/logo-3.webp',
    category: '桂字号好茶',
    region: '贺州市',
    mainProduct: '白毛茶',
    updateDate: '2024-12-08'
  },
  {
    id: 4,
    name: '"潇贺古道"古树六堡茶',
    company: '贺州市潇贺古道特色产业发展有限公司',
    fullName: '贺州市潇贺古道特色产业发展有限公司"潇贺古道"古树六堡茶',
    description: '潇贺古道公司传统工艺六堡茶，原料采用贺州本地优质古树鲜茶叶，系原潇贺古道公司古树茶的升级版产品。通过传统工艺与现代技术相结合，精心制作而成，具有六堡茶独特的红、浓、陈、醇品质特征，是广西黑茶的代表之一。',
    logo: '/images/brand-product/logo-4.webp',
    category: '桂字号好茶',
    region: '贺州市',
    mainProduct: '古树六堡茶',
    updateDate: '2024-12-08'
  },
  {
    id: 5,
    name: '"潇贺古道"贺州紫茶',
    company: '贺州市潇贺古道特色产业发展有限公司',
    fullName: '贺州市潇贺古道特色产业发展有限公司"潇贺古道"贺州紫茶',
    description: '茶圣陆羽说："茶，紫者上"，紫茶自古就是茶中佳品。潇贺古道公司选育的茶树新品系单株——"桂紫系列"是广西特有的珍稀茶树品种，紫茶富含花青素，茶汤呈淡紫色，口感醇和，具有独特的保健价值，是贺州特色茶产业的亮丽名片。',
    logo: '/images/brand-product/logo-5.webp',
    category: '桂字号好茶',
    region: '贺州市',
    mainProduct: '贺州紫茶',
    updateDate: '2024-12-08'
  },
  {
    id: 6,
    name: '"昊辰小农伯"大米',
    company: '贺州市昊辰农业发展有限公司',
    fullName: '贺州市昊辰农业发展有限公司"昊辰小农伯"大米',
    description: '广西昊辰农业发展股份有限公司成立之后创立了小农伯品牌大米，曾在北京、台湾、广州、南宁、桂林等多地参展并获得好评。小农伯大米选用优质稻种，采用生态种植方式，米粒晶莹剔透，口感软糯香甜，是贺州优质农产品代表之一。',
    logo: '/images/brand-product/logo-6.webp',
    category: '桂字号粮油',
    region: '贺州市',
    mainProduct: '大米',
    updateDate: '2024-12-08'
  },
  {
    id: 7,
    name: '"富江"脐橙',
    company: '广西农垦国有立新农场',
    fullName: '广西农垦国有立新农场"富江"脐橙',
    description: '"富江"牌脐橙生产于被国家和自治区划为柑橘优势区域的广西富川瑶乡，气候温和、阳光充足，年均气温为19℃，自然环境优越，种植流程绿色生态。"富江"牌脐橙单果重约250g，果形饱满，整齐度高，呈鹅蛋形，果皮颜色鲜艳，薄而光滑，较普通脐橙易剥离，肉质脆嫩，汁多化渣，香甜可口，风味独特，可溶性固形物高达12%～15%，维生素C含量丰富。',
    logo: '/images/brand-product/logo-7.webp',
    category: '桂字号好果',
    region: '贺州市',
    mainProduct: '脐橙',
    updateDate: '2024-12-08'
  },
  {
    id: 8,
    name: '"将军峰"有机红茶、绿茶、白茶',
    company: '广西将军峰茶业集团有限公司',
    fullName: '广西将军峰茶业集团有限公司"将军峰"有机红茶、绿茶、白茶',
    description: '将军峰有机红茶以有机茶种植基地的茶树鲜叶嫩芽为原料，采用现代与传统相结合的加工工艺制作而成。产品紧结匀整、色泽乌润、香气浓郁持久、汤色红艳明亮、滋味醇厚甘爽。将军峰有机绿茶、白茶同样采用有机种植标准，品质优良，是贺州茶产业的标杆产品。',
    logo: '/images/brand-product/logo-8.webp',
    category: '桂字号好茶',
    region: '贺州市',
    mainProduct: '有机红茶、绿茶、白茶',
    updateDate: '2024-12-08'
  },
  {
    id: 9,
    name: '"平桂土瑶老茶"茶叶',
    company: '贺州市天洲茶业有限公司',
    fullName: '贺州市天洲茶业有限公司"平桂土瑶老茶"茶叶',
    description: '贺州市天洲茶业有限公司成立于2016年10月，是一家专门从事茶园建设及黑茶深加工技术研发为一体的企业。"平桂土瑶老茶"采用传统土瑶制茶工艺，选用优质大叶种茶树鲜叶为原料，经独特发酵工艺精制而成，茶汤红浓明亮，滋味醇厚回甘。',
    logo: '/images/brand-product/logo-9.webp',
    category: '桂字号好茶',
    region: '贺州市',
    mainProduct: '黑茶（老茶）',
    updateDate: '2024-12-08'
  },
  {
    id: 10,
    name: '"菊峰媛"富硒米',
    company: '贺州市平桂区菊峰媛家庭农场',
    fullName: '贺州市平桂区菊峰媛家庭农场"菊峰媛"富硒米',
    description: '贺州市平桂区菊峰媛家庭农场开始于2015年，由胡菊花组织其家庭成员6人发起，注册资金100万元，基地坐落于平桂区沙田镇。农场以"生态、绿色、健康"为理念，种植的富硒米富含天然硒元素，米粒饱满均匀，煮饭后香气浓郁、口感软糯，是健康养生的优质主食选择。',
    logo: '/images/brand-product/logo-10.webp',
    category: '桂字号粮油',
    region: '贺州市',
    mainProduct: '富硒米',
    updateDate: '2024-12-08'
  },
  {
    id: 11,
    name: '"野里乡"辣椒',
    company: '贺州市春霖农业发展有限公司',
    fullName: '贺州市春霖农业发展有限公司"野里乡"辣椒',
    description: '贺州市春霖农业发展有限公司2018年9月17日成立，注册资本人民币1000万元，以平桂区便利的交通条件和丰富的土地资源为依托，大力发展辣椒种植产业。"野里乡"辣椒色泽鲜艳、肉厚味辣、品质优良，深受市场欢迎，产品远销粤港澳大湾区。',
    logo: '/images/brand-product/logo-11.webp',
    category: '桂字号好菜',
    region: '贺州市',
    mainProduct: '辣椒',
    updateDate: '2024-12-08'
  },
  {
    id: 12,
    name: '"好食令"有机黑木耳',
    company: '贺州市恒昌农副产品有限公司',
    fullName: '贺州市恒昌农副产品有限公司"好食令"有机黑木耳',
    description: '公司以仿生态的生产方式，打造符合贺州市"世界长寿市"称号的健康食用菌产业，其中黑木耳、香菇等食用菌已获得有机产品认证。"好食令"有机黑木耳耳片厚实、色泽黑亮、质地脆嫩、口感爽滑，富含蛋白质、铁、钙等营养物质，是健康饮食的理想选择。',
    logo: '/images/brand-product/logo-12.webp',
    category: '桂字号好菌',
    region: '贺州市',
    mainProduct: '有机黑木耳',
    updateDate: '2024-12-08'
  },
  {
    id: 13,
    name: '"家盛"富川脐橙',
    company: '富川瑶族自治县家盛果业有限责任公司',
    fullName: '富川瑶族自治县家盛果业有限责任公司"家盛"富川脐橙',
    description: '富川瑶族自治县家盛果业有限责任公司成立于2009年7月份，注册资本500万元，固定资产投资5000万元。"家盛"富川脐橙果实饱满、色泽橙红、皮薄肉厚、汁多味甜，富含维生素C，是富川瑶乡的特色优质水果，深受广大消费者青睐。',
    logo: '/images/brand-product/logo-13.webp',
    category: '桂字号好果',
    region: '贺州市',
    mainProduct: '脐橙',
    updateDate: '2024-12-08'
  },
  {
    id: 14,
    name: '"象棋山"茶叶',
    company: '昭平县象棋山茶叶有限公司',
    fullName: '昭平县象棋山茶叶有限公司"象棋山"茶叶',
    description: '昭平县象棋山茶叶有限公司注册资本1000万元，集茶叶种植、生产加工、品牌营销、茶文化传播、非遗制茶技艺传承于一体。"象棋山"茶叶选用昭平县优质茶树鲜叶为原料，采用传统制茶工艺与现代技术相结合，产品品质优良，茶香浓郁，回味悠长。',
    logo: '/images/brand-product/logo-14.webp',
    category: '桂字号好茶',
    region: '贺州市',
    mainProduct: '茶叶',
    updateDate: '2024-12-08'
  },
  {
    id: 15,
    name: '"鹊鸣春"茶叶',
    company: '广西昭平县鹊鸣春茶业有限公司',
    fullName: '广西昭平县鹊鸣春茶业有限公司"鹊鸣春"茶叶',
    description: '广西昭平县鹊鸣春茶业有限公司自有茶园1200多亩，90%以上为优质小叶种茶，有机茶全部出于自有基地，从源头确保产品品质。"鹊鸣春"茶叶外形紧结匀整，色泽翠润，香气清高持久，汤色嫩绿明亮，滋味鲜爽回甘，是昭平县有机茶的代表品牌之一。',
    logo: '/images/brand-product/logo-15.webp',
    category: '桂字号好茶',
    region: '贺州市',
    mainProduct: '有机茶叶',
    updateDate: '2024-12-08'
  },
  {
    id: 16,
    name: '"非常桂"蔬菜',
    company: '贺州市平桂区华瑞农业科技有限公司',
    fullName: '贺州市平桂区华瑞农业科技有限公司"非常桂"蔬菜',
    description: '华瑞农业位于现代设施农业产业园内，坚持"走出去"发展战略，主动对接粤港澳大湾区市场，分别与深圳、珠海等大湾区城市建立长期稳定的供销合作关系。"非常桂"蔬菜品种丰富、品质优良，采用标准化种植管理，确保蔬菜绿色安全、新鲜可口。',
    logo: '/images/brand-product/logo-16.webp',
    category: '桂字号好菜',
    region: '贺州市',
    mainProduct: '蔬菜',
    updateDate: '2024-12-08'
  },
  {
    id: 17,
    name: '"瑶川果魅"火龙果',
    company: '广西富川荣荣农业开发有限公司',
    fullName: '广西富川荣荣农业开发有限公司"瑶川果魅"火龙果',
    description: '广西富川荣荣农业开发有限公司成立于2018年，位于富川瑶族自治县城北镇六合村委毛家村虎脑岗。"瑶川果魅"火龙果果实饱满、色泽鲜艳、肉质细嫩、汁多味甜，富含花青素和维生素C，是富川瑶乡特色水果产业的代表产品之一。',
    logo: '/images/brand-product/logo-17.webp',
    category: '桂字号好果',
    region: '贺州市',
    mainProduct: '火龙果',
    updateDate: '2024-12-08'
  },
  {
    id: 18,
    name: '"芋博士"牌速冻蔬菜',
    company: '贺州市顺来农业发展有限公司',
    fullName: '贺州市顺来农业发展有限公司"芋博士"牌速冻蔬菜',
    description: '贺州市顺来农业发展有限公司成立于2018年，位于八步区莲塘镇，从事农产品种植、生产、加工、研发和销售。"芋博士"牌速冻蔬菜以贺州优质香芋、马蹄等为原料，采用先进速冻工艺锁住新鲜，产品保持了原材料的营养和口感，远销国内外市场。',
    logo: '/images/brand-product/logo-18.webp',
    category: '桂字号好菜',
    region: '贺州市',
    mainProduct: '速冻蔬菜',
    updateDate: '2024-12-08'
  },
  {
    id: 19,
    name: '"味美"芳林马蹄',
    company: '广西盛鲜食品有限公司',
    fullName: '广西盛鲜食品有限公司"味美"芳林马蹄',
    description: '广西盛鲜食品有限公司位于贺州市平桂区旺高工业区乐业路8号，是一家专门从事芳林马蹄、贺州香芋等农副产品精深加工的现代化食品企业。"味美"芳林马蹄选用优质芳林马蹄为原料，产品皮薄肉嫩、清甜多汁、爽脆化渣，是贺州特色农产品中的优质品牌。',
    logo: '/images/brand-product/logo-19.webp',
    category: '桂字号好菜',
    region: '贺州市',
    mainProduct: '芳林马蹄',
    updateDate: '2024-12-08'
  },
]