export default function Logo() {
  return (
    <span className="brand-logo-wrap">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-white.png" alt="Feux Labs" className="brand-logo brand-logo-dark" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Feux Labs" className="brand-logo brand-logo-light" />
    </span>
  );
}
