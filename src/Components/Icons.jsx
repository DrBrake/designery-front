import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export const Add = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SvgIcon>
);

export const Remove = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M6 19h12v2H6v-2z" />
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

export const Random = (props) => (
  <SvgIcon width="26" height="27.131" viewBox="0 0 26 27.131" {...props}>
    <g id="layer1" transform="translate(285.311 -169.118)">
      <path
        id="path2434"
        d="M-271.711,169.122a2.176,2.176,0,0,0-.507.093l-11.61,3.541a2.1,2.1,0,0,0-1.418,2.521l1.353,12.188a2.1,2.1,0,0,0,.78,1.408l8.587,6.83q.056.048.115.093c.054.043.111.083.169.12s.118.072.18.1.119.057.18.082l.044.017c.043.017.087.03.131.044l.12.033.028.006h.011c.047.011.094.019.142.028l.136.017h.033c.042,0,.084.006.125.006.058,0,.117-.006.175-.011a1.848,1.848,0,0,0,.207-.028c.07-.014.139-.029.207-.049a2.093,2.093,0,0,0,.556-.251l10.8-6.061a2.1,2.1,0,0,0,1.064-1.7l.791-13.05a2.1,2.1,0,0,0-.5-1.489l-.044-.049a2.1,2.1,0,0,0-.262-.24c-.017-.014-.033-.025-.049-.038l-.033-.022c-.046-.035-.093-.067-.142-.1s-.083-.045-.125-.065l-.06-.028c-.043-.022-.087-.042-.131-.06l-.017-.006-.087-.028-10.12-3.732a2.092,2.092,0,0,0-.824-.125Zm-.423,2.062c.909-.128,1.8.087,1.991.48s-.4.816-1.3.944-1.8-.087-1.986-.48S-273.044,171.312-272.135,171.184Zm-5.843,1.648c.962-.145,1.9.1,2.106.546s-.418.925-1.38,1.069-1.9-.1-2.106-.546S-278.94,172.976-277.978,172.831Zm11.741.235c1.016.139,1.664.6,1.451,1.026s-1.2.663-2.22.524-1.669-.6-1.457-1.031S-267.253,172.927-266.237,173.066Zm-6.563.065c1.122-.139,2.22.1,2.455.524s-.482.887-1.6,1.026-2.226-.1-2.46-.524S-273.923,173.271-272.8,173.132Zm.4,2.128c.819.029,1.5.259,1.686.606.242.462-.5.957-1.659,1.107s-2.295-.1-2.537-.562.5-.963,1.658-1.113a5.226,5.226,0,0,1,.851-.038Zm-9.727,1.994c.409.025.9.464,1.249,1.162.464.931.488,1.976.054,2.33s-1.157-.117-1.62-1.047-.488-1.971-.054-2.324a.522.522,0,0,1,.371-.12Zm19,1.028a.928.928,0,0,1,.535.071c.655.316.781,1.411.284,2.444s-1.429,1.614-2.084,1.3-.786-1.405-.289-2.439A2.313,2.313,0,0,1-263.12,178.281Zm-14.427,1.574a2.019,2.019,0,0,1,1.364,1.228c.5.982.531,2.077.06,2.45s-1.264-.12-1.768-1.1-.53-2.083-.06-2.455a.573.573,0,0,1,.4-.12Zm8.5.9a.928.928,0,0,1,.535.071c.655.316.78,1.411.284,2.444s-1.429,1.614-2.084,1.3-.78-1.405-.284-2.439a2.306,2.306,0,0,1,1.549-1.375Zm-12.533.461c.374.028.828.473,1.146,1.184.424.948.445,2.008.049,2.368s-1.06-.116-1.484-1.064-.445-2.008-.049-2.368a.441.441,0,0,1,.338-.12Zm4.31,2.93a2.013,2.013,0,0,1,1.358,1.228c.5.982.531,2.077.06,2.45s-1.259-.12-1.762-1.1-.53-2.083-.06-2.455a.573.573,0,0,1,.4-.12Zm14.017.924a.931.931,0,0,1,.535.077c.655.316.78,1.405.284,2.439s-1.429,1.619-2.084,1.3-.786-1.411-.289-2.444a2.313,2.313,0,0,1,1.555-1.375Zm-17.842.167c.35.022.777.406,1.075,1.015.4.812.415,1.721.044,2.03s-.994-.1-1.391-.911-.415-1.722-.044-2.03a.437.437,0,0,1,.316-.1Zm12.113,2.534a.931.931,0,0,1,.535.077c.655.315.786,1.411.289,2.444s-1.435,1.614-2.089,1.3-.78-1.411-.284-2.444a2.306,2.306,0,0,1,1.549-1.375Zm-8.027.461a2.019,2.019,0,0,1,1.364,1.228c.5.982.525,2.077.055,2.45s-1.259-.12-1.762-1.1-.53-2.077-.06-2.45a.577.577,0,0,1,.4-.125Z"
        fillRule="evenodd"
      />
    </g>
  </SvgIcon>
);

export const GridOn = (props) => (
  <SvgIcon width="28" height="28" viewBox="0 0 28 28" {...props}>
    <path id="Path_4" data-name="Path 4" d="M0,0H24V24H0Z" fill="none" />
    <path
      id="Path_5"
      data-name="Path 5"
      d="M25.4,2H4.6A2.608,2.608,0,0,0,2,4.6V25.4A2.608,2.608,0,0,0,4.6,28H25.4A2.608,2.608,0,0,0,28,25.4V4.6A2.608,2.608,0,0,0,25.4,2ZM9.8,25.4H4.6V20.2H9.8Zm0-7.8H4.6V12.4H9.8Zm0-7.8H4.6V4.6H9.8Zm7.8,15.6H12.4V20.2h5.2Zm0-7.8H12.4V12.4h5.2Zm0-7.8H12.4V4.6h5.2Zm7.8,15.6H20.2V20.2h5.2Zm0-7.8H20.2V12.4h5.2Zm0-7.8H20.2V4.6h5.2Z"
    />
  </SvgIcon>
);

export const SmallChevronDown = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path id="Path_2" data-name="Path 2" d="M0,0H24V24H0Z" fill="none" />
    <path id="Path_3" data-name="Path 3" d="M7,10l5,5,5-5Z" />
  </SvgIcon>
);

export const Close = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </SvgIcon>
);

export const BulletList = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
  </SvgIcon>
);

export const NumberedList = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M18 17h2v.5h-1v1h1v.5h-2v1h3v-4h-3v1zm1-9h1V4h-2v1h1v3zm-1 3h1.8L18 13.1v.9h3v-1h-1.8l1.8-2.1V10h-3v1zM2 5h14v2H2V5zm0 12h14v2H2v-2zm0-6h14v2H2v-2z" />
  </SvgIcon>
);

export const Bold = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
  </SvgIcon>
);

export const Italic = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" />
  </SvgIcon>
);

export const ArrowUp = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
  </SvgIcon>
);

export const ArrowDown = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
);

export const Edit = (props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M3,21l3.75,0L17.81,9.94l-3.75-3.75L3,17.25L3,21z M5,18.08l9.06-9.06l0.92,0.92L5.92,19L5,19L5,18.08z" />
    <path d="M18.37,3.29c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75l1.83-1.83c0.39-0.39,0.39-1.02,0-1.41L18.37,3.29z" />
  </SvgIcon>
);
