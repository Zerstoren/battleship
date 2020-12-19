import styled from "styled-components";

interface FieldTableProps {
  sizeX: number,
  sizeY: number,
}

export const FieldTable = styled.table.attrs((props) => ({
  className: "table table-bordered"
}))`
width: ${(props: FieldTableProps) => (props.sizeX + 1) * 30}px;
height: ${(props: FieldTableProps) => (props.sizeY + 1) * 30}px;

& td {
  width: 30px;
  height: 30px;
  padding: 0;
}
`;