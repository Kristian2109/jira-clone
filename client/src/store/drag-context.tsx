import { FC, ReactNode, createContext, useState } from "react";

export const DragContext = createContext<{
  activeIssueId: null | number;
  activateIssue: (issueId: number) => void;
  deactivateIssue: () => void;
}>({
  activeIssueId: null,
  activateIssue: (issueId: number) => {},
  deactivateIssue: () => {},
});

export const DragContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeIssueId, setActiveIssueId] = useState<{
    issueId: number | null;
  }>({ issueId: null });

  const ctxValue = {
    activeIssueId: activeIssueId.issueId,
    activateIssue: (issueId: number) => setActiveIssueId({ issueId }),
    deactivateIssue: () => setActiveIssueId({ issueId: null }),
  };

  return (
    <DragContext.Provider value={ctxValue}>{children}</DragContext.Provider>
  );
};
