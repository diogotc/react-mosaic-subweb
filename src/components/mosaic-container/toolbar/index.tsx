import { sg, Icon } from "sbwb-ds";
import { Title, IconWrapper } from "./styles";

export interface ToolbarProps {
  id: number;
  title: string;
  onClose: () => void;
}

export function Toolbar({ id, title, onClose }: ToolbarProps) {
  return (
    <div
      style={{
        padding: "0px 16px",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Title>{title}</Title>
      <IconWrapper>
        <button
          style={{
            backgroundColor: "transparent",
            border: "0px",
            width: "16px",
            height: "16px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            outline: "none",
          }}
          onClick={()=> onClose()}
        >
          <Icon
            iconName={"CloseSm"}
            color={sg.colors.neutralColors.colorNeutralDarkest}
          />
        </button>
      </IconWrapper>
    </div>
  );
}
