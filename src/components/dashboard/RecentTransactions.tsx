import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { transactions } from "@/lib/data";
import { formatKRW } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

const statusVariant: Record<string, "success" | "warning" | "danger" | "info"> = {
  완료: "success",
  진행중: "info",
  취소: "danger",
  대기: "warning",
};

const dealTypeColor: Record<string, string> = {
  매매: "text-brand-600 bg-brand-50",
  전세: "text-emerald-600 bg-emerald-50",
  월세: "text-amber-600 bg-amber-50",
};

export default function RecentTransactions() {
  const recent = transactions.slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-800">최근 거래 내역</h3>
          <p className="text-xs text-slate-500 mt-0.5">최근 진행된 거래</p>
        </div>
        <Link
          href="/transactions"
          className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-medium"
        >
          전체 보기 <ArrowRight size={13} />
        </Link>
      </div>

      <div className="space-y-3">
        {recent.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${dealTypeColor[tx.dealType]}`}>
                {tx.dealType}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate max-w-[200px]">{tx.propertyTitle}</p>
                <p className="text-xs text-slate-500">
                  {tx.seller} → {tx.buyer} · {tx.agent}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0 ml-3">
              <p className="text-sm font-semibold text-slate-800">{formatKRW(tx.price)}</p>
              <Badge variant={statusVariant[tx.status] || "neutral"}>{tx.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
