import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getListingById, deleteListing } from "../../lib/listings";

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = getListingById(id);

  if (!listing) return (
    <div style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>
      매물을 찾을 수 없습니다. <Link to="/listings" style={{ color: "#2563eb" }}>목록으로</Link>
    </div>
  );

  function handleDelete() {
    if (!window.confirm(`"${listing.title}" 매물을 삭제하시겠습니까?`)) return;
    deleteListing(id);
    navigate("/listings");
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
      <Link to="/listings" style={{ color: "#64748b", fontSize: "13px", textDecoration: "none" }}>← 목록으로</Link>

      <div style={{ marginTop: "16px", marginBottom: "8px", display: "flex", gap: "8px" }}>
        <span style={{ background: listing.type === "매매" ? "#dbeafe" : "#dcfce7", color: listing.type === "매매" ? "#1d4ed8" : "#15803d", padding: "3px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: "700" }}>{listing.type}</span>
        <span style={{ background: "#f1f5f9", color: "#64748b", padding: "3px 10px", borderRadius: "999px", fontSize: "12px" }}>{listing.status}</span>
      </div>

      <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#1e293b", marginBottom: "20px" }}>{listing.title}</h1>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", marginBottom: "24px" }}>
        <tbody>
          {[["가격", listing.price], ["위치", listing.location], ["평형", listing.area], ["층수", listing.floor], ["등록일", listing.createdAt]].map(([key, val]) => (
            <tr key={key} style={{ borderBottom: "1px solid #e2e8f0" }}>
              <td style={{ padding: "10px 0", color: "#64748b", width: "80px", fontWeight: "600" }}>{key}</td>
              <td style={{ padding: "10px 0", color: "#1e293b" }}>{val || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {listing.desc && <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "16px", marginBottom: "24px", color: "#475569", fontSize: "14px", lineHeight: "1.6" }}>{listing.desc}</div>}

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to={`/listings/${id}/edit`} style={{ padding: "10px 20px", background: "#2563eb", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>수정하기</Link>
        <button onClick={handleDelete} style={{ padding: "10px 20px", background: "#fee2e2", color: "#dc2626", border: "1px solid #fca5a5", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>삭제하기</button>
      </div>
    </div>
  );
}
