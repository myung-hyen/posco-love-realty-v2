import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing, updateListing } from "../../lib/listings";

const empty = { title: "", type: "매매", price: "", location: "", area: "", floor: "", desc: "", status: "판매중" };

export default function ListingForm({ mode = "create", initialData = {} }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...empty, ...initialData });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    if (!form.title.trim()) { setError("제목을 입력해주세요."); return; }
    if (!form.price.trim()) { setError("가격을 입력해주세요."); return; }
    if (mode === "create") createListing(form);
    else updateListing(initialData.id, form);
    navigate("/listings");
  }

  return (
    <div style={{ maxWidth: "560px" }}>
      {error && <p style={{ color: "#dc2626", marginBottom: "12px", fontSize: "14px" }}>⚠ {error}</p>}

      <div style={fw}><label style={lb}>제목 *</label><input name="title" value={form.title} onChange={handleChange} style={ip} placeholder="예) 포스코 아파트 33평" /></div>

      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ ...fw, flex: 1 }}><label style={lb}>거래유형</label><select name="type" value={form.type} onChange={handleChange} style={ip}><option>매매</option><option>전세</option><option>월세</option></select></div>
        <div style={{ ...fw, flex: 1 }}><label style={lb}>상태</label><select name="status" value={form.status} onChange={handleChange} style={ip}><option>판매중</option><option>계약완료</option><option>숨김</option></select></div>
      </div>

      <div style={fw}><label style={lb}>가격 *</label><input name="price" value={form.price} onChange={handleChange} style={ip} placeholder="예) 3억 5000 / 문의" /></div>
      <div style={fw}><label style={lb}>위치</label><input name="location" value={form.location} onChange={handleChange} style={ip} placeholder="예) 대전광역시 중구 목동" /></div>

      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ ...fw, flex: 1 }}><label style={lb}>평형</label><input name="area" value={form.area} onChange={handleChange} style={ip} placeholder="예) 33평" /></div>
        <div style={{ ...fw, flex: 1 }}><label style={lb}>층수</label><input name="floor" value={form.floor} onChange={handleChange} style={ip} placeholder="예) 7층" /></div>
      </div>

      <div style={fw}><label style={lb}>설명</label><textarea name="desc" value={form.desc} onChange={handleChange} style={{ ...ip, height: "90px", resize: "vertical" }} placeholder="매물 상세 설명" /></div>

      <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
        <button onClick={handleSubmit} style={{ padding: "10px 24px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
          {mode === "create" ? "매물 등록" : "수정 완료"}
        </button>
        <button onClick={() => navigate("/listings")} style={{ padding: "10px 24px", background: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>
          취소
        </button>
      </div>
    </div>
  );
}

const fw = { marginBottom: "16px" };
const lb = { display: "block", fontSize: "13px", fontWeight: "600", color: "#475569", marginBottom: "6px" };
const ip = { width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", color: "#1e293b", boxSizing: "border-box" };
