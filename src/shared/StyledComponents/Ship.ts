import styled from "styled-components";

const shipColor = "rgba(0,0,0,0.25)";

export const Ship = styled.div.attrs((props) => ({
  className: 'd-flex'
}))``;

export const ShipBlock = styled.div`
width: 30px;
height: 30px;
border-left: 1px solid ${shipColor};
border-top: 1px solid ${shipColor};
border-bottom: 1px solid ${shipColor};
border-radius: 2px;

:last-child {
  border-right: 1px solid ${shipColor};
}
`;