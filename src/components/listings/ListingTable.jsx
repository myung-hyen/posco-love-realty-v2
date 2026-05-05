import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getListings, deleteListing } from "../../lib/listings";

export default function ListingTable() {
  const [listings, setListings] = useState(getListings());
  const navigate = useNavigate();

  function handleDelete(id, title) {
    if (!window.confirm(`"${title}" 매물을 삭제하시겠습니까?`)) return;
    deleteListing(id);
    setListings(getListings());
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b" }}>매물 관리</h1>
        <Link to="/listings/new" style={{ background: "#2563eb", color: "#fff", padding: "8px 18px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
          + 매물 추가
        </Link>
      </div>

      {listings.length === 0 ? (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>등록된 매물이 없습니다.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "#f1f5f9", color: "#475569" }}>
                <th style={th}>제목</th>
                <th style={th}>유형</th>
                <th style={th}>가격</th>
                <th style={th}>위치</th>
                <th style={th}>평형</th>
                <th style={th}>상태</th>
                <th style={th}>등록일</th>
                <th style={th}>관리</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={td}>
                    <Link to={`/listings/${item.id}`} style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                      {item.title}
                    </Link>
                  </td>
                  <td style={td}>
                    <span style={{ background: item.type === "매매" ? "#dbeafe" : "#dcfce7", color: item.type === "매매" ? "#1d4ed8" : "#15803d", padding: "2px 8px", borderRadius: "999px", fontSize: "12px", fontWeight: "600" }}>
                      {item.type}
                    </span>
                  </td>
                  <td style={td}>{item.price}</td>
                  <td style={td}>{item.location}</td>
                  <td style={td}>{item.area}</td>
                  <td style={td}>{item.status}</td>
                  <td style={td}>{item.createdAt}</td>
                  <td style={td}>
                    <button onClick={() => navigate(`/listings/${item.id}/edit`)} style={editBtn}>수정</button>
                    <button onClick={() => handleDelete(item.id, item.title)} style={deleteBtn}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const th = { padding: "10px 14px", textAlign: "left", fontWeight: "600", fontSize: "13px" };
const td = { padding: "10px 14px", color: "#334155" };
const editBtn = { marginRight: "6px", padding: "4px 10px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontSize: "12px", color: "#475569" };
const deleteBtn = { padding: "4px 10px", background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: "6px", cursor: "pointer", fontSize: "12px", color: "#dc2626" };