import styled from 'styled-components';
import { sg } from 'sbwb-ds';


const IconWrapper = styled.div`
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  &:hover {
    background-color: ${sg.colors.neutralColors.colorNeutralSoft};
  }
`;


const Title = styled.p`
  font-size: 12px;
  color: ${sg.colors.neutralColors.colorNeutralDarkest};
  font-weight: ${sg.fonts.fontWeight.fontWeightSemiBold};
  height: fit-content;
  margin: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  transition: color 0.25s;
`;

export { IconWrapper, Title };