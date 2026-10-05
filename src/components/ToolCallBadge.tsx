import React, { useState } from 'react';
import { Terminal, Code, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import type { ToolCallLog } from '../types';

interface ToolCallBadgeProps {
  toolCall: ToolCallLog;
}

export const ToolCallBadge: React.FC<ToolCallBadgeProps> = ({ toolCall }) => {
  const [expanded, setExpanded] = useState(false);

  const getToolDisplayName = (name: string) => {
    switch (name) {
      case 'searchMedicine':
        return 'Medicine Search';
      case 'getMedicineInformation':
        return 'Medicine Info Lookup';
      case 'getGeneralHealthInformation':
        return 'General Health Info';
      case 'saveChatHistory':
        return 'Chat History Manager';
      default:
        return name;
    }
  };

  return (
    <div className="my-2 rounded-xl bg-slate-900 text-slate-100 dark:bg-slate-950 border border-slate-700/80 shadow-md text-xs font-mono overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-3 py-2 bg-slate-800/90 dark:bg-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-between gap-2 text-left border-b border-slate-700/50"
      >
        <div className="flex items-center gap-2 font-medium">
          <Terminal className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="text-blue-400 font-semibold">Tool Used:</span>
          <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-[11px] font-mono border border-blue-400/30">
            {getToolDisplayName(toolCall.functionName)}
          </span>
          <span className="text-slate-400 text-[10px] hidden sm:inline">
            ({toolCall.functionName}())
          </span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 hover:text-slate-200">
          <span className="text-[10px] text-slate-400">{expanded ? 'Hide Logs' : 'View Code'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {expanded && (
        <div className="p-3 bg-slate-950 space-y-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Frontend Tool Call Executed at {toolCall.timestamp}</span>
          </div>

          <div>
            <div className="text-slate-400 flex items-center gap-1 mb-1">
              <Code className="w-3 h-3" /> Function Arguments:
            </div>
            <pre className="p-2 rounded bg-slate-900 text-amber-300 overflow-x-auto font-mono text-[10px] border border-slate-800">
              {JSON.stringify(toolCall.args, null, 2)}
            </pre>
          </div>

          <div>
            <div className="text-slate-400 flex items-center gap-1 mb-1">
              <Code className="w-3 h-3" /> Function Execution Output:
            </div>
            <pre className="p-2 rounded bg-slate-900 text-emerald-300 overflow-x-auto font-mono text-[10px] border border-slate-800">
              {JSON.stringify(toolCall.result, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
