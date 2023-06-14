export default function getByteLength(s) {
  return encodeURIComponent(s).replace(/%..|./g, '_').length;
}
