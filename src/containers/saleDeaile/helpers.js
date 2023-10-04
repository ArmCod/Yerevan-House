export function shareCurrentPageViaFacebook() {
  const url = window.location.href;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;

  window.open(facebookShareUrl, "_blank");
}

export function shareLinkOnViber() {
  const text = "Check out this link!";
  const url = window.location.href;

  const viberUrl = `viber://forward?text=${encodeURIComponent(
    text + " " + url
  )}`;

  window.open(viberUrl, "_blank");
}

export const handleOpen = (setOpen) => {
  setOpen(true);
};
export const handleClose = (setOpen) => {
  setOpen(false);
};
