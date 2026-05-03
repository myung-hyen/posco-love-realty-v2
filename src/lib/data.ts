export type PropertyType = "아파트" | "빌라" | "오피스텔" | "상가" | "단독주택";
export type DealType = "매매" | "전세" | "월세";
export type Status = "진행중" | "완료" | "취소" | "대기";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  dealType: DealType;
  price: number;
  deposit?: number;
  monthly?: number;
  area: number;
  floor: string;
  address: string;
  district: string;
  rooms: number;
  bathrooms: number;
  status: "매물등록" | "계약진행" | "계약완료" | "매물취소" | "대기";
  listedAt: string;
  agent: string;
  images: string[];
  description: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: "매도인" | "매수인" | "임대인" | "임차인";
  interest: PropertyType[];
  budget: number;
  status: "상담중" | "계약진행" | "계약완료" | "이탈";
  registeredAt: string;
  agent: string;
  memo: string;
}

export interface Transaction {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyType: PropertyType;
  dealType: DealType;
  price: number;
  commission: number;
  seller: string;
  buyer: string;
  agent: string;
  contractDate: string;
  completionDate: string;
  status: Status;
  district: string;
}

export interface Appointment {
  id: string;
  title: string;
  clientName: string;
  propertyTitle: string;
  type: "매물 상담" | "현장 방문" | "계약 체결" | "서류 접수" | "기타";
  date: string;
  time: string;
  duration: number;
  agent: string;
  status: "예정" | "완료" | "취소";
  memo: string;
}

export const properties: Property[] = [
  {
    id: "P001",
    title: "포스코더샵 102동 1502호",
    type: "아파트",
    dealType: "매매",
    price: 650000000,
    area: 84.9,
    floor: "15층",
    address: "경북 포항시 남구 지곡동 394",
    district: "포항 남구",
    rooms: 3,
    bathrooms: 2,
    status: "매물등록",
    listedAt: "2026-04-15",
    agent: "김철수",
    images: [],
    description: "포스코 더샵 단지 내 남향 84㎡ 아파트. 채광 우수, 리모델링 완료.",
  },
  {
    id: "P002",
    title: "포스코 더샵 센트럴파크 201동 801호",
    type: "아파트",
    dealType: "전세",
    price: 380000000,
    area: 59.4,
    floor: "8층",
    address: "경북 포항시 북구 장성동 510",
    district: "포항 북구",
    rooms: 2,
    bathrooms: 1,
    status: "계약진행",
    listedAt: "2026-04-10",
    agent: "이영희",
    images: [],
    description: "59㎡ 전세 매물. 역세권 입지, 관리 상태 양호.",
  },
  {
    id: "P003",
    title: "지곡동 신축 오피스텔 305호",
    type: "오피스텔",
    dealType: "월세",
    price: 5000000,
    deposit: 10000000,
    monthly: 550000,
    area: 33.0,
    floor: "3층",
    address: "경북 포항시 남구 지곡동 120-5",
    district: "포항 남구",
    rooms: 1,
    bathrooms: 1,
    status: "매물등록",
    listedAt: "2026-04-18",
    agent: "박민준",
    images: [],
    description: "신축 오피스텔 풀옵션. POSCO 연구소 인근.",
  },
  {
    id: "P004",
    title: "효자동 빌라 3층 전체",
    type: "빌라",
    dealType: "매매",
    price: 250000000,
    area: 72.6,
    floor: "3층",
    address: "경북 포항시 북구 효자동 88-12",
    district: "포항 북구",
    rooms: 3,
    bathrooms: 1,
    status: "매물등록",
    listedAt: "2026-04-20",
    agent: "김철수",
    images: [],
    description: "빌라 3층 단독 세대. 넓은 발코니 보유.",
  },
  {
    id: "P005",
    title: "포스코 더샵 스타파크 504동 1205호",
    type: "아파트",
    dealType: "매매",
    price: 720000000,
    area: 114.9,
    floor: "12층",
    address: "경북 포항시 남구 오천읍 세계단지로 123",
    district: "포항 남구",
    rooms: 4,
    bathrooms: 2,
    status: "계약완료",
    listedAt: "2026-03-05",
    agent: "이영희",
    images: [],
    description: "대형 아파트 114㎡ 매매 완료.",
  },
  {
    id: "P006",
    title: "상도동 상가 1층",
    type: "상가",
    dealType: "월세",
    price: 30000000,
    deposit: 30000000,
    monthly: 2500000,
    area: 45.0,
    floor: "1층",
    address: "경북 포항시 북구 상도동 24-3",
    district: "포항 북구",
    rooms: 0,
    bathrooms: 1,
    status: "매물등록",
    listedAt: "2026-04-25",
    agent: "박민준",
    images: [],
    description: "유동인구 많은 상권 내 1층 상가.",
  },
  {
    id: "P007",
    title: "환호동 단독주택",
    type: "단독주택",
    dealType: "매매",
    price: 480000000,
    area: 165.0,
    floor: "2층",
    address: "경북 포항시 북구 환호동 15-7",
    district: "포항 북구",
    rooms: 4,
    bathrooms: 3,
    status: "대기",
    listedAt: "2026-04-28",
    agent: "김철수",
    images: [],
    description: "넓은 마당과 주차 2대 가능한 단독주택.",
  },
  {
    id: "P008",
    title: "포스코더샵 더센트럴 101동 1003호",
    type: "아파트",
    dealType: "전세",
    price: 320000000,
    area: 59.9,
    floor: "10층",
    address: "경북 포항시 남구 지곡동 410",
    district: "포항 남구",
    rooms: 2,
    bathrooms: 1,
    status: "매물등록",
    listedAt: "2026-04-30",
    agent: "이영희",
    images: [],
    description: "포스코더샵 전세 매물. 즉시 입주 가능.",
  },
];

export const clients: Client[] = [
  {
    id: "C001",
    name: "홍길동",
    phone: "010-1234-5678",
    email: "hong@posco.com",
    type: "매수인",
    interest: ["아파트"],
    budget: 700000000,
    status: "계약진행",
    registeredAt: "2026-03-10",
    agent: "김철수",
    memo: "포스코더샵 84㎡ 이상 선호. 남향 필수.",
  },
  {
    id: "C002",
    name: "김미영",
    phone: "010-9876-5432",
    email: "kim@example.com",
    type: "임차인",
    interest: ["오피스텔", "빌라"],
    budget: 300000000,
    status: "상담중",
    registeredAt: "2026-04-01",
    agent: "이영희",
    memo: "포스코 연구소 출퇴근 고려, 단기 거주 예정.",
  },
  {
    id: "C003",
    name: "박지성",
    phone: "010-2345-6789",
    email: "park@posco.com",
    type: "매수인",
    interest: ["아파트", "빌라"],
    budget: 500000000,
    status: "상담중",
    registeredAt: "2026-04-05",
    agent: "박민준",
    memo: "4인 가족. 학군 중요.",
  },
  {
    id: "C004",
    name: "이순신",
    phone: "010-3456-7890",
    email: "lee@example.com",
    type: "매도인",
    interest: ["아파트"],
    budget: 0,
    status: "계약완료",
    registeredAt: "2026-02-15",
    agent: "이영희",
    memo: "포스코더샵 스타파크 매도 완료.",
  },
  {
    id: "C005",
    name: "최수진",
    phone: "010-4567-8901",
    email: "choi@example.com",
    type: "임차인",
    interest: ["아파트"],
    budget: 400000000,
    status: "상담중",
    registeredAt: "2026-04-12",
    agent: "김철수",
    memo: "전세 희망. 포항 남구 선호.",
  },
  {
    id: "C006",
    name: "정대만",
    phone: "010-5678-9012",
    email: "jung@posco.com",
    type: "임대인",
    interest: ["상가"],
    budget: 0,
    status: "계약진행",
    registeredAt: "2026-04-18",
    agent: "박민준",
    memo: "상도동 상가 임대 진행 중.",
  },
  {
    id: "C007",
    name: "강나연",
    phone: "010-6789-0123",
    email: "kang@example.com",
    type: "매수인",
    interest: ["아파트", "오피스텔"],
    budget: 350000000,
    status: "상담중",
    registeredAt: "2026-04-22",
    agent: "이영희",
    memo: "1인 가구. 역세권 선호.",
  },
  {
    id: "C008",
    name: "윤성호",
    phone: "010-7890-1234",
    email: "yoon@posco.com",
    type: "매수인",
    interest: ["단독주택"],
    budget: 600000000,
    status: "이탈",
    registeredAt: "2026-03-20",
    agent: "김철수",
    memo: "타 지역 이사로 계약 포기.",
  },
];

export const transactions: Transaction[] = [
  {
    id: "T001",
    propertyId: "P005",
    propertyTitle: "포스코 더샵 스타파크 504동 1205호",
    propertyType: "아파트",
    dealType: "매매",
    price: 720000000,
    commission: 5040000,
    seller: "이순신",
    buyer: "홍길동",
    agent: "이영희",
    contractDate: "2026-04-01",
    completionDate: "2026-05-01",
    status: "완료",
    district: "포항 남구",
  },
  {
    id: "T002",
    propertyId: "P002",
    propertyTitle: "포스코 더샵 센트럴파크 201동 801호",
    propertyType: "아파트",
    dealType: "전세",
    price: 380000000,
    commission: 1900000,
    seller: "정대만",
    buyer: "김미영",
    agent: "이영희",
    contractDate: "2026-04-15",
    completionDate: "2026-05-15",
    status: "진행중",
    district: "포항 북구",
  },
  {
    id: "T003",
    propertyId: "P006",
    propertyTitle: "상도동 상가 1층",
    propertyType: "상가",
    dealType: "월세",
    price: 2500000,
    commission: 1500000,
    seller: "정대만",
    buyer: "박지성",
    agent: "박민준",
    contractDate: "2026-04-20",
    completionDate: "2026-05-20",
    status: "진행중",
    district: "포항 북구",
  },
  {
    id: "T004",
    propertyId: "P001",
    propertyTitle: "포스코더샵 102동 1502호",
    propertyType: "아파트",
    dealType: "매매",
    price: 650000000,
    commission: 4550000,
    seller: "윤성호",
    buyer: "최수진",
    agent: "김철수",
    contractDate: "2026-03-10",
    completionDate: "2026-04-10",
    status: "완료",
    district: "포항 남구",
  },
  {
    id: "T005",
    propertyId: "P003",
    propertyTitle: "지곡동 신축 오피스텔 305호",
    propertyType: "오피스텔",
    dealType: "월세",
    price: 550000,
    commission: 600000,
    seller: "강나연",
    buyer: "김미영",
    agent: "박민준",
    contractDate: "2026-03-25",
    completionDate: "2026-04-05",
    status: "완료",
    district: "포항 남구",
  },
  {
    id: "T006",
    propertyId: "P007",
    propertyTitle: "환호동 단독주택",
    propertyType: "단독주택",
    dealType: "매매",
    price: 480000000,
    commission: 3360000,
    seller: "홍길동",
    buyer: "정대만",
    agent: "김철수",
    contractDate: "2026-04-28",
    completionDate: "2026-06-01",
    status: "진행중",
    district: "포항 북구",
  },
];

export const appointments: Appointment[] = [
  {
    id: "A001",
    title: "포스코더샵 102동 매물 상담",
    clientName: "최수진",
    propertyTitle: "포스코더샵 102동 1502호",
    type: "매물 상담",
    date: "2026-05-02",
    time: "10:00",
    duration: 60,
    agent: "김철수",
    status: "예정",
    memo: "전세에서 매매 전환 희망",
  },
  {
    id: "A002",
    title: "지곡동 오피스텔 현장 방문",
    clientName: "김미영",
    propertyTitle: "지곡동 신축 오피스텔 305호",
    type: "현장 방문",
    date: "2026-05-02",
    time: "14:00",
    duration: 90,
    agent: "이영희",
    status: "예정",
    memo: "풀옵션 확인 요청",
  },
  {
    id: "A003",
    title: "환호동 단독주택 계약 체결",
    clientName: "정대만",
    propertyTitle: "환호동 단독주택",
    type: "계약 체결",
    date: "2026-05-03",
    time: "11:00",
    duration: 120,
    agent: "김철수",
    status: "예정",
    memo: "등기 서류 지참 요망",
  },
  {
    id: "A004",
    title: "센트럴파크 전세 서류 접수",
    clientName: "김미영",
    propertyTitle: "포스코 더샵 센트럴파크 201동 801호",
    type: "서류 접수",
    date: "2026-05-05",
    time: "15:00",
    duration: 60,
    agent: "이영희",
    status: "예정",
    memo: "전입신고 필요",
  },
  {
    id: "A005",
    title: "박지성 아파트 상담",
    clientName: "박지성",
    propertyTitle: "포스코더샵 더센트럴 101동 1003호",
    type: "매물 상담",
    date: "2026-05-06",
    time: "13:00",
    duration: 90,
    agent: "박민준",
    status: "예정",
    memo: "학군 정보 자료 준비",
  },
  {
    id: "A006",
    title: "강나연 매물 상담",
    clientName: "강나연",
    propertyTitle: "포스코더샵 더센트럴 101동 1003호",
    type: "현장 방문",
    date: "2026-05-07",
    time: "10:00",
    duration: 60,
    agent: "이영희",
    status: "예정",
    memo: "1인 가구용 소형 매물 우선 소개",
  },
];

export const monthlyStats = [
  { month: "11월", 거래건수: 8, 수익: 18500000, 매물: 22 },
  { month: "12월", 거래건수: 11, 수익: 26200000, 매물: 25 },
  { month: "1월",  거래건수: 7,  수익: 14800000, 매물: 20 },
  { month: "2월",  거래건수: 9,  수익: 21300000, 매물: 23 },
  { month: "3월",  거래건수: 13, 수익: 32100000, 매물: 28 },
  { month: "4월",  거래건수: 10, 수익: 24500000, 매물: 30 },
];

export const propertyTypeStats = [
  { name: "아파트",   value: 52, color: "#1a50f0" },
  { name: "오피스텔", value: 18, color: "#4d7aff" },
  { name: "빌라",     value: 14, color: "#85a8ff" },
  { name: "상가",     value: 10, color: "#b9ccff" },
  { name: "단독주택", value: 6,  color: "#dce6ff" },
];

export const dealTypeStats = [
  { name: "매매", value: 45, color: "#0d3ed4" },
  { name: "전세", value: 35, color: "#4d7aff" },
  { name: "월세", value: 20, color: "#b9ccff" },
];

export const agents = [
  { name: "권옥자", properties: 12, transactions: 8, commission: 15200000 },
];
