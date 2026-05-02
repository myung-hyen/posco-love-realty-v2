import { agents } from "@/lib/data";
import { formatKRW } from "@/lib/utils";

export default function AgentPerformance() {
  const maxCommission = Math.max(...agents.map((a) => a.commission));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="mb-4">
        <h3 className="font-semibold text-slate-800">공인중개사 실적</h3>
        <p className="text-xs text-slate-500 mt-0.5">이달 누적 실적</p>
      </div>

      <div className="space-y-4">
        {agents.map((agent, i) => (
          <div key={agent.name}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-xs font-bold">
                  {agent.name[0]}
                </div>
                <span className="text-sm font-medium text-slate-800">{agent.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-800">{formatKRW(agent.commission)}</p>
                <p className="text-xs text-slate-500">거래 {agent.transactions}건 · 매물 {agent.properties}건</p>
              </div>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(agent.commission / maxCommission) * 100}%`,
                  backgroundColor: i === 0 ? "#1a50f0" : i === 1 ? "#4d7aff" : "#85a8ff",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
