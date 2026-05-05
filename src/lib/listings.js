const STORAGE_KEY = "posco_listings";

const defaultListings = [
  {
    id: "1",
    title: "대전 목동 더샵 아파트 25평",
    type: "매매",
    price: "문의",
    location: "대전광역시 중구 목동",
    area: "25평",
    floor: "5층",
    desc: "방 3개, 거실, 화장실 2개 구조의 실거주 추천 매물",
    status: "판매중",
    createdAt: "2026-01-01",
  },
  {
    id: "2",
    title: "포스코 아파트 33평",
    type: "전세",
    price: "문의",
    location: "대전광역시 중구 목동",
    area: "33평",
    floor: "8층",
    desc: "가족 거주에 적합한 인기 평형, 밝은 채광과 넓은 거실",
    status: "판매중",
    createdAt: "2026-01-05",
  },
  {
    id: "3",
    title: "포스코 아파트 44평",
    type: "매매",
    price: "문의",
    location: "대전광역시 중구 목동",
    area: "44평",
    floor: "12층",
    desc: "방 4개 구조의 여유로운 대형 평형, 고급 주거 추천",
    status: "판매중",
    createdAt: "2026-01-10",
  },
];

function loadListings() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultListings;
  } catch {
    return defaultListings;
  }
}

function saveListings(listings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}

export function getListings() {
  return loadListings();
}

export function getListingById(id) {
  return loadListings().find((l) => String(l.id) === String(id)) || null;
}

export function createListing(data) {
  const listings = loadListings();
  const newItem = {
    ...data,
    id: String(Date.now()),
    createdAt: new Date().toISOString().slice(0, 10),
  };
  saveListings([...listings, newItem]);
  return newItem;
}

export function updateListing(id, data) {
  const listings = loadListings().map((l) =>
    String(l.id) === String(id) ? { ...l, ...data } : l
  );
  saveListings(listings);
}

export function deleteListing(id) {
  const listings = loadListings().filter((l) => String(l.id) !== String(id));
  saveListings(listings);
}
