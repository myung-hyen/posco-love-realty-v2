import React from "react";
import "./index.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import ListingTable from "./components/listings/ListingTable";
import ListingForm from "./components/listings/ListingForm";
import ListingDetail from "./components/listings/ListingDetail";
import { getListingById } from "./lib/listings";

// ─── 사무소 정보 ────────────────────────────────────────────
const office = {
  name: "포스코사랑공인중개사",
  phone: "010-4561-1347",
  phoneLink: "tel:01045611347",
  kakao: "https://open.kakao.com/o/rnjs6793@kakao.com",
  address: "대전광역시 중구 목동로 22번길 16",
  owner: "권옥자",
  bizNo: "305-29-20431",
  hours: "평일 09:00 ~ 18:00 / 토요일 예약 상담",
};

// ─── 추천 매물 목록 ─────────────────────────────────────────
const properties = [
  {
    id: 1,
    title: "대전 목동 더샵 아파트 25평",
    type: "매매",
    price: "문의",
    location: "대전광역시",
    desc: "방 3개, 거실, 화장실 2개 구조의 실거주 추천 매물",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "포스코 아파트 33평",
    type: "전세",
    price: "문의",
    location: "대전광역시",
    desc: "가족 거주에 적합한 인기 평형, 밝은 채광과 넓은 거실",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "포스코 아파트 44평",
    type: "매매",
    price: "문의",
    location: "대전광역시",
    desc: "방 4개 구조의 여유로운 대형 평형, 고급 주거 추천",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
];

// ─── 공통 헤더 ──────────────────────────────────────────────
function Header() {
  return (
    <header className="topbar">
      <div className="logoBox">
        <div className="logoMark">P</div>
        <div>
          <h1>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              {office.name}
            </Link>
          </h1>
          <p>대전 아파트 · 매매 · 전세 · 월세 전문 상담</p>
        </div>
      </div>

      <nav className="nav">
        <a href="/#properties">추천매물</a>
        <a href="/#consult">상담문의</a>
        <a href="/#office">오시는길</a>
        <Link
          to="/listings"
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "6px 14px",
            borderRadius: "6px",
            fontSize: "13px",
            textDecoration: "none",
          }}
        >
          매물관리
        </Link>
      </nav>
    </header>
  );
}

// ─── 홈 페이지 ──────────────────────────────────────────────
function HomePage() {
  const smsText = encodeURIComponent(
    `[상담문의] ${office.name} 홈페이지를 보고 연락드립니다.`
  );

  return (
    <div className="app">
      <section className="hero">
        <div className="heroText">
          <span className="badge">대전 부동산 전문</span>
          <h2>
            좋은 집을 찾는 가장 빠른 길,
            <br />
            포스코사랑공인중개사
          </h2>
          <p>
            실거주, 투자, 전세, 월세까지 고객 상황에 맞는 매물을
            꼼꼼하게 안내해드립니다.
          </p>

          <div className="heroButtons">
            <a className="btn primary" href={office.phoneLink}>
              전화상담 {office.phone}
            </a>
            <a
              className="btn kakao"
              href={office.kakao}
              target="_blank"
              rel="noreferrer"
            >
              카카오톡 상담
            </a>
            <a
              className="btn outline"
              href={`sms:${office.phone}?body=${smsText}`}
            >
              문자상담 남기기
            </a>
          </div>
        </div>

        <div className="heroCard">
          <h3>빠른 상담 안내</h3>
          <p>전화 또는 카카오톡으로 문의하시면 빠르게 답변드립니다.</p>
          <ul>
            <li>대표번호: {office.phone}</li>
            <li>상담시간: {office.hours}</li>
            <li>지역: 대전광역시</li>
          </ul>
        </div>
      </section>

      <section className="trust">
        <div>
          <strong>01</strong>
          <p>실매물 중심 상담</p>
        </div>
        <div>
          <strong>02</strong>
          <p>대전 지역 맞춤 추천</p>
        </div>
        <div>
          <strong>03</strong>
          <p>전화 · 카카오 빠른 연결</p>
        </div>
      </section>

      <section id="properties" className="section">
        <div className="sectionTitle">
          <span>RECOMMEND</span>
          <h2>추천 매물</h2>
          <p>실제 운영 시 매물 사진과 가격을 교체해서 사용하세요.</p>
        </div>

        <div className="propertyGrid">
          {properties.map((item) => (
            <article className="propertyCard" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="propertyBody">
                <span className="type">{item.type}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="propertyInfo">
                  <strong>{item.price}</strong>
                  <span>{item.location}</span>
                </div>
                <a className="smallBtn" href={office.phoneLink}>
                  이 매물 문의하기
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="consult" className="consult">
        <div>
          <span className="badge">CONTACT</span>
          <h2>지금 바로 상담하세요</h2>
          <p>
            원하는 지역, 예산, 입주 시기만 알려주시면 조건에 맞는 매물을
            안내해드립니다.
          </p>
        </div>
        <div className="consultButtons">
          <a className="btn primary" href={office.phoneLink}>
            전화걸기
          </a>
          <a
            className="btn kakao"
            href={office.kakao}
            target="_blank"
            rel="noreferrer"
          >
            카카오톡 문의
          </a>
        </div>
      </section>

      <section id="office" className="section office">
        <div className="sectionTitle">
          <span>OFFICE</span>
          <h2>사무실 안내</h2>
        </div>
        <div className="officeGrid">
          <div className="officeInfo">
            <h3>{office.name}</h3>
            <p>주소: {office.address}</p>
            <p>전화: {office.phone}</p>
            <p>대표자: {office.owner}</p>
            <p>사업자등록번호: {office.bizNo}</p>
            <p>상담시간: {office.hours}</p>
          </div>
          <div className="mapBox">
            네이버지도 또는 카카오맵 iframe 넣는 자리
          </div>
        </div>
      </section>

      <footer className="footer">
        <strong>{office.name}</strong>
        <p>
          대표자 {office.owner} · 사업자등록번호 {office.bizNo} ·{" "}
          {office.address}
        </p>
        <p>© 2026 {office.name}. All rights reserved.</p>
      </footer>

      <div className="floatingButtons">
        <a href={office.phoneLink}>전화</a>
        <a href={office.kakao} target="_blank" rel="noreferrer">
          카톡
        </a>
      </div>
    </div>
  );
}

// ─── 매물 추가 페이지 ───────────────────────────────────────
function ListingNewPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">매물 추가</h1>
      <p className="text-sm text-gray-500 mb-6">새 매물 정보를 입력해주세요</p>
      <ListingForm mode="create" />
    </div>
  );
}

// ─── 매물 수정 페이지 ───────────────────────────────────────
function ListingEditPage() {
  const { id } = useParams();
  const listing = getListingById(id);

  if (!listing)
    return (
      <div className="p-6 text-center text-gray-500">
        매물을 찾을 수 없습니다.{" "}
        <Link to="/listings" className="text-blue-600 underline">
          목록으로
        </Link>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">매물 수정</h1>
      <p className="text-sm text-gray-500 mb-6">{listing.title}</p>
      <ListingForm mode="edit" initialData={listing} />
    </div>
  );
}

// ─── 최상위 App ─────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<div className="p-6"><ListingTable /></div>} />
        <Route path="/listings/new" element={<ListingNewPage />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/listings/:id/edit" element={<ListingEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
