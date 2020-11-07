import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export const Add = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgIcon>
);

export const Filter = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgIcon>
);

export const Archive = (props) => (
  <SvgIcon width="26" height="22.958" viewBox="0 0 26 22.958" {...props}>
    <path
      d="M1.625,23.568a1.631,1.631,0,0,0,1.625,1.64h19.5a1.631,1.631,0,0,0,1.625-1.64V8.809H1.625ZM9.75,12.7a.614.614,0,0,1,.609-.615h5.281a.614.614,0,0,1,.609.615v.41a.614.614,0,0,1-.609.615H10.359a.614.614,0,0,1-.609-.615ZM24.375,2.25H1.625A1.631,1.631,0,0,0,0,3.89V6.35a.819.819,0,0,0,.813.82H25.188A.819.819,0,0,0,26,6.35V3.89A1.631,1.631,0,0,0,24.375,2.25Z"
      transform="translate(0 -2.25)"
    />
  </SvgIcon>
);

export const Search = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </SvgIcon>
);

export const ChevronUp = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
  </SvgIcon>
);

export const ChevronDown = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
  </SvgIcon>
);
