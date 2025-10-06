import { sg, Icon } from "sbwb-ds";
import { Title, IconWrapper } from "./styles";

export interface ToolbarProps {
  title: string;
  onClose: () => void;
}

export function Toolbar({ title, onClose }: ToolbarProps) {
  return (
    <div
      style={{
        padding: "0px 16px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div><Title>{title}</Title></div>
      <div style={{ flex: 1 }}></div>
      <div>
        <IconWrapper>
          <Icon iconName={"CloseSm"} onClick={() => onClose()} />
        </IconWrapper>
      </div>
    </div>
  );
}
