import styled from "styled-components";

export const BlockSpacing = styled.div`
padding: 10px 0;
`;

export const FormFloating = styled.div.attrs(props => ({
  className: "form-floating"
}))``;

export const FloatingInput = styled.input.attrs(props => ({
  className: `form-control ${props.className}`
}))``;